

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
  constructor(private http: HttpClient, private router: Router) {

      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state as { successMsg: string };
      this.successMsg = state?.successMsg || '';
    
  }

  

  verifyOtp() {
   


    const { otp } = this.otpData;
    const authToken = localStorage.getItem('authToken'); // 🔐 Retrieve saved auth token
  console.log("auth token == > " + authToken);
    const url = `http://localhost:8082/farmer/verify-otp?otp=${encodeURIComponent(otp)}`;
  
    const headers = {
      'Authorization': `Bearer ${authToken}`  // 👈 Send token as Bearer
    };
  
    console.log("headers == > " + headers);
    this.http.post(url, otp,{ headers }).subscribe({
      next: (res:any) => {
        
        console.log('✅ OTP verified'+ res);
        localStorage.setItem('accessToken', res.response.accessToken);

        this.router.navigate(['/farmer/dashboard'], {replaceUrl: true});
      },
      error: (err) => {
        console.error('❌ OTP verification failed', err);

        if (err.error?.message) {
          this.errorMsg = err.error.message;
        } else {
          this.errorMsg = 'Something went wrong. Please try again.';
        }
       
      }
    });
  }
  
}





