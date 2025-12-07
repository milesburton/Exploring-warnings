import { Injectable } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private storageKey = 'app-theme-preference';

  init() {
    const saved = localStorage.getItem(this.storageKey) as Theme | null;
    if (saved) {
      this.apply(saved);
      return;
    }
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    this.apply(prefersDark ? 'dark' : 'light');
  }

  get current(): Theme {
    return document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light';
  }

  toggle() {
    this.apply(this.current === 'dark' ? 'light' : 'dark');
  }

  set(theme: Theme) {
    this.apply(theme);
  }

  private apply(theme: Theme) {
    const root = document.documentElement;
    root.classList.toggle('theme-dark', theme === 'dark');
    root.classList.toggle('theme-light', theme === 'light');
    try {
      localStorage.setItem(this.storageKey, theme);
    } catch {}
  }
}
