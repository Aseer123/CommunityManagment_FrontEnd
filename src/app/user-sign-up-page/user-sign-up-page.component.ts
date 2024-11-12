import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-sign-up-page',
  templateUrl: './user-sign-up-page.component.html',
  styleUrls: ['./user-sign-up-page.component.css']
})
export class UserSignUpPageComponent {
  signupForm: FormGroup;
  roles: string[] = ['RESIDENT', 'ADMIN'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['RESIDENT', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
        }
      });
    }
  }
}