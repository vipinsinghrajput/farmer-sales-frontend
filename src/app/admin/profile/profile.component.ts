import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { AdminNavbarComponent } from '../../shared/admin-navbar/admin-navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [FormsModule,AdminNavbarComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
 
  adminData: any;
  profileForm!: FormGroup;
  editMode = false;
  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    this.adminService.getProfile().subscribe((res: any) => {
      this.adminData = res.response;
      console.log(this.adminData+"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    });
  }

  enableEdit() {
    this.editMode = true;
    this.profileForm = this.fb.group({
      name: [this.adminData.name]
    });
  }

  cancelEdit() {
    this.editMode = false;
  }

  errorMessage: string | null = null;
  onUpdate() {

  const updatedData = {
        ...this.adminData,
        ...this.profileForm.value
      };
  

  this.adminService.updateProfile(updatedData).subscribe({
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
