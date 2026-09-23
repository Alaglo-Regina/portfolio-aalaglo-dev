// Génère src/environments/environment.ts à partir de .env.
// Lancé automatiquement avant `npm start` et `npm run build` (voir package.json).
// Ce fichier généré n'est jamais commité (voir .gitignore).

const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '..', '.env');
const outputPath = path.resolve(__dirname, '..', 'src', 'environments', 'environment.ts');
const requiredKeys = ['EMAILJS_SERVICE_ID', 'EMAILJS_TEMPLATE_ID', 'EMAILJS_PUBLIC_KEY', 'TURNSTILE_SITE_KEY'];
// Clé de test Cloudflare Turnstile ("toujours réussie") : utilisée par défaut
// en local si TURNSTILE_SITE_KEY n'est pas définie, pour ne jamais bloquer le
// développement. À ne pas utiliser en production (définir TURNSTILE_SITE_KEY
// avec la vraie clé du widget dans les variables d'environnement Vercel).
const TURNSTILE_TEST_SITE_KEY = '1x00000000000000000000AA';

function parseEnvFile(content) {
  const result = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }
    const match = line.match(/^([\w.-]+)\s*=\s*(.*)$/);
    if (!match) {
      continue;
    }
    const key = match[1];
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  }
  return result;
}

// Sources par ordre de priorité : les variables d'environnement déjà présentes
// (cas d'un hébergeur comme Vercel, qui n'a pas de fichier .env) puis, en local
// uniquement, le fichier .env s'il existe.
const fileEnv = fs.existsSync(envPath) ? parseEnvFile(fs.readFileSync(envPath, 'utf8')) : {};
const env = {};
for (const key of requiredKeys) {
  env[key] = process.env[key] || fileEnv[key] || '';
}
if (!env.TURNSTILE_SITE_KEY) {
  env.TURNSTILE_SITE_KEY = TURNSTILE_TEST_SITE_KEY;
}

const missing = requiredKeys.filter((key) => !env[key]);
if (missing.length) {
  console.warn(`[set-env] Variables manquantes: ${missing.join(', ')}`);
  if (!fs.existsSync(envPath)) {
    console.warn('[set-env] Aucun fichier .env trouvé. En local, copie .env.example vers .env et renseigne tes identifiants EmailJS.');
    console.warn("[set-env] Sur l'hébergeur (Vercel...), configure ces variables dans les réglages du projet (Environment Variables).");
  }
}

const escape = (value) => (value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");

const fileContent = `// Fichier généré automatiquement par scripts/set-env.js à partir de .env.
// Ne pas éditer à la main, ne pas committer (voir .gitignore).
export const environment = {
  emailjsServiceId: '${escape(env.EMAILJS_SERVICE_ID)}',
  emailjsTemplateId: '${escape(env.EMAILJS_TEMPLATE_ID)}',
  emailjsPublicKey: '${escape(env.EMAILJS_PUBLIC_KEY)}',
  turnstileSiteKey: '${escape(env.TURNSTILE_SITE_KEY)}',
};
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log('[set-env] src/environments/environment.ts généré');
