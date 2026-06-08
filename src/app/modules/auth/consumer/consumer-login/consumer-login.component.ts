// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-consumer-login',
//   imports: [],
//   templateUrl: './consumer-login.component.html',
//   styleUrl: './consumer-login.component.scss'
// })
// export class ConsumerLoginComponent {

// }


import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-consumer-login',
  templateUrl: './consumer-login.component.html',
  styleUrl: './consumer-login.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class ConsumerLoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  errorMsg = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const { email, password } = this.loginData;
    const url = `http://localhost:8082/consumer/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    
    this.http.post(url, { email, password }).subscribe({
      next: (res: any) => {
        console.log('✅ Consumer login success', res);
        localStorage.setItem('authToken', res.response.token);
        this.router.navigate(['/auth/consumer/verify-otp'],{ replaceUrl: true });
      },
      error: (err) => {
        // this.errorMsg = 'Invalid credentials or server error';
        console.error('❌ Consumer login failed:', err);
        this.errorMsg = err.error.message || 'Invalid credentials or server error';
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
    this.router.navigate(['/auth/consumer/forgot'],);
  }
  }

