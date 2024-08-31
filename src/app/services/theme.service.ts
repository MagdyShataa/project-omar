import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private readonly storageKey = "user-theme";
  themeSignal = signal<string>(this.getStoredTheme());

  constructor() {
    this.applyTheme(this.themeSignal());
  }

  setTheme(theme: string) {
    this.themeSignal.set(theme);
    this.storeTheme(theme);
    this.applyTheme(theme);
  }

  updateTheme() {
    this.themeSignal.update((currentTheme) => {
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      this.storeTheme(newTheme);
      this.applyTheme(newTheme);
      return newTheme;
    });
  }

  private storeTheme(theme: string) {
    if (this.isBrowser()) {
      localStorage.setItem(this.storageKey, theme);
    }
  }

  private getStoredTheme(): string {
    if (this.isBrowser()) {
      return localStorage.getItem(this.storageKey) || "dark";
    }
    return "dark";
  }

  private applyTheme(theme: string) {
    if (this.isBrowser()) {
      document.body.className = theme;
    }
  }

  private isBrowser(): boolean {
    return typeof window !== "undefined" && typeof localStorage !== "undefined";
  }
}
