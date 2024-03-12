import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss',
})
export class AuthModalComponent {
  constructor(
    private formBuilder: FormBuilder 
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
