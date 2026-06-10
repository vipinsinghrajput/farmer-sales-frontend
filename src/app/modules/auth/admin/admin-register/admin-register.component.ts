// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-admin-register',
//   templateUrl: './admin-register.component.html',
//   styleUrl: './admin-register.component.scss',
//   standalone: true,
//   imports: [ CommonModule, FormsModule, ReactiveFormsModule ]
// })
// export class AdminRegisterComponent {
//   adminData = {
//     name: '',
//     email: '',
//     password: ''
//   };

//   constructor(private http: HttpClient, private router: Router) {}

//   registerAdmin() {
//     this.http.post('https://farmer-sales-backend.onrender.com/admin/register', this.adminData)
//       .subscribe({
//         next: (res: any) => {
//           console.log('✅ Admin registration success', res);
//           localStorage.setItem('authToken', res.response.token);
//           this.router.navigate(['/auth/admin/verify-otp'],{ replaceUrl: true });
//         },
//         error: (err) => {
//           console.error('❌ Admin registration failed', err);
//         }
//       });
//   }
// }


import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.scss',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ]
})
export class AdminRegisterComponent {
  
  adminData = {
    name: '',
    email: '',
    password: ''
  };

  errorMsg: string | undefined;
  
  constructor(private http: HttpClient, private router: Router) {}
  // @ViewChild('successRef') successRef!: ElementRef;
  @ViewChild('errorRef') errorRef!: ElementRef;

  registerAdmin() {
    this.errorMsg = '';

    this.http.post('https://farmer-sales-backend.onrender.com/admin/register', this.adminData)
      .subscribe({
        next: (res: any) => {
          console.log('✅ Admin registration success', res);
          localStorage.setItem('authToken', res.response.token);
          this.router.navigate(['/auth/admin/verify-otp'], { 
            replaceUrl: true,
            state: { successMsg: 'Registration successful! Please verify the OTP sent to your email.' }
          });
        },
        error: (err) => {
          console.error('❌ Admin registration failed', err);
          if (err.error?.message) {
            this.errorMsg = err.error.message;
          } else {
            this.errorMsg = 'Something went wrong. Please try again.';
          }
          setTimeout(() => {
            this.errorRef?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        }
      });
  }
}
