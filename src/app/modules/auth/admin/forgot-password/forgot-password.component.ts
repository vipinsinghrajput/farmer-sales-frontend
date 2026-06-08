// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-forgot-password',
// //   imports: [],
// //   templateUrl: './forgot-password.component.html',
// //   styleUrl: './forgot-password.component.scss'
// // })
// // export class ForgotPasswordComponent {

// // }


// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-admin-forgot-password',
//   templateUrl: './forgot-password.component.html',
//   standalone: true,
//   imports: [FormsModule]
// })
// export class AdminForgotPasswordComponent {
//   email = '';

//   // constructor(private http: HttpClient) {}
//   constructor(private http: HttpClient, private router: Router) {}

//   onSubmit() {
//     const apiUrl = `http://localhost:8082/admin/forgot-password?email=${this.email}`;
//     this.http.post(apiUrl,{}).subscribe({
//       next: (res:any) => {
//         alert('✅ OTP sent to admin email!');
//         console.log(' forgot success', res);
//         localStorage.setItem('adminEmail', this.email);
//         localStorage.setItem("authToken",res.response.token);
//         this.router.navigate(['/auth/admin/reset'],{ replaceUrl: true });
//       },
//       error: (err) => {
//         console.error('❌ Error sending OTP', err);
//         alert('Failed to send OTP. Try again.');
//       }
//     });
//   }
// }


import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  standalone: true,
  imports: [FormsModule,CommonModule]
})
export class AdminForgotPasswordComponent {
  email = '';
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const apiUrl = `http://localhost:8082/admin/forgot-password?email=${this.email}`;
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.http.post(apiUrl, {}).subscribe({
      next: (res: any) => {
        alert('✅ OTP sent to admin email!');
        console.log('forgot password success', res);
        localStorage.setItem('adminEmail', this.email); // Save email for reset password step
        localStorage.setItem('authToken', res.response.token); // Save temporary auth token

        this.router.navigate(['/auth/admin/reset'], { 
          replaceUrl: true,
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
