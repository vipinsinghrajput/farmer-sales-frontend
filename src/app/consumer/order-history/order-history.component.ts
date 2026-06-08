import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConsumerService } from '../../services/consumer.service';
import { ConsumerNavbarComponent } from '../../shared/consumer-navbar/consumer-navbar.component';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
  imports:[FormsModule,CommonModule,ConsumerNavbarComponent]
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = [];
  errorMessage : string | null = null;
  filteredOrders: any[] = [];
  statuses: string[] = ['PENDING' ,'CONFIRMED', 'PACKED', 'SHIPPED', 'DELIVERED', 'CANCELED'];
  totalPages: number = 0;
  currentPage: number = 0;

selectedStatus: string = ''; // empty means ALL
filterFromDate: string | null = null;
filterToDate: string | null = null;
  

  constructor(private consumerService: ConsumerService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  // fetchOrders() {
  //   this.consumerService.getConsumerOrders().subscribe({
  //     next: (res) => {
  //       console.log('Fetched orders:', res);
  //       this.orders = res;
  //       this.applyFilter();
  //     },
  //     error: (err) => {
  //       this.errorMessage = err.error?.message || 'Something went wrong!';
  //     }
  //   });
  // }

  // onFilterChange() {
  //   this.applyFilter();
  // }


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
 
}
