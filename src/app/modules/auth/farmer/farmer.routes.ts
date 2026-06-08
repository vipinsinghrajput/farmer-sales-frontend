import { Routes } from '@angular/router';
import { FarmerLoginComponent } from './farmer-login/farmer-login.component';
import { FarmerRegisterComponent } from './farmer-register/farmer-register.component';


export const FARMER_AUTH_ROUTES: Routes = [
//   { path: 'login', component: FarmerLoginComponent },
//   { path: 'register', component: FarmerRegisterComponent }


// export const FARMER_AUTH_ROUTES: Routes = [
    {
      path: 'register',
      loadComponent: () =>
        import('./farmer-register/farmer-register.component').then(
          (m) => m.FarmerRegisterComponent
        )
    },
    {
      path: 'verify-otp',
      loadComponent: () =>
        import('./farmer-verify-otp/farmer-verify-otp.component').then(
          (m) => m.FarmerVerifyOtpComponent
        )
    },
    {
      path: 'login',
      loadComponent: () =>
        import('./farmer-login/farmer-login.component').then(
          (m) => m.FarmerLoginComponent
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
  



// {
//     path: 'auth/farmer/register',
//     loadComponent: () => import('./farmer-register/farmer-register.component').then(m => m.FarmerRegisterComponent)
//   },
//   {
//     path: 'auth/farmer/verify-otp',
//     loadComponent: () => import('./farmer-verify-otp/farmer-verify-otp.component').then(m => m.FarmerVerifyOtpComponent)
//   },
//   {
//     path: 'auth/farmer/login',
//     loadComponent: () => import('./farmer-login/farmer-login.component').then(m => m.FarmerLoginComponent)
//   }
// ];


