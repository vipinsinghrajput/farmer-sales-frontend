import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service'; // A service for backend API calls
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports:[CommonModule,NotificationComponent]
})
export class DashboardComponent implements OnInit {
  

// @ViewChild('sliderTrack', { static: false }) sliderTrack!: ElementRef;

  adminData: any;
  farmers: any[] = [];
  consumers: any[] = [];
  active: 'dashboard' | 'products' | 'reports' | 'orders' |'profile' | 'users' | 'notification' = 'dashboard';
  showNotification = false;
  unreadCount:number=0;
  // sllider=true;


  constructor(private router: Router, private adminService: AdminService) {}

    ngOnInit() {
    this.loadProfile();
     this.fetchFarmers();
    this.getUnreadNotificationCount();
  }


 showAll = false;

  toggleView() {
    this.showAll = !this.showAll;
  }

   logout() {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('authToken');
      this.router.navigate(['/landing']);
    }
  }



  goTo(route: typeof this.active) {
    this.active = route;
    this.showNotification = route === 'notification';
   if(!this.showNotification)
    this.router.navigate([`admin/${route}`]);
  }


  loadProfile() {
    this.adminService.getProfile().subscribe((res:any) => {
      this.adminData = res.response;
    });
  }


   getUnreadNotificationCount() {
  this.adminService.getAdminNotifications().subscribe({
    next: (res) => {
      const notifications = res.response || [];
      this.unreadCount = notifications.filter((n: { read: any; }) => !n.read).length;
    },
    error: () => {
      this.unreadCount = 0;
    }
  });
}


fetchFarmers() {
   this.adminService.getAllFarmers().subscribe({
    next: (res) => {
      this.farmers = res.response;
    },
    error: (err) => {
      console.error('Error fetching farmers', err);
    }
  });
}

}
