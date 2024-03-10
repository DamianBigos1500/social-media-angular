import { Component } from '@angular/core';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { ThemeComponent } from '../../core/components/theme/theme.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root-layout',
  standalone: true,
  imports: [
    ThemeComponent,
    NavigationComponent,
    RouterOutlet,
  ],
  templateUrl: './root-layout.component.html',
  styleUrl: './root-layout.component.scss',
})
export class RootLayoutComponent {}
