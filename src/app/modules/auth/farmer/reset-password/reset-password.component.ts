// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-reset-password',
//   imports: [],
//   templateUrl: './reset-password.component.html',
//   styleUrl: './reset-password.component.scss'
// })
// export class ResetPasswordComponent {

// }


import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-farmer-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  standalone: true,
  imports: [FormsModule,CommonModule]
})
export class ResetPasswordComponent {
  resetData = {
    otp: '',
    newPassword: ''
  };
  successMessage: string;
  errorMessage:string | undefined;
  isLoading = false;


  constructor(private http: HttpClient, private router: Router) {

    const nav = this.router.getCurrentNavigation();
  const state = nav?.extras?.state as { successMessage: string };
  this.successMessage = state?.successMessage || '';
  } 
 


onSubmit() {
  const email = localStorage.getItem('farmerEmail');
  const authToken = localStorage.getItem('authToken');

  

  const apiUrl = `https://farmer-sales-backend.onrender.com/farmer/reset-password`;

  const headers = {
    'Authorization': `Bearer ${authToken}`
  };

  const body = {
    otp: this.resetData.otp,
    newPassword: this.resetData.newPassword
  };

  this.isLoading = true;
  this.errorMessage = '';

  this.http.post(apiUrl, body, { headers }).subscribe({
    next: () => {
      this.isLoading = false;
      alert('✅ Password reset successful!');
      localStorage.removeItem('farmerEmail');
      localStorage.removeItem('authToken');
      this.router.navigate(['/auth/farmer/login'],{ replaceUrl: true });
      
    },
    error: (err) => {
      this.isLoading = false;
      console.error('❌ Reset failed', err);
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