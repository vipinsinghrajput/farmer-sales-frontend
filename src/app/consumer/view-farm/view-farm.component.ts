// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { ConsumerService } from '../../services/consumer.service';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-view-farm',
//   imports: [CommonModule],
//   templateUrl: './view-farm.component.html',
//   styleUrls: ['./view-farm.component.scss']
// })
// export class ViewFarmComponent  implements OnInit {

//   products: any[] = [];
//   cart: any[] = [];
//   farmerId: any ;


//   constructor(private http: HttpClient, private consumerService: ConsumerService,  private route: ActivatedRoute) {}

 
//   ngOnInit(): void {
//   this.route.paramMap.subscribe(params => {
//     this.farmerId = params.get('farmerId');
//     if (this.farmerId) {
//       this.getProducts();
//     }
//   });
// }


//   loadProducts() {
//     this.http.get<any>('https://farmer-sales-backend.onrender.com/products') // Use your real API endpoint
//       .subscribe(
//         res => {
//           this.products = res.response || [];
//         },
//         err => {
//           console.error('Error loading products', err);
//         }
//       );
//   }

//    getProducts() {
//     this.consumerService.getAllFarmerProducts(this.farmerId).subscribe({
//       next: (res) => {
//         this.products = res;
//       },
//       error: (err) => {
//         alert('❌ Failed to get products');
//         // this.errorMsggetall = err.error.message || 'Server error';
//         console.error(err);
//       }
//     });
//   }
//   addToCart(product: any): void {
//     const found = this.cart.find(p => p.id === product.id);
//     if (!found) {
//       this.cart.push(product);
//     }
//   }

//   isInCart(productId: number): boolean {
//     return this.cart.some(p => p.id === productId);
//   }
// }



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerService } from '../../services/consumer.service';
import { CommonModule } from '@angular/common';
import { ConsumerNavbarComponent } from '../../shared/consumer-navbar/consumer-navbar.component';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-view-farm',
  templateUrl: './view-farm.component.html',
  styleUrls: ['./view-farm.component.scss'],
  imports:[CommonModule,ConsumerNavbarComponent,FormsModule, ScrollingModule]
})
export class ViewFarmComponent implements OnInit {
  products: any[] = [];
  cart: any[] = [];
  farmId!: any;
  farmName: string = 'Farmer';
  filters: any;

  currentPage: number = 0;
  pageSize: number = 10; // Customize if needed
  totalPages: number = 0;
 errorMessage: string="";
categories = [ "FRUITS", "VEGETABLES", "DAIRY", "GRAINS", "MEAT", "HERBS", "SPICES"];
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private consumerService: ConsumerService
  ) {}

  ngOnInit(): void {
    this.farmId =  this.route.paramMap.subscribe ( params => {
    this.farmId = params.get('farmerId');

     // Ensure it's a number
    const idNumber = this.farmId ? +this.farmId : null;

  this.filters = {
  farmerId :idNumber,
  name: '',
  minPrice: null,
  maxPrice: null,
  category: '',
  page: this.currentPage,
  size: this.pageSize
};
    this.fetchProducts();
    this.loadCart();
  });
}


changePage(page: number) {
  if (page >= 0 && page <= this.totalPages) {
    this.currentPage = page;
    this.filters.page = this.currentPage;
    this.fetchProducts();
  }
}


applyFilters() {
   this.currentPage = 0;
  this.fetchProducts();
}


  fetchProducts() {
    this.consumerService.getAllFarmerProducts(this.filters).subscribe({
      next: (res: any) => {

        this.products = res.products;
        this.totalPages = res.totalPages;
        this.currentPage = res.currentPage;
        console.log(res)
      },
      error: (err) => {
        console.error('Failed to fetch products:', err);
      }
    });
  }

  // loadCart() {
  //   this.consumerService.getCart().subscribe({
  //     next: (res: any) => {
  //       this.cart = res.items || [];
  //     }
  //   });
  // }

  loadCart() {
  this.consumerService.getCart().subscribe({
    next: (res: any) => {
      this.cart = res.items || [];

      // ✅ After loading cart, validate quantities against stock
      this.cart.forEach(item => {
        this.consumerService.getProductById(item.productId).subscribe({
          next: (productRes: any) => {
            const availableStock = productRes.response.stock;
            if (item.quantity > availableStock) {
              // Auto-correct the quantity
              this.consumerService.updateQuantity(item.productId, availableStock).subscribe(() => {
                this.loadCart(); // Refresh after update
                alert(`⚠️ Quantity of ${productRes.response.name} adjusted to available stock: ${availableStock}`);
              });
            }
          },
          error: (err) => {
            console.error(`❌ Failed to get product ${item.productId} stock`, err);
          }
        });
      });
    },
    error: (err) => {
      console.error('❌ Failed to load cart', err);
    }
  });
}


  addToCart(product: any) {
    console.log(product)
    this.consumerService.addToCart(product.id).subscribe(() => {
      this.loadCart();
    });
  }

  // increment(product: any) {
  //   this.consumerService.incrementQuantity(product.id).subscribe(() => {
  //     this.loadCart();
  //   });
  // }

   increment(product: any) {
  this.errorMessage = ''; // Clear previous error

  this.consumerService.incrementQuantity(product.id).subscribe({
    next: () => {
      this.loadCart();
    },
    error: (err) => {
      this.errorMessage = err.error?.message || '❌ Failed to increase quantity.';
      alert(this.errorMessage);
      setTimeout(() => this.errorMessage = '', 3000); // Clear after 3 seconds
      console.error(err);
    }
  });
}

  decrement(product: any) {
    this.consumerService.decrementQuantity(product.id).subscribe(() => {
      this.loadCart();
    });
  }

  isInCart(productId: number): boolean {
    return this.cart.some(item => item.productId === productId);
  }

  getQuantity(productId: number): number {
    const item = this.cart.find(i => i.productId === productId);
    return item ? item.quantity : 0;
  }

  goToCart() {
    this.router.navigate(['/consumer/cart']);
  }
}
