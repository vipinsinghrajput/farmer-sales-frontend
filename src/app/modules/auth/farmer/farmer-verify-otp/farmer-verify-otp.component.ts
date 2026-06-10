

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-farmer-verify-otp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './farmer-verify-otp.component.html',
  styleUrl: './farmer-verify-otp.component.scss',
})
export class FarmerVerifyOtpComponent  {

  // ✅ Define otpData properly
  otpData = {
    
    otp: ''
  };
  successMsg: string = '';
  errorMsg: any;
  isLoading = false;
  constructor(private http: HttpClient, private router: Router) {

      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state as { successMsg: string };
      this.successMsg = state?.successMsg || '';
    
  }

  

  verifyOtp() {
    this.errorMsg = '';
    this.isLoading = true;

    const { otp } = this.otpData;
    const authToken = localStorage.getItem('authToken'); // 🔐 Retrieve saved auth token
    const url = `https://farmer-sales-backend.onrender.com/farmer/verify-otp?otp=${encodeURIComponent(otp)}`;
  
    const headers = {
      'Authorization': `Bearer ${authToken}`  // 👈 Send token as Bearer
    };
  
    this.http.post(url, null, { headers }).subscribe({
      next: (res:any) => {
        this.isLoading = false;
        console.log('✅ OTP verified'+ res);
        localStorage.setItem('accessToken', res.response.accessToken);

        this.router.navigate(['/farmer/dashboard'], {replaceUrl: true});
      },
      error: (err) => {
        this.isLoading = false;
        console.error('❌ OTP verification failed', err);

        if (err.error?.message) {
          this.errorMsg = err.error.message;
        } else if (err.error?.error) {
          this.errorMsg = err.error.error;
        } else if (err.status) {
          this.errorMsg = `Server Error (${err.status}): Please check your details or try again later.`;
        } else {
          this.errorMsg = 'Something went wrong. Please try again.';
        }
      }
    });
  }
  
}





