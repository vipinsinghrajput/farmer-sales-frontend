import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  deliveryData = {
    name: '',
    mobile: '',
    email: '',
    password: '',
    vehicleNumber: '',
    licenseNumber: ''
  };

  errorMsg: string | undefined;

  @ViewChild('errorRef') errorRef!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  registerDeliveryPerson() {
    this.errorMsg = '';

    this.http.post('http://localhost:8082/delivery/register', this.deliveryData)
      .subscribe({
        next: (res: any) => {
          console.log('🚚 Delivery Person Registration Success', res);
          localStorage.setItem("authToken", res.response.token);

          this.router.navigate(['/auth/deliveryPerson/verify-otp'], {
            replaceUrl: true,
            state: { successMsg: 'Registration successful! Please verify the OTP sent to your email.' }
          });
        },
        error: (err) => {
          console.error('❌ Registration Failed', err);
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
