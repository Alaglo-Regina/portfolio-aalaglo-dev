// Fonction serverless Vercel : vérifie un token Cloudflare Turnstile avant
// d'autoriser l'envoi du formulaire de contact (voir src/app/components/contact/contact.ts).
// TURNSTILE_SECRET_KEY est une variable d'environnement Vercel privée,
// jamais exposée au navigateur.
import type { VercelRequest, VercelResponse } from '@vercel/node';

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

interface TurnstileVerifyResponse {
  success: boolean;
  'error-codes'?: string[];
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ success: false, error: 'method_not_allowed' });
    return;
  }

  const body = (req.body ?? {}) as { turnstileToken?: unknown };
  const turnstileToken = body.turnstileToken;
  if (typeof turnstileToken !== 'string' || turnstileToken.length === 0) {
    res.status(400).json({ success: false, error: 'missing_token' });
    return;
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error('[api/contact] TURNSTILE_SECRET_KEY manquant côté serveur.');
    res.status(500).json({ success: false, error: 'server_misconfigured' });
    return;
  }

  const verifyParams = new URLSearchParams({ secret: secretKey, response: turnstileToken });
  const forwardedFor = req.headers['x-forwarded-for'];
  const clientIp = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(',')[0]?.trim();
  if (clientIp) {
    verifyParams.set('remoteip', clientIp);
  }

  let verifyData: TurnstileVerifyResponse;
  try {
    const verifyRes = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: verifyParams,
    });
    verifyData = (await verifyRes.json()) as TurnstileVerifyResponse;
  } catch (error) {
    console.error('[api/contact] Erreur réseau lors de la vérification Turnstile:', error);
    res.status(502).json({ success: false, error: 'verification_unreachable' });
    return;
  }

  if (!verifyData.success) {
    res.status(400).json({ success: false, error: 'invalid_token' });
    return;
  }

  res.status(200).json({ success: true });
}
