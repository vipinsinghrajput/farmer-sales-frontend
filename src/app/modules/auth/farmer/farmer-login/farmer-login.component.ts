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
//       const apiUrl = 'https://farmer-sales-backend.onrender.com/farmer/login';
  
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
  errorMsg: string | undefined;
  isLoading = false;

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.errorMsg = '';
    this.isLoading = true;

    const { email, password } = this.loginData;
    const url = `https://farmer-sales-backend.onrender.com/farmer/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    this.http.post(url, null).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        console.log('Login success', res);
        
        localStorage.setItem("authToken", res.response.token);
       
        this.router.navigate(['/auth/farmer/verify-otp'], { replaceUrl: true ,
          state: { successMsg: 'Login successful! Please verify the OTP sent to your email.' }
      });
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Login failed', err);
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
