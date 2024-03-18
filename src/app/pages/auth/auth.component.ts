import { ThemeService } from './../../services/theme.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  loginForm: FormGroup = this.formBuilder.group({
    email: [''],
    password: [''],
  });

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(() => {
      this.authService.fetchUser();
      this.router.navigate(['/']);
    });
  }
}
