import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'alaglo-portfolio-theme-v3';

type ThemeName = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  readonly current = signal<ThemeName>('light');

  constructor() {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      saved = null;
    }

    // The site always starts in light mode; dark mode only kicks in
    // if the visitor explicitly toggled it on a previous visit.
    const initial: ThemeName = saved === 'dark' ? 'dark' : 'light';

    this.apply(initial);
  }

  toggle(): void {
    this.apply(this.current() === 'dark' ? 'light' : 'dark');
  }

  private apply(theme: ThemeName): void {
    document.documentElement.setAttribute('data-theme', theme);
    this.current.set(theme);
    this.applyLogo(theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore storage errors */
    }
  }

  private applyLogo(theme: ThemeName): void {
    const logoSrc = theme === 'dark' ? 'assets/logo-dark.png' : 'assets/logo.png';

    const favicon = document.getElementById('favicon') as HTMLLinkElement | null;
    if (favicon) {
      favicon.href = logoSrc;
    }

    const splashLogo = document.getElementById('splash-logo') as HTMLImageElement | null;
    if (splashLogo) {
      splashLogo.src = logoSrc;
    }
  }
}
