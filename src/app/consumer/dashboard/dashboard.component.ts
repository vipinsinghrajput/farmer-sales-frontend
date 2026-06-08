import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumerService } from '../../services/consumer.service';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from "../notification/notification.component";


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NotificationComponent],
   templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
 
@ViewChild('sliderTrack', { static: false }) sliderTrack!: ElementRef;

  consumerData: any;
  farmers: any[] = [];

  active: 'dashboard' | 'product' | 'cart' | 'orders' | 'orders-history' |'profile' | 'address' | 'notification' = 'dashboard';
  showNotification = false;
  unreadCount:number=0;
  // sllider=true;

  constructor(private router: Router, private consumerService: ConsumerService) {}
  
   
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

  ngOnInit() {
    this.loadProfile();
     this.fetchFarmers();
    this.getUnreadNotificationCount();
   
  }

  goTo(route: typeof this.active) {
    this.active = route;
    this.showNotification = route === 'notification';
   if(!this.showNotification)
    this.router.navigate([`consumer/${route}`]);
  }


  loadProfile() {
    this.consumerService.getProfile().subscribe((res:any) => {
      this.consumerData = res.response;
    });
  }


   getUnreadNotificationCount() {
  this.consumerService.getConsumerNotifications().subscribe({
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
   this.consumerService.getAllFarmers().subscribe({
    next: (res) => {
      this.farmers = res.response.farmers || [];;
      
    },
    error: (err) => {
      console.error('Error fetching farmers', err);
    }
  });
}



viewFarm(farmerId: number) {
  this.router.navigate(['/consumer/view-farm', farmerId]);
}

goToCategory(categoryName: string): void {
  this.router.navigate(['/consumer/product'], {
    queryParams: { category: categoryName }
  });
} 


  categories = [
    {
      name: 'VEGETABLES',
      image: 'veg.jpg'
    },
    {
      name: 'GRAINS',
      image: 'grains.jpg'
    },
    {
      name: 'DAIRY',
      image: 'dairy.jpg'
    },
   
    {
      name: 'HERBS',
      image: 'HERBS.jpg'
    },
    {
      name: 'FRUITS',
      image: 'fruits.jpg'
    },
     {
      name: 'SPICES',
      image: 'SPICES.jpg'
    },
      {
      name: 'VEGETABLES',
      image: 'veg.jpg'
    },
    {
      name: 'GRAINS',
      image: 'grains.jpg'
    },
    {
      name: 'DAIRY',
      image: 'dairy.jpg'
    },
   
    {
      name: 'HERBS',
      image: 'HERBS.jpg'
    },
    {
      name: 'FRUITS',
      image: 'fruits.jpg'
    },
     {
      name: 'SPICES',
      image: 'SPICES.jpg'
    }
  ];

  ngAfterViewInit(): void {
    // Confirm element access
    console.log('Slider track ready:', this.sliderTrack);
     this.startAutoPlay();
  }

  slideLeft(): void {
    this.sliderTrack.nativeElement.scrollBy({
      left: -250,
      behavior: 'smooth'
    });
  }

  slideRight(): void {
    this.sliderTrack.nativeElement.scrollBy({
      left: 250,
      behavior: 'smooth'
    });
  }

 autoPlayInterval: any;

 
 startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      const el = this.sliderTrack.nativeElement;
      const maxScroll = el.scrollWidth - el.clientWidth;

      // If at end, scroll back to start
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        this.slideRight();
      }
    }, 2000); // 3 seconds interval
  }



}
