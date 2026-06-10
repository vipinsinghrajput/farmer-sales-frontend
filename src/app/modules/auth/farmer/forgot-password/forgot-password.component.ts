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
        alert('✅ OTP sent to email!');
        console.log(' forgot success', res);
        localStorage.setItem('farmerEmail', this.email);  // save email for next step
        localStorage.setItem("authToken",res.response.token);
        this.router.navigate(['/auth/farmer/reset'],{ replaceUrl: true ,
          state: { successMessage: res.message }
        });
       
      },
      error: (err) => {
        console.error('❌ Error sending OTP', err);
        alert('Failed to send OTP. Try again.');
        this.errorMessage = err.error?.message || 'Something went wrong';
        this.loading = false;
      }
    });
  }
}

