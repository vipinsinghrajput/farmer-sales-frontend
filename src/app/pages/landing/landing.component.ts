import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LandingNavbarComponent } from "../../shared/landing-navbar/landing-navbar.component";
import { jwtDecode } from 'jwt-decode'; // ✅ Correct


@Component({
  selector: 'app-landing',
  imports: [CommonModule, RouterModule, LandingNavbarComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  constructor(private router: Router) {}

  goToFarmerRegister() {
    this.router.navigate(['/auth/farmer/register']);
  }

  goToFarmerLogin() {
    this.router.navigate(['/auth/farmer/login']);
  }
  
  goToConsumerRegister() {
    this.router.navigate(['/auth/consumer/register']);
  }

  goToConsumerLogin() {
    this.router.navigate(['/auth/consumer/login']);
  }

  goToDeliveryPersonRegister() {
    this.router.navigate(['/auth/deliveryPerson/register']);
  }

  goToDeliveryPersonLogin() {
    this.router.navigate(['/auth/deliveryPerson/login']);
  }

  ngOnInit(): void {
    const token = localStorage.getItem('accessToken');
    if (token) {
       const decodedToken: any = jwtDecode(token);
       const role = decodedToken.iss.toLowerCase(); // Assuming token contains `role` field

       console.log('User Role:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', role);
      // this.router.navigate(['/farmer/dashboard']);
      this.router.navigate([`/${role}/dashboard`]);

    }

  }
  
}

