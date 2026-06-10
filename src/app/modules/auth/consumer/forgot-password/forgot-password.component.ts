import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consumer-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ConsumerForgotPasswordComponent {
  email = '';
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const apiUrl = `https://farmer-sales-backend.onrender.com/consumer/forgot-password?email=${this.email}`;
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.http.post(apiUrl, {}).subscribe({
      next: (res: any) => {
        alert('✅ OTP sent to email!');
        console.log('Forgot password success:', res);

        localStorage.setItem('consumerEmail', this.email); // save email for reset
        localStorage.setItem('authToken', res.response.token);

        this.router.navigate(['/auth/consumer/reset'], {
          replaceUrl: true,
          state: { successMessage: res.message },
        });
      },
      error: (err) => {
        console.error('❌ Error sending OTP', err);
        alert('Failed to send OTP. Try again.');
        this.errorMessage = err.error?.message || 'Something went wrong';
        this.loading = false;
      },
    });
  }
}
