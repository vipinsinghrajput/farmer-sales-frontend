import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmer-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl:'./forgot-password.component.scss',
  standalone: true,
  imports: [CommonModule,FormsModule]
})
export class ForgotPasswordComponent {
  email = '';

  constructor(private http: HttpClient, private router: Router) {} 
  // constructor(private http: HttpClient) {}
 
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  onSubmit() {
    const apiUrl = `https://farmer-sales-backend.onrender.com/farmer/forgot-password?email=${this.email}`;
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
   
    this.http.post(apiUrl,{}).subscribe({
      next: (res: any) => {
        console.log(' forgot success', res);
        localStorage.setItem('farmerEmail', this.email);  // save email for next step
        localStorage.setItem("authToken",res.response.token);
        this.loading = false;
        this.router.navigate(['/auth/farmer/reset'],{ replaceUrl: true ,
          state: { successMessage: res.message }
        });
       
      },
      error: (err) => {
        this.loading = false;
        console.error('❌ Error sending OTP', err);
        if (err.error?.message) {
          this.errorMessage = err.error.message;
        } else if (err.error?.error) {
          this.errorMessage = err.error.error;
        } else if (err.status) {
          this.errorMessage = `Server Error (${err.status}): Please try again later.`;
        } else {
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      }
    });
  }
}

