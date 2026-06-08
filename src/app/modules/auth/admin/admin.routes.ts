import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';


export const ADMIN_AUTH_ROUTES: Routes = [
//   { path: 'login', component: AdminLoginComponent },
//   { path: 'register', component: AdminRegisterComponent }

{
    path: 'register',
    loadComponent: () =>
      import('./admin-register/admin-register.component').then(
        (m) => m.AdminRegisterComponent
      )
  },
  {
    path: 'verify-otp',
    loadComponent: () =>
      import('./admin-verify-otp/admin-verify-otp.component').then(
        (m) => m.AdminVerifyOtpComponent
      )
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./admin-login/admin-login.component').then(
        (m) => m.AdminLoginComponent
      )
  },

  {
    path: 'forgot',
    loadComponent: () =>
      import('./forgot-password/forgot-password.component').then(m => m.AdminForgotPasswordComponent)
  },

  {
    path: 'reset',
    loadComponent: () =>
      import('./reset-password/reset-password.component').then(m => m.AdminResetPasswordComponent)
  }
  
  
  

];
