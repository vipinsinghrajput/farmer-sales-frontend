import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FarmerService } from '../../services/farmer.service';
import { debounceTime, finalize } from 'rxjs';
import { FarmerNavbarComponent } from '../../shared/farmer-navbar/farmer-navbar.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-create-product',
  templateUrl: './farmer-manage-products.component.html',
  styleUrls: ['./farmer-manage-products.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,FarmerNavbarComponent,ScrollingModule]
})
export class FarmerManageProductsComponent {
 
  showFilters = false;
  showPopup = false;
  productForm: FormGroup;
  selectedFiles: File[] = [];
  responseMessage = '';
  productResponse: any;
  showForm: boolean = false;
  loading: boolean = false;


  products: any[] = [];
  productById: any;
  productIdInput: any ;

  showAddForm: boolean = false;
  isUpdating: boolean = false;
  updatingProductId: number | null = null;

  errorMsgadd: '' | undefined;
  errorMsgupdate: '' | undefined;
  errorMsgget: '' | undefined;
  errorMsgdelete: '' | undefined;
  errorMsggetall: '' | undefined;

   currentPage: number = 0;
  pageSize: number = 8; // Customize if needed
  totalPages: number = 0;
 categories = [ "FRUITS", "VEGETABLES", "DAIRY", "GRAINS", "MEAT", "HERBS", "SPICES"];

searchControl = new FormControl('');


  @ViewChild('fileInput') fileInput!: ElementRef;


  constructor(private fb: FormBuilder, private farmerService: FarmerService) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(1000)]],
      unit: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
  }

  ngOnInit() {
  this.getProducts(); // Automatically fetch products on load

  this.searchControl.valueChanges
  .pipe(debounceTime(300))
  .subscribe(value => {
    this.filters.name = value ?? ''; // Use empty string if null
    this.applySearch();
  });


}
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

   toggleForm() {
    this.showForm = !this.showForm;
    this.showAddForm = !this.showAddForm;
    this.isUpdating = false;
    this.productForm.reset();
    this.selectedFiles = [];
  }

  onSubmit() {
    // if (this.productForm.invalid) {
    //   alert('Please fill the form correctly.');
    //   return;
    // }

    this.loading = true;

    const formData = new FormData();
    Object.entries(this.productForm.value).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

  //  this.selectedFiles.forEach(file => {
  //     formData.append('files', file);
  //   });
    if (this.selectedFiles.length > 0) {
  this.selectedFiles.forEach(file => {
    formData.append('files', file);
  });
} else {
  formData.append('files', new Blob([]), ''); // ensures backend gets the part
}


    if (this.isUpdating && this.updatingProductId !== null) {
      // Call update API
      this.farmerService.updateProduct(this.updatingProductId, formData)
       .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (res) => {
          this.responseMessage = res.message || '✅ Product updated successfully';
          this.productResponse = res.response;
          this.resetForm();
          this.getProducts();
          setTimeout(() => {
                     this.responseMessage = '';
                 }, 5000); // 30 seconds = 30000 ms

        },
        error: (err) => {
          this.responseMessage = err.error.message || '❌ Error updating product';
          this.errorMsgupdate = err.error.message || 'Server error';
          console.error(err);
         
           setTimeout(() => {
                     this.responseMessage = '';
                 }, 5000);
        },
     
      });
    } else {
      // Create new product
      // if (this.selectedFiles.length === 0) {
      //   alert('Please select at least one image.');
      //   return;
      // }

      this.farmerService.addProduct(formData)
       .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (res) => {
          this.responseMessage = res.message;
          this.productResponse = res.response;
          this.resetForm();
          this.getProducts();
           setTimeout(() => {
                     this.responseMessage = '';
                 }, 5000);
        },
        error: (err) => {
          this.responseMessage = err.error.message ||'❌ Error creating product.';
          this.errorMsgadd = err.error.message || 'Server error';
          console.error(err);
           setTimeout(() => {
                     this.responseMessage = '';
                 }, 5000);
        }
      });
    }
  }

  updateProduct(product: any) {
    this.resetForm();
   this.showAddForm = true;
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      unit: product.unit,
      price: product.price,
      stock: product.stock,
      category: product.category
    });

    this.isUpdating = true;
    this.updatingProductId = product.id;
    this.selectedFiles = []; // clear previously selected files
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to form
  }

  resetForm() {
    this.productForm.reset();
    this.selectedFiles = [];
    this.isUpdating = false;
    this.updatingProductId = null;
   
    if (this.fileInput) {
    this.fileInput.nativeElement.value = '';
  }
  }


  filters = {
  name: '',
  minPrice: null,
  maxPrice: null,
  category: '',
  page: this.currentPage,
  size: this.pageSize
};

applyFilters() {
  this.showFilters = false;
   this.currentPage = 0;
  this.getProducts();
   this.showSuccessPopup();
}
applySearch() {
  // this.showFilters = false;
   this.currentPage = 0;
  this.getProducts();
  //  this.showSuccessPopup();
}

changePage(page: number) {
  if (page >= 0 && page <= this.totalPages) {
    this.currentPage = page;
    this.filters.page = this.currentPage;
    this.getProducts();
  }
}

resetFilters() {
  this.filters = {
    name: '',
    minPrice: null,
    maxPrice: null,
    category: '',
    page: 0,
    size: 10
  };
  this.showFilters = false;
  this.getProducts();
   this.showSuccessPopup();
}

toggleFilters() {
  this.showFilters = !this.showFilters;
}

showSuccessPopup() {
  this.showPopup = true;
  setTimeout(() => this.showPopup = false, 3000);
}
  getProducts() {
    this.farmerService.getAllProducts(this.filters).subscribe({
      next: (res) => {
         this.products = res.products;
        this.totalPages = res.totalPages;
        this.currentPage = res.currentPage;
        // this.products = res.products;
      },
      error: (err) => {
        alert('❌ Failed to get products');
        this.errorMsggetall = err.error.message || 'Server error';
        console.error(err);
      }
    });
  }

  getProductById() {
    this.farmerService.getProductById(this.productIdInput).subscribe({
      next: (res) => {
        this.productById = res.response;
      },
      error: (err) => {
        this.errorMsgget = err.error.message || 'Server error';
        console.error(err);
      }
    });
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.farmerService.deleteProduct(id).subscribe({
        next: () => {
          alert('✅ Product deleted');
          this.getProducts();
        },
        error: (err) => {
          alert('❌ Failed to delete product');
          this.errorMsgdelete = err.error.message || 'Server error';
          console.error(err);
        }
      });
    }
  }


scrollToProduct(productId: number): void {
  const element = document.getElementById(`product-${productId}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    element.classList.add('highlight');

    // Remove highlight after 2 seconds
    setTimeout(() => {
      element.classList.remove('highlight');
    }, 2000);
  } else {
    alert(`Product with ID ${productId} not found.`);
  }
}



  
}
