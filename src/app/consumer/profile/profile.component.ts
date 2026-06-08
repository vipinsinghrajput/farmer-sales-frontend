import { Component, OnInit } from '@angular/core';
import { ConsumerService } from '../../services/consumer.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConsumerNavbarComponent } from '../../shared/consumer-navbar/consumer-navbar.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  // standalone:true,
  imports: [FormsModule ,CommonModule, ReactiveFormsModule,ConsumerNavbarComponent]
})

export class ProfileComponent  implements OnInit {
 
  consumerData: any;
  profileForm!: FormGroup;
  editMode = false;
  constructor(private fb: FormBuilder, private consumerService: ConsumerService) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    this.consumerService.getProfile().subscribe((res: any) => {
      this.consumerData = res.response;
      console.log(this.consumerData)
    });
  }

  enableEdit() {
    this.editMode = true;
    this.profileForm = this.fb.group({
      name: [this.consumerData.name],
      email: [this.consumerData.email],
      deliveryAddress: [this.consumerData.deliveryAddress],
      pincode: [this.consumerData.pincode]
    });
  }

  cancelEdit() {
    this.editMode = false;
  }

  errorMessage: string | null = null;
  onUpdate() {

  const updatedData = {
        ...this.consumerData,
        ...this.profileForm.value
      };
  

  this.consumerService.updateProfile(updatedData).subscribe({
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

