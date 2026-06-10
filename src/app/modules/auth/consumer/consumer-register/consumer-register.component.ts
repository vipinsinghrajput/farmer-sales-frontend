import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-consumer-register',
  templateUrl: './consumer-register.component.html',
  styleUrl: './consumer-register.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})

export class ConsumerRegisterComponent {
  consumerData = {
    name: '',
    mobileNumber: '',
    email: '',
    password: '',
    deliveryAddress: '',
    pincode: ''
  };

  errorMsg: string | undefined;
  // successMsg: string | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  @ViewChild('successRef') successRef!: ElementRef;
  @ViewChild('errorRef') errorRef!: ElementRef;

  registerConsumer() {
    this.errorMsg = '';

    this.http.post('https://farmer-sales-backend.onrender.com/consumer/register', this.consumerData)
      .subscribe({
        next: (res: any) => {
          console.log('Registration success', res);
          localStorage.setItem("authToken", res.response.token);

          this.router.navigate(['/auth/consumer/verify-otp'], {
            replaceUrl: true,
            state: { successMsg: 'Registration successful! Please verify the OTP sent to your email.' }
          });
        },
        error: (err) => {
          console.error('Registration failed', err);
          if (err.error?.message) {
            this.errorMsg = err.error.message;
          } else {
            this.errorMsg = 'Something went wrong. Please try again.';
          }
          setTimeout(() => {
            this.errorRef?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            this.errorRef.nativeElement.focus();
          }, 100);
        }
      });
  }
}
