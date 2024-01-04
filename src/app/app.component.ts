import {
  Component,
  Inject,
  PLATFORM_ID,
  WritableSignal,
  signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ThemeComponent } from './core/components/theme/theme.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AuthFormComponent,
    ReactiveFormsModule,
    HttpClientModule,
    ThemeComponent,
    NavigationComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'social-media-angular';
  loading: WritableSignal<boolean> = signal(true);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getUser();
    }
  }

  getUser() {
    this.authService.getUser().subscribe({
      next: (response: any) => {
        this.authService.setUserSignal(response.user);
        this.loading.update(() => false);


      },
      error: (response) => {
        this.authService.setUserSignal(null);
        this.loading.update(() => false);
        console.log(response);
      },
    });
  }
}
