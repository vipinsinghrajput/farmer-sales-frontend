import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  imports: [CommonModule,FormsModule],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.scss'
})
export class VerifyOtpComponent {

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

    const url = `http://localhost:8082/deliveryPerson/verify-otp?otp=${encodeURIComponent(otp)}`;
    const headers = {
      'Authorization': `Bearer ${authToken}`
    };

    console.log("headers ==> ", headers);

    this.http.post(url, otp, { headers }).subscribe({
      next: (res: any) => {
        console.log('✅ Delivery Person OTP verified', res);
        localStorage.setItem('accessToken', res.response.accessToken);

        this.router.navigate(['/deliveryPerson/dashboard'], { replaceUrl: true });
      },
      error: (err) => {
        console.error('❌ Delivery Person OTP verification failed', err);

        if (err.error?.message) {
          this.errorMsg = err.error.message;
        } else {
          this.errorMsg = 'Something went wrong. Please try again.';
        }
      }
    });
  }
}
