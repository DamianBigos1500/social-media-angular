import { Component } from '@angular/core';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss',
})
export class ThemeComponent {
  public isDarkTheme = false;

  onThemeSwitchChange() {
    const body = document.getElementsByTagName('body')[0];
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      this.isDarkTheme = false;
    } else {
      body.classList.add('dark-theme');
      this.isDarkTheme = true;
    }
    return true;
  }
}
