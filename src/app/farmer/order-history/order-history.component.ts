import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../../services/farmer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FarmerNavbarComponent } from '../../shared/farmer-navbar/farmer-navbar.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
 // Adjust the path as needed

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
  imports:[FormsModule,CommonModule,FarmerNavbarComponent,ScrollingModule]
})
export class FarmerOrderHistoryComponent implements OnInit {
  orders: any[] = [];
  errorMessage : string | null = null;
  filteredOrders: any[] = [];
  statuses: string[] = ['PENDING' ,'CONFIRMED', 'PACKED', 'SHIPPED', 'DELIVERED', 'CANCELED'];
 
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
  this.farmerService.getFarmerOrders(page, 10, this.selectedStatus ,this.filterFromDate || undefined, this.filterToDate || undefined)
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







 
