import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../../services/farmer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FarmerNavbarComponent } from "../../shared/farmer-navbar/farmer-navbar.component";
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-farmer-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, FarmerNavbarComponent,ScrollingModule]
})
export class FarmerManageOrdersComponent implements OnInit {
  orders: any[] = [];
  filteredOrders: any[] = [];
  statuses = ['PENDING','CONFIRMED', 'PACKED', 'ASSIGNED','SHIPPED', 'DELIVERED', 'CANCELED'];
  // status = ['CONFIRMED', 'Not Authorized'];
  // selectedStatus: string = 'ALL';
  errorMessage :string| null=null;

   totalPages: number = 0;
currentPage: number = 0;

selectedStatus: string = ''; // empty means ALL
filterFromDate: string | null = null;
filterToDate: string | null = null;

  constructor(private farmerService: FarmerService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(page: number = 0) {
    this.farmerService.getFarmerOrders(page, 10, this.selectedStatus ,this.filterFromDate || undefined, this.filterToDate || undefined).subscribe({
    
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

  onStatusChange(orderId: number, currentStatus: string, newStatus: string) {
    if (confirm(`Are you sure you want to change status from ${currentStatus} to ${newStatus}?`)) {
      this.updateStatus(orderId, newStatus);
    }
  }

  updateStatus(orderId: number, newStatus: string) {
    this.farmerService.updateOrderStatus(orderId, newStatus).subscribe({
      next: () => this.fetchOrders(),
      error: () => alert('Failed to update order status.')
    });
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
  consumerDetails: { [orderId: number]: any } = {};
  addressDetails: { [orderId: number]: any } = {};
  DeliveryPersonDetails: { [orderId: number]: any } = {};
  
  toggleOrderDetails(order: any) {
    if (this.expandedOrderId === order.id) {
      this.expandedOrderId = null;
    } else {
      this.expandedOrderId = order.id;
  
      // Fetch consumer and address details if not already fetched
      if (!this.consumerDetails[order.id]) {
        this.farmerService.getConsumerById(order.consumerId).subscribe({
          next: (res) => this.consumerDetails[order.id] = res.response,
          error: () => this.consumerDetails[order.id] = { error: 'Failed to load consumer' }
        });
      }
  
      if (!this.addressDetails[order.id]) {
        this.farmerService.getAddressById(order.addressId).subscribe({
          next: (res) => this.addressDetails[order.id] = res.response,
          error: () => this.addressDetails[order.id] = { error: 'Failed to load address' }
        });
      }

      if (!this.DeliveryPersonDetails[order.id]) {
        this.farmerService.getDeliveryPersonById(order.deliveryPersonId).subscribe({
          next: (res) => this.DeliveryPersonDetails[order.id] = res.response,
          error: () => this.DeliveryPersonDetails[order.id] = { error: 'Failed to load DeliveryPerson' }
        });
      }
    }
  }
  

availableDeliveryPersons: any[] = [];
assigningOrderId: number | null = null;

prepareToAssign(orderId: number) {
  this.assigningOrderId = orderId;

  this.farmerService.getAvailableDeliveryPersons().subscribe({
    next: (res) => {
      this.availableDeliveryPersons = res.response;
    },
    error: (err) => {
      alert('❌ Failed to load delivery persons');
      console.error(err);
    }
  });
}

assignDeliveryPerson(orderId: number, personId: string) {
  if (!personId) {
    alert('Please select a delivery person.');
    return;
  }

  this.farmerService.assignDeliveryPerson(orderId, +personId).subscribe({
    next: (res) => {
      alert('✅ Delivery person assigned successfully.');
      this.assigningOrderId = null;
      this.availableDeliveryPersons = [];
      this.fetchOrders(); // or refresh orders
    },
    error: (err) => {
      alert('❌ Failed to assign delivery person');
      console.error(err);
    }
  });
}

onPersonSelect(event: Event, orderId: number): void {
  const selectElement = event.target as HTMLSelectElement;
  const selectedPersonId = Number(selectElement.value);
  if (selectedPersonId) {
    this.assignDeliveryPerson(orderId, selectedPersonId.toString());
  }
}


}
