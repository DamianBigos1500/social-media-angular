import { Component } from '@angular/core';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { ThemeComponent } from '../../core/components/theme/theme.component';

@Component({
  selector: 'app-root-layout',
  standalone: true,
  imports: [ThemeComponent, AuthFormComponent, NavigationComponent],
  templateUrl: './root-layout.component.html',
  styleUrl: './root-layout.component.scss',
})
export class RootLayoutComponent {}
