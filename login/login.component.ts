import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string = ''; // To store error messages
  captcha: string = this.generateCaptcha(); // Captcha value
  isLoading: boolean = false; // Loading indicator

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      captchaInput: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Check if the user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      this.router.navigate(['/dashboard']); // Redirect to dashboard if logged in
    }
  }

  generateCaptcha(): string {
    return Math.random().toString(36).substring(2, 8); // Generate a random captcha
  }

  refreshCaptcha(): void {
    this.captcha = this.generateCaptcha(); // Refresh the captcha
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginError = 'Please fill in all required fields!';
      return;
    }

    // Validate Captcha
    if (this.loginForm.value.captchaInput !== this.captcha) {
      this.loginError = 'Invalid captcha. Please try again.';
      this.refreshCaptcha(); // Refresh captcha on failure
      return;
    }

    this.isLoading = true; // Show loading spinner
    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false; // Hide loading spinner
        alert('Login successful!');
        // Save user info or token to localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/dashboard']); // Redirect to dashboard
      },
      error: (error) => {
        this.isLoading = false; // Hide loading spinner
        if (error.status === 404) {
          this.loginError = 'User not found. Please check your email.';
        } else if (error.status === 401) {
          this.loginError = 'Invalid password. Please try again.';
        } else {
          this.loginError = 'An unexpected error occurred. Please try again later.';
        }
      },
    });
  }
}