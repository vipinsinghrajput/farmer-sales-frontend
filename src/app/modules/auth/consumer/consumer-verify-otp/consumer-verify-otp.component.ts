import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consumer-verify-otp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consumer-verify-otp.component.html',
  styleUrl: './consumer-verify-otp.component.scss',
})
export class ConsumerVerifyOtpComponent {

  otpData = {
    otp: ''
  };

  successMsg: string = '';
  errorMsg: any;

  constructor(private http: HttpClient, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { successMsg: string };
    this.successMsg = state?.successMsg || '';
  }

  verifyOtp() {
    const { otp } = this.otpData;
    const authToken = localStorage.getItem('authToken');

    console.log("auth token ==> " + authToken);

    const url = `http://localhost:8082/consumer/verify-otp?otp=${encodeURIComponent(otp)}`;
    const headers = {
      'Authorization': `Bearer ${authToken}`
    };

    console.log("headers ==> ", headers);

    this.http.post(url, otp, { headers }).subscribe({
      next: (res: any) => {
        console.log('✅ Consumer OTP verified', res);
        localStorage.setItem('accessToken', res.response.accessToken);

        this.router.navigate(['/consumer/dashboard'], { replaceUrl: true });
      },
      error: (err) => {
        console.error('❌ Consumer OTP verification failed', err);

        if (err.error?.message) {
          this.errorMsg = err.error.message;
        } else {
          this.errorMsg = 'Something went wrong. Please try again.';
        }
      }
    });
  }
}
