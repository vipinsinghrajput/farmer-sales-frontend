import { Routes } from '@angular/router';
import { ConsumerLoginComponent } from './consumer-login/consumer-login.component';
import { ConsumerRegisterComponent } from './consumer-register/consumer-register.component';

export const CONSUMER_AUTH_ROUTES: Routes = [
//   { path: 'login', component: ConsumerLoginComponent },
//   { path: 'register', component: ConsumerRegisterComponent }

{
    path: 'register',
    loadComponent: () =>
      import('./consumer-register/consumer-register.component').then(
        (m) => m.ConsumerRegisterComponent
      )
  },
  {
    path: 'verify-otp',
    loadComponent: () =>
      import('./consumer-verify-otp/consumer-verify-otp.component').then(
        (m) => m.ConsumerVerifyOtpComponent
      )
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./consumer-login/consumer-login.component').then(
        (m) => m.ConsumerLoginComponent
      )
  },

  {
    path: 'forgot',
    loadComponent: () =>
      import('./forgot-password/forgot-password.component').then(m => m.ConsumerForgotPasswordComponent)
  },

  {
    path: 'reset',
    loadComponent: () =>
      import('./reset-password/reset-password.component').then(m => m.ConsumerResetPasswordComponent)
  }
  
  

];
