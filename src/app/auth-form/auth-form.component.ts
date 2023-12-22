import {
  Component,
  Inject,
  PLATFORM_ID,
  WritableSignal,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule,  isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'auth-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent  {
  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    public store: StoreService

  ) {}


  login(): void {
    this.authService.login({ email: '', password: '' }).subscribe({
      next: (response: any) => {
        console.log(this.store.user);
        // console.log(response.user?.email);
      },
      error: (response) => console.log(response),
    });
  }

  // logout() {
  //   this._auth.logout().subscribe({
  //     next: (response: any) => {
  //       console.log(response);
  //       this.count.update((value) => response?.message);
  //     },
  //     error: (response: any) => console.log(response),
  //   });
  // }
}
