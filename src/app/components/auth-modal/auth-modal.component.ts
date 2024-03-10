import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss',
})
export class AuthModalComponent {
  constructor(
    private formBuilder: FormBuilder // private authService: AuthService
  ) {}

  loginForm: FormGroup = this.formBuilder.group({
    email: [''],
    password: [''],
  });

  onSubmit() {
    // this.authService.login(this.loginForm.value).subscribe(() => {
    //   this.authService.getUser().subscribe();
    // });
  }
}
