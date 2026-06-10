// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-admin-reset-password',
//   templateUrl: './reset-password.component.html',
//   standalone: true,
//   imports: [FormsModule]
// })
// export class AdminResetPasswordComponent {
//   resetData = {
//     otp: '',
//     newPassword: ''
//   };

//   constructor(private http: HttpClient, private router: Router) {}

// onSubmit() {
//   const email = localStorage.getItem('adminEmail');
//   const authToken = localStorage.getItem('authToken');

  

//   const apiUrl = `https://farmer-sales-backend.onrender.com/admin/reset-password`;

//   const headers = {
//     'Authorization': `Bearer ${authToken}`
//   };

//   const body = {
//     otp: this.resetData.otp,
//     newPassword: this.resetData.newPassword
//   };

//   this.http.post(apiUrl, body, { headers }).subscribe({
//     next: () => {
//       alert('✅ Password reset successful!');
//       localStorage.removeItem('adminEmail');
//       localStorage.removeItem('authToken');
//       this.router.navigate(['/auth/admin/login']);
      
//     },
//     error: (err) => {
//       console.error('❌ Reset failed', err);
//       alert('Reset failed. Please try again.');
//     }
//   });
// }
// }

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class AdminResetPasswordComponent {
  resetData = {
    otp: '',
    newPassword: ''
  };
  successMessage: string = '';
  errorMessage: string | undefined = '';

  constructor(private http: HttpClient, private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { successMessage: string };
    this.successMessage = state?.successMessage || '';
  }

  onSubmit() {
    const email = localStorage.getItem('adminEmail');
    const authToken = localStorage.getItem('authToken');

    const apiUrl = `https://farmer-sales-backend.onrender.com/admin/reset-password`;

    const headers = {
      'Authorization': `Bearer ${authToken}`
    };

    const body = {
      otp: this.resetData.otp,
      newPassword: this.resetData.newPassword
    };

    this.http.post(apiUrl, body, { headers }).subscribe({
      next: () => {
        alert('✅ Password reset successful!');
        localStorage.removeItem('adminEmail');
        localStorage.removeItem('authToken');
        this.router.navigate(['/auth/admin/login'], { replaceUrl: true });
      },
      error: (err) => {
        console.error('❌ Reset failed', err);
        alert('Reset failed. Please try again.');
        if (err.error?.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      }
    });
  }
}

