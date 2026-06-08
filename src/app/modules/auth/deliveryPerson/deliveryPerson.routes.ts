import { Routes } from '@angular/router';


export const DELIVERYPERSON_AUTH_ROUTES: Routes = [
//   { path: 'login', component: ConsumerLoginComponent },
//   { path: 'register', component: ConsumerRegisterComponent }

{
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then(
        (m) => m.RegisterComponent
      )
  },
  {
    path: 'verify-otp',
    loadComponent: () =>
      import('./verify-otp/verify-otp.component').then(
        (m) => m.VerifyOtpComponent
      )
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(
        (m) => m.LoginComponent
      )
  },

  {
    path: 'forgot',
    loadComponent: () =>
      import('./forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },

  {
    path: 'reset',
    loadComponent: () =>
      import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  }
  
  

];
