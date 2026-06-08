// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-farmer-login',
//   imports: [CommonModule, ReactiveFormsModule, RouterModule],
//   templateUrl: './farmer-login.component.html',
//   styleUrl: './farmer-login.component.scss'
// })
// export class FarmerLoginComponent {
//   loginForm: FormGroup;

//   constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });
//   }

//   onSubmit() {
//     if (this.loginForm.valid) {
//       const apiUrl = 'http://localhost:8082/farmer/login';
  
//       const params = new HttpParams()
//         .set('email', this.loginForm.value.email)
//         .set('password', this.loginForm.value.password);
  
//       this.http.post(apiUrl, null, { params }).subscribe({
//         next: (res: any) => {
//           localStorage.setItem('farmerToken', res.token);
//           this.router.navigate(['/farmer/dashboard']);
//         },
//         error: (err) => {
//           alert('Login failed!');
//           console.error('Error:', err);
//         }
//       });
//     }
// }
// }


import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-farmer-login',
  templateUrl: './farmer-login.component.html',
  styleUrl: './farmer-login.component.scss',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, ]
})
export class FarmerLoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  errorMsg = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const { email, password } = this.loginData;
    const url = `http://localhost:8082/farmer/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    
  // login() {
  //   this.http.post('http://localhost:8082/farmer/login', this.loginData).subscribe({
    this.http.post(url,{email,password} ).subscribe({
      next: (res: any) => {
        console.log('✅ Login success', res);
        localStorage.setItem('authToken', res.response.token); // 🔐 Store Access Token
        this.router.navigate(['/auth/farmer/verify-otp'],{ replaceUrl: true });
       
        // this.router.navigate(['/farmer/dashboard']);
      },
      error: (err) => {
        // this.errorMsg = 'Invalid credentials or server error';
        this.errorMsg = err.error.message || 'Invalid credentials or server error';
          setTimeout(() => {
          this.errorMsg = '';
          }, 2000); // ⏱️ 2 seconds
        console.error('❌ Login failed:', err);
      }
    });
  }


  // ngOnInit(): void {
  //   const token = localStorage.getItem('accessToken');
  //   if (token) {
  //     this.router.navigate(['/farmer/dashboard']);
  //   }
  // }
  


goToForgotPassword() {
  this.router.navigate(['/auth/farmer/forgot']);
}
}
