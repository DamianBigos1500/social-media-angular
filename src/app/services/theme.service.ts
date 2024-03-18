import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = false;

  isDarkMode() {
    return this.darkMode;
  }

  constructor() {
    if (localStorage) {
      const currentTheme = localStorage.getItem('theme');
      if (currentTheme) {
        this.darkMode = currentTheme == 'dark' ? true : false;
        this.setDarkMode(this.darkMode);
      } else {
      }
    }
  }

  setDarkMode(isDarkMode: boolean) {
    this.darkMode = isDarkMode;
    this.useDarkMode();
  }

  useDarkMode() {
    if (this.darkMode) {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}
