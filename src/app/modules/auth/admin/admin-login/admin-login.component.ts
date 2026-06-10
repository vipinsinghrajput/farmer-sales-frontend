

// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-admin-login',
//   templateUrl: './admin-login.component.html',
//   imports: [CommonModule, FormsModule, ReactiveFormsModule],
//   standalone: true
// })
// export class AdminLoginComponent {
//   loginData = {
//     email: '',
//     password: ''
//   };
//   errorMsg = '';

//   constructor(private http: HttpClient, private router: Router) {}

//   login() {
//     const { email, password } = this.loginData;
//     const url = `https://farmer-sales-backend.onrender.com/admin/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    
//     this.http.post(url, { email, password }).subscribe({
//       next: (res: any) => {
//         console.log('✅ Admin login success', res);
//         localStorage.setItem('authToken', res.response.token); // Store the token
//         this.router.navigate(['/auth/admin/verify-otp'],{ replaceUrl: true }); // Redirect to OTP verification
//       },
//       error: (err) => {
//         this.errorMsg = 'Invalid credentials or server error';
//         console.error('❌ Admin login failed:', err);
//       }
//     });
//   }

//   ngOnInit(): void {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       this.router.navigate(['/farmer/dashboard']);
//     }

//   }

  
//   goToForgotPassword() {
//     this.router.navigate(['/auth/admin/forgot']);
//   }
//   }



import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, ]
})
export class AdminLoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  errorMsg = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const { email, password } = this.loginData;
    const url = `https://farmer-sales-backend.onrender.com/admin/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    
  // login() {
  //   this.http.post('https://farmer-sales-backend.onrender.com/farmer/login', this.loginData).subscribe({
    this.http.post(url,{email,password} ).subscribe({
      next: (res: any) => {
        console.log('✅ Login success', res);
        localStorage.setItem('authToken', res.response.token); // 🔐 Store Access Token
        this.router.navigate(['/auth/admin/verify-otp'],{ replaceUrl: true });
       
        // this.router.navigate(['/farmer/dashboard']);
      },
      error: (err) => {
        // this.errorMsg = 'Invalid credentials or server error';
        this.errorMsg = err.error.message || 'Invalid credentials or server error';
        console.error('❌ Login failed:', err);
      }
    });
  }


  // ngOnInit(): void {
  //   const token = localStorage.getItem('accessToken');
  //   if (token) {
  //     this.router.navigate(['/admin/dashboard']);
  //   }
  // }
  


goToForgotPassword() {
  this.router.navigate(['/auth/admin/forgot']);
}
}

