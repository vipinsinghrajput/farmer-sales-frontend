// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-admin-verify-otp',
// //   imports: [],
// //   templateUrl: './admin-verify-otp.component.html',
// //   styleUrl: './admin-verify-otp.component.scss'
// // })
// // export class AdminVerifyOtpComponent {

// // }


// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-admin-verify-otp',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './admin-verify-otp.component.html',
//   styleUrl: './admin-verify-otp.component.scss',
// })
// export class AdminVerifyOtpComponent {
//   otpData = {
//     otp: ''
//   };

//   constructor(private http: HttpClient, private router: Router) {}

//   verifyOtp() {
//     const { otp } = this.otpData;
//     const authToken = localStorage.getItem('authToken'); // 🔐 Retrieve saved auth token
//     console.log("auth token == > " + authToken);

//     const url = `http://localhost:8082/admin/verify-otp?otp=${encodeURIComponent(otp)}`;
    
//     const headers = {
//       'Authorization': `Bearer ${authToken}`  // 👈 Send token as Bearer
//     };

//     console.log("headers == > " + headers);
//     this.http.post(url, { otp }, { headers }).subscribe({
//       next: (res: any) => {
//         console.log('✅ Admin OTP verified', res);
//         localStorage.setItem('accessToken', res.response.accessToken); // Store access token

//         this.router.navigate(['/farmer/dashboard'],); // Redirect to Admin dashboard
//       },
//       error: (err) => {
//         console.error('❌ Admin OTP verification failed', err);
//       }
//     });
//   }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-verify-otp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-verify-otp.component.html',
  styleUrl: './admin-verify-otp.component.scss',
})
export class AdminVerifyOtpComponent {
  otpData = {
    otp: ''
  };
  successMsg: string = '';
  errorMsg: any;

  constructor(private http: HttpClient, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { successMsg: string };
    this.successMsg = state?.successMsg || '';
  }

  verifyOtp() {
    const { otp } = this.otpData;
    const authToken = localStorage.getItem('authToken'); // 🔐 Retrieve saved auth token
    console.log("auth token == >", authToken);

    const url = `http://localhost:8082/admin/verify-otp?otp=${encodeURIComponent(otp)}`;

    const headers = {
      'Authorization': `Bearer ${authToken}` // 👈 Send token as Bearer
    };

    console.log("headers == >", headers);
    this.http.post(url, otp, { headers }).subscribe({
      next: (res: any) => {
        console.log('✅ Admin OTP verified', res);
        localStorage.setItem('accessToken', res.response.accessToken);
        console.log("access  token  == > ",res.response.accessToken)
        this.router.navigate(['/admin/dashboard'], { replaceUrl: true });
      },
      error: (err) => {
        console.error('❌ Admin OTP verification failed', err);

        if (err.error?.message) {
          this.errorMsg = err.error.message;
        } else {
          this.errorMsg = 'Something went wrong. Please try again.';
        }
      }
    });
  }
}

// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-consumer-verify-otp',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './consumer-verify-otp.component.html',
//   styleUrl: './consumer-verify-otp.component.scss',
// })
// export class ConsumerVerifyOtpComponent {

//   otpData = {
//     otp: ''
//   };

//   successMsg: string = '';
//   errorMsg: any;

//   constructor(private http: HttpClient, private router: Router) {
//     const navigation = this.router.getCurrentNavigation();
//     const state = navigation?.extras.state as { successMsg: string };
//     this.successMsg = state?.successMsg || '';
//   }

//   verifyOtp() {
//     const { otp } = this.otpData;
//     const authToken = localStorage.getItem('authToken');

//     console.log("auth token ==> " + authToken);

//     const url = `http://localhost:8082/consumer/verify-otp?otp=${encodeURIComponent(otp)}`;
//     const headers = {
//       'Authorization': `Bearer ${authToken}`
//     };

//     console.log("headers ==> ", headers);

//     this.http.post(url, otp, { headers }).subscribe({
//       next: (res: any) => {
//         console.log('✅ Consumer OTP verified', res);
//         localStorage.setItem('accessToken', res.response.accessToken);

//         this.router.navigate(['/consumer/dashboard'], { replaceUrl: true });
//       },
//       error: (err) => {
//         console.error('❌ Consumer OTP verification failed', err);

//         if (err.error?.message) {
//           this.errorMsg = err.error.message;
//         } else {
//           this.errorMsg = 'Something went wrong. Please try again.';
//         }
//       }
//     });
//   }
// }
