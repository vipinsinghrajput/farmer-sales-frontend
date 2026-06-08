import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];
  // unreadCount = 0;
  showDropdown = false;
  showUnreadOnly = false;
  filteredNotifications: any[] = [];
  
  // @Output() unreadCountChange = new EventEmitter<number>();


  

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchNotifications();
  }

  @Output() close = new EventEmitter<void>();

  

  onClose() {
    this.close.emit();
  }
  fetchNotifications() {
    this.adminService.getAdminNotifications().subscribe({

      next: (res) => {
        console.log(res)
        this.notifications = res.response || [];
        // this.unreadCount = this.notifications.filter(n => !n.read).length;
        // this.unreadCountChange.emit(this.unreadCount); // 🔥 Emit to parent
        this.filterNotifications(); 
      },
      error: () => {
        this.notifications = [];
        // this.unreadCount = 0;
        //  this.unreadCountChange.emit(0);
      }
    });
  }

  // toggleDropdown() {
  //   this.showDropdown = !this.showDropdown;
  // }

  markAsRead(notificationId: number) {
    this.adminService.markAsRead(notificationId).subscribe(() => {
      this.fetchNotifications();
    });
    // this.unreadCount = this.notifications.filter(n => !n.read).length;
    // this.unreadCountChange.emit(this.unreadCount); 
  }

  markAllAsRead() {
    this.adminService.markAllAsRead().subscribe(() => {
      this.fetchNotifications();
    });
    //  this.unreadCount = this.notifications.filter(n => !n.read).length;
    // this.unreadCountChange.emit(this.unreadCount); 
  }

 // Toggle filter between unread and all notifications
 toggleFilter() {
  this.showUnreadOnly = !this.showUnreadOnly;
  this.filterNotifications();  // Reapply the filter whenever it's toggled
  
}

// Filter notifications based on whether unread notifications only are being shown
filterNotifications() {
  if (this.showUnreadOnly) {
    this.filteredNotifications = this.notifications.filter(n => !n.read);
  } else {
    this.filteredNotifications = [...this.notifications];
  }
}

}
