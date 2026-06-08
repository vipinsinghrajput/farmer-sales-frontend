import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumerService } from '../../services/consumer.service';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../../consumer/notification/notification.component';
@Component({
  selector: 'app-consumer-navbar',
  imports: [CommonModule,NotificationComponent],
  templateUrl: './consumer-navbar.component.html',
  styleUrl: './consumer-navbar.component.scss'
})
export class ConsumerNavbarComponent implements OnInit {
  @Input() consumerData: any;
  @Output() routeChanged = new EventEmitter<string>();

  active: 'dashboard' | 'product' | 'cart' | 'orders' | 'orders-history' | 'profile' | 'address' | 'notification' = 'dashboard';
  unreadCount: number = 0;
  showNotification = false;

  constructor(private router: Router, private consumerService: ConsumerService) {}

  ngOnInit(): void {
    this.getUnreadNotificationCount();
  }

  logout(): void {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('authToken');
      this.router.navigate(['/landing']);
    }
  }

  goTo(route: typeof this.active): void {
    this.active = route;
    this.showNotification = route === 'notification';
     if(!this.showNotification)
    this.router.navigate([`consumer/${route}`]);
    // if (route === 'notification') {
    //   this.routeChanged.emit('notification');
    // } else {
    //   this.router.navigate([`/consumer/${route}`]);
    // }
  }

  getUnreadNotificationCount(): void {
    this.consumerService.getConsumerNotifications().subscribe({
      next: (res) => {
        const notifications = res.response || [];
        this.unreadCount = notifications.filter((n: { read: boolean }) => !n.read).length;
      },
      error: () => {
        this.unreadCount = 0;
      }
    });
  }
}
