
// // ✅ functional guard
// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';

// export const authGuard: CanActivateFn = () => {
//   const router = inject(Router);
//   const token = localStorage.getItem('accessToken');

//   if (token) {
//     return true;
//   } else {
//     router.navigate(['/farmer/landing']);
  
//     return false;
//   }
// };
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('accessToken');

  if (!token) {
    router.navigate(['']);
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;
    const currentTime = Math.floor(Date.now() / 1000); // in seconds

    if (expiry < currentTime) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('authToken');
      router.navigate(['']);
      return false;
    }

    return true;
  } catch (err) {
    localStorage.removeItem('accessToken');
    router.navigate(['']);
    return false;
  }
};
