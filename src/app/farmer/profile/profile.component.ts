import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FarmerService } from '../../services/farmer.service';
import { CommonModule } from '@angular/common';
import { FarmerNavbarComponent } from '../../shared/farmer-navbar/farmer-navbar.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-farmer-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [FormsModule ,CommonModule, ReactiveFormsModule ,FarmerNavbarComponent,ScrollingModule]
})
export class FarmerProfileComponent implements OnInit {
  farmerData: any;
  profileForm!: FormGroup;
  editMode = false;
  constructor(private fb: FormBuilder, private farmerService: FarmerService) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    this.farmerService.getFarmerProfile().subscribe((res: any) => {
      this.farmerData = res.response;
    });
  }

  enableEdit() {
    this.editMode = true;
    this.profileForm = this.fb.group({
      name: [this.farmerData.name],
      email: [this.farmerData.email],
      farmName: [this.farmerData.farmName],
      farmAddress: [this.farmerData.farmAddress],
      pincode: [this.farmerData.pincode],
      farmDescription: [this.farmerData.farmDescription],
      farmLicenseNumber: [this.farmerData.farmLicenseNumber]
    });
  }

  cancelEdit() {
    this.editMode = false;
  }

  errorMessage: string | null = null;
  onUpdate() {

  const updatedData = {
        ...this.farmerData,
        ...this.profileForm.value
      };
  

  this.farmerService.updateFarmerProfile(updatedData).subscribe({
    next: (res) => {
      alert('Profile updated successfully');
      this.editMode = false;
      this.fetchProfile();
    },
    error: (err) => {
      console.error(err);
      this.errorMessage = err.error?.message || 'Something went wrong. Please try again.';
      setTimeout(() => {
         this.errorMessage = null;
        }, 3000);
    }
  });
}
}
