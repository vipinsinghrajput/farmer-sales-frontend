import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminNavbarComponent } from '../../shared/admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-manage-users',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,AdminNavbarComponent],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  farmers: any[] = [];
  consumers: any[] = [];

  selectedTab: 'FARMER' | 'CONSUMER' = 'FARMER';
showFilter = false; // toggle for filter banner


filter = {
  id: '',
  name: '',
  status: '',
  page: 0,
  size: 10
};

totalPages = 0;
currentPage = 0;


// Filter & Pagination for Consumer
consumerFilter = {
  id: '',
  name: '',
  status: '',
  page: 0,
  size: 1
};

showConsumerFilter = false;
consumerTotalPages = 0;
consumerCurrentPage = 0;


  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadFarmers();
  }


  
   loadFarmers() {

   const request = {
    id: this.filter.id ? Number(this.filter.id) : null,
    name: this.filter.name?.trim() || null,
    status:
      this.filter.status === ''
        ? null
        : this.filter.status === 'true'
        ? true
        : false,
    page: this.filter.page,
    size: this.filter.size,
  };
    this.adminService.getFarmerProfile(request).subscribe((res: any) => {
       this.farmers = res.response.farmers;
    this.totalPages = res.response.totalPages;
    this.currentPage = res.response.currentPage;
      // this.farmers = res.response;
    });
  }

   loadConsumers() {

      const request = {
    id: this.consumerFilter.id ? Number(this.consumerFilter.id) : null,
    name: this.consumerFilter.name?.trim() || null,
    status: this.consumerFilter.status === ''
      ? null
      : this.consumerFilter.status === 'true'
        ? true
        : false,
    page: this.consumerFilter.page,
    size: this.consumerFilter.size
  };
    this.adminService.getConsumerProfile(request).subscribe((res: any) => {
     
       this.consumers = res.response.consumers;
    this.consumerTotalPages = res.response.totalPages;
    this.consumerCurrentPage = res.response.currentPage;
      // this.consumers = res.response;
    });
  }
 
  toggleFarmerStatus(farmer: any): void {
    const newStatus = !farmer.status;
    this.adminService.updateFarmerStatus(farmer.id, newStatus).subscribe({
      next: () => this.loadFarmers(),
      error: () => alert('Failed to update  status.')
    });
  }


   toggleConsumerStatus(consumer: any): void {
  
     const newStatus = !consumer.status;
    this.adminService.updateConsumerStatus(consumer.id, newStatus).subscribe({
      next: () => this.loadConsumers(),
      error: () => alert('Failed to update  status.')
    });
  }

  switchTab(tab: 'FARMER' | 'CONSUMER') {
    this.selectedTab = tab;
    if (tab === 'FARMER' && this.farmers.length === 0) this.loadFarmers();
    if (tab === 'CONSUMER' && this.consumers.length === 0) this.loadConsumers();
  }

  onPageChange(newPage: number) {
  this.filter.page = newPage;
  this.loadFarmers();
}


resetFilters() {
  this.filter = { id: '', name: '', status: '', page: 0, size: 10 };
  this.loadFarmers();
}

resetConsumerFilters() {
  this.consumerFilter = { id: '', name: '', status: '', page: 0, size: 10 };
  this.loadConsumers();
}

onConsumerPageChange(newPage: number) {
  this.consumerFilter.page = newPage;
  this.loadConsumers();
}

}