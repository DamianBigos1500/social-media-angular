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
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent {
  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  constructor(public authService: AuthService) {}

  login(): void {
    // this.authService.login(Object.assign(this.loginForm.value)).subscribe({
    //   next: (response: any) => {
    //     console.log(response);
    //   },
    //   error: (response) => console.log(response),
    // });
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
