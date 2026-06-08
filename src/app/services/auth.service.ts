import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {




  private tokenKey = 'accessToken'; // adjust if your key is different

  constructor() {}

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // logout(): void {
  //   localStorage.removeItem(this.tokenKey);
  //   localStorage.removeItem('userRole'); // optional: clear role
  // }

    logout(): void { 
      localStorage.removeItem('accessToken');
      localStorage.removeItem('authToken');
  }
  
}
