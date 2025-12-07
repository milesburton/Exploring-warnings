import { Injectable } from '@angular/core';

type Theme = 'light' | 'dark';
type Mode = 'auto' | Theme;

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private storageKey = 'app-theme-preference';

  private media = window.matchMedia?.('(prefers-color-scheme: dark)');

  private mode: Mode = 'auto';

  init() {
    const saved = (localStorage.getItem(this.storageKey) as Mode | null) || 'auto';
    this.setMode(saved);
    if (this.media) {
      this.media.addEventListener?.('change', (e) => {
        if (this.mode === 'auto') {
          this.apply(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  get current(): Theme {
    return document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light';
  }

  get currentMode(): Mode {
    return this.mode;
  }

  toggle() {
    // Cycle Auto -> Light -> Dark -> Auto
    const next: Record<Mode, Mode> = { auto: 'light', light: 'dark', dark: 'auto' };
    this.setMode(next[this.mode]);
  }

  set(theme: Theme) {
    this.setMode(theme);
  }

  setMode(mode: Mode) {
    this.mode = mode;
    localStorage.setItem(this.storageKey, mode);
    if (mode === 'auto') {
      const prefersDark = this.media?.matches ?? false;
      this.apply(prefersDark ? 'dark' : 'light');
    } else {
      this.apply(mode);
    }
  }

  private apply(theme: Theme) {
    const root = document.documentElement;
    root.classList.toggle('theme-dark', theme === 'dark');
    root.classList.toggle('theme-light', theme === 'light');
    // applying theme does not change saved mode; only setMode() persists
  }
}
