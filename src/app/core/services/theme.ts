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
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore storage errors */
    }
  }
}
