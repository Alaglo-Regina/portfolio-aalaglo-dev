import { Injectable } from '@angular/core';

export interface TurnstileRenderOptions {
  sitekey: string;
  theme?: 'light' | 'dark' | 'auto';
  callback?: (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: (errorCode?: string) => void;
}

export interface TurnstileApi {
  render(container: HTMLElement, options: TurnstileRenderOptions): string;
  reset(widgetId: string): void;
  remove(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

// Charge le script Turnstile une seule fois pour toute l'app, quel que soit le
// nombre de <app-turnstile> instanciés. Résout à `null` côté serveur (pas de
// `window`), pour rester compatible avec un futur rendu SSR.
@Injectable({ providedIn: 'root' })
export class TurnstileLoader {
  private loadPromise: Promise<TurnstileApi | null> | null = null;

  load(): Promise<TurnstileApi | null> {
    if (typeof window === 'undefined') {
      return Promise.resolve(null);
    }
    if (window.turnstile) {
      return Promise.resolve(window.turnstile);
    }
    if (!this.loadPromise) {
      this.loadPromise = new Promise<TurnstileApi | null>((resolve, reject) => {
        const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_URL}"]`);
        if (existing) {
          existing.addEventListener('load', () => resolve(window.turnstile ?? null));
          existing.addEventListener('error', () => reject(new Error('turnstile_script_load_failed')));
          return;
        }
        const script = document.createElement('script');
        script.src = SCRIPT_URL;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve(window.turnstile ?? null);
        script.onerror = () => reject(new Error('turnstile_script_load_failed'));
        document.head.appendChild(script);
      });
    }
    return this.loadPromise;
  }
}
