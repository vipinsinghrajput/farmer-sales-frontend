import { Component, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-farmer-register',
  templateUrl: './farmer-register.component.html',
  styleUrl: './farmer-register.component.scss',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, ]
  
})

export class FarmerRegisterComponent {
  farmerData = {
    name: '',
    mobileNumber: '',
    email: '',
    password: '',
    farmName: '',
    farmAddress: '',
    farmCity:'',                
    farmState:'',
    farmCountry:'',
    pincode: '',
    farmDescription: '',
    farmLicenseNumber: ''
  };
  errorMsg: string | undefined;
  // successMsg: string | undefined;
  
  constructor(private http: HttpClient, private router: Router) {}
  @ViewChild('successRef') successRef!: ElementRef;
@ViewChild('errorRef') errorRef!: ElementRef;


  registerFarmer() {

    // this.successMsg = '';
    this.errorMsg = '';

    this.http.post('http://localhost:8082/farmer/register', this.farmerData)
      .subscribe({
        next: (res:any) => {
          console.log(' Registration success', res);
          // Store email/phone temporarily for verifying OTP
          localStorage.setItem("authToken",res.response.token);
         
          // this.successMsg = 'Registration successful! Please verify the OTP sent to your email or phone.';
        
            this.router.navigate(['/auth/farmer/verify-otp'], { replaceUrl: true ,
            state: { successMsg: 'Registration successful! Please verify the OTP sent to your email.' }
        });
        },
        error: (err) => {
          console.error(' Registration failed', err);
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
