import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConsumerService } from '../../services/consumer.service';
import { FarmerService } from '../../services/farmer.service';
import { ConsumerNavbarComponent } from '../../shared/consumer-navbar/consumer-navbar.component';


@Component({
  selector: 'app-orders',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule,ConsumerNavbarComponent]
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  filteredOrders: any[] = [];
  errorMessage :string| null=null;
  totalPages: number = 0;
currentPage: number = 0;

selectedStatus: string = ''; // empty means ALL
filterFromDate: string | null = null;
filterToDate: string | null = null;

statuses = ['PENDING','CONFIRMED', 'PACKED', 'ASSIGNED','SHIPPED', 'DELIVERED', 'CANCELED'];


  constructor(private consumerService: ConsumerService , private farmerService:FarmerService ) {}

  ngOnInit(): void {
    this.fetchOrders();
  }




  fetchOrders(page: number = 0) {
  this.consumerService.getConsumerOrders(page, 10, this.selectedStatus ,this.filterFromDate || undefined, this.filterToDate || undefined)
    .subscribe({
      next: (res) => {
        this.orders = res.orders;
        this.filteredOrders = this.orders;
        this.totalPages = res.totalPages;
        this.currentPage = res.currentPage;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load orders.';
          setTimeout(() => {
    this.errorMessage = null;
  }, 3000);
      }
    });
}

filterOrders() {
  this.fetchOrders(0); // Reset to first page on filter
}


prevPage() {
  if (this.currentPage > 0) {
    this.fetchOrders(this.currentPage - 1);
  }
}

nextPage() {
  if (this.currentPage < this.totalPages - 1) {
    this.fetchOrders(this.currentPage + 1);
  }
}


  getBadgeClass(status: string): string {
    switch (status) {
      case 'PENDING': return 'badge pending';
      case 'CONFIRMED': return 'badge confirmed';
      case 'PACKED': return 'badge packed';
      case 'ASSIGNED': return 'badge assigned';
      case 'SHIPPED': return 'badge shipped';
      case 'DELIVERED': return 'badge delivered';
      case 'CANCELED': return 'badge canceled';
      default: return 'badge';
    }
  }


  expandedOrderId: number | null = null;
  farmerDetails: { [orderId: number]: any } = {};
  DeliveryPersonDetails: { [orderId: number]: any } = {};
  
  toggleOrderDetails(order: any) {
    if (this.expandedOrderId === order.id) {
      this.expandedOrderId = null;
    } else {
      this.expandedOrderId = order.id;
  
      // Fetch consumer and address details if not already fetched
     if (!this.farmerDetails[order.id]) {
  const firstProductId = order.items?.[0]?.productId;
   
  if (firstProductId) {
    this.consumerService.getProductById(firstProductId).subscribe({
      next: (productRes) => {
        const farmerId = productRes.response.farmerId;
        if (farmerId) {
          this.consumerService.getFarmerById(farmerId).subscribe({
            next: (farmerRes) => this.farmerDetails[order.id] = farmerRes.response,
            error: () => this.farmerDetails[order.id] = { error: 'Failed to load farmer' }
          });
        }
      },
      error: () => {
        this.farmerDetails[order.id] = { error: 'Failed to load product info' };
      }
    });
  }
}


      if (!this.DeliveryPersonDetails[order.id]) {
        this.farmerService.getDeliveryPersonById(order.deliveryPersonId).subscribe({
          next: (res) => this.DeliveryPersonDetails[order.id] = res.response,
          error: () => this.DeliveryPersonDetails[order.id] = { error: 'Failed to load DeliveryPerson' }
        });
      }
    }
  }
  


showCancelReasonMap: { [orderId: number]: boolean } = {};
cancelReasonMap: { [orderId: number]: string } = {};

// showCancelReason: boolean = false;
// cancelReason: string = '';
cancelReasons: string[] = [
  "Ordered by mistake",
  "Found a better price elsewhere",
  "Expected delivery is too late",
  "Need to change delivery address",
  "Need to change items in the order",
  "Delivery time is too long",
  "Changed my mind",
  "Order placed with wrong payment method",
  "I don’t want the product anymore",
  "Other"
];

cancelOrder(orderId: number, reason: string) {
  // Call your API here
  this.consumerService.cancelOrder(orderId, reason).subscribe({
    next: (res) => {
      alert('Order canceled successfully');
       this.showCancelReasonMap[orderId] = false;
       this.cancelReasonMap[orderId] = '';
      // Optionally refresh orders
    },
    error: (err) => {
      alert('Failed to cancel order: ' + err.message);
    }
  });
}


}
