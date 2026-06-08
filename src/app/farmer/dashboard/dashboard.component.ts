import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FarmerService } from '../../services/farmer.service';
import { FarmerNotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-farmer-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports:[CommonModule,FarmerNotificationComponent]
})
export class FarmerDashboardComponent {

  farmerData: any;
  unreadCount: number = 0;
  //  unreadMCount: number = 0;

  
   // which menu item is active
   active: 'dashboard' | 'products' | 'orders' | 'profile' | 'history' | 'notifications' = 'dashboard';

   // for collapse toggle
   sidebarCollapsed = false;
 
  constructor(private router: Router , private farmerService:FarmerService) {}

  ngOnInit() {
      this.farmerService.getFarmerProfile().subscribe((res: any) => {
        this.farmerData = res.response;
      });
       this.getUnreadNotificationCount(); 
  }

 // navigate and set active

 showNotification = false;

 goTo(route: typeof this.active) {
  this.active = route;
  
  if (route === 'notifications') {
    this.showNotification = true; // show the notification
  } else {
    this.showNotification = false; // hide it on other routes
  }

  // adapt these paths to your routing
  switch (route) {
    case 'dashboard':
      this.router.navigate(['farmer/dashboard']);
      break;
    case 'products':
      this.router.navigate(['farmer/manage-products']);
      break;
    case 'orders':
      this.router.navigate(['farmer/manage-orders']);
      break;
    case 'history':
      this.router.navigate(['farmer/order-history']);
      break;
   case 'profile':
      this.router.navigate(['farmer/profile']);
      break;
  }
}

  logout() {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('authToken');
      this.router.navigate(['/landing']);
    }
  }


  getUnreadNotificationCount() {
  this.farmerService.getFarmerNotifications().subscribe({
    next: (res) => {
      const notifications = res.response || [];
      this.unreadCount = notifications.filter((n: { read: any; }) => !n.read).length;
    },
    error: () => {
      this.unreadCount = 0;
    }
  });
}


}

