import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerService } from '../../services/consumer.service';
import { CommonModule } from '@angular/common';
import { ConsumerNavbarComponent } from '../../shared/consumer-navbar/consumer-navbar.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [CommonModule,ConsumerNavbarComponent,ScrollingModule,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  showFilters = false;
  showPopup = false;
  showAll = false;
  farmersWithProducts: any[] = [];
  cart: any[] = [];
  showReplaceConfirm = false;
  pendingProduct: any = null;
  productsList: any[] = [];
  existFarmerId:any;
   errorMessage: string = '';

    currentPage: number = 0;
  pageSize: number = 50; // Customize if needed
  totalPages: number = 0;
  categories = [ "FRUITS", "VEGETABLES", "DAIRY", "GRAINS", "MEAT", "HERBS", "SPICES"];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private consumerService: ConsumerService
  ) {}

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
    const selectedCategory = params.get('category');

    if (selectedCategory) {
      this.filters.category = selectedCategory;
       this.loadFarmersWithProducts(); // Call method to filter products
    }
  });

    this.loadCart();
    this.loadFarmersWithProducts();
}




changePage(page: number) {
  if (page >= 0 && page <= this.totalPages) {
    this.currentPage = page;
    this.filters.page = this.currentPage;
    this.loadFarmersWithProducts();
  }
}

applyFilters() {
  this.showFilters = false;
   this.currentPage = 0;
  this.loadFarmersWithProducts();
   this.showSuccessPopup();
}

toggleFilters() {
  this.showFilters = !this.showFilters;
}

showSuccessPopup() {
  this.showPopup = true;
  setTimeout(() => this.showPopup = false, 3000);
}

viewFarm(farmerId:any) {
  this.router.navigate(['/consumer/view-farm', farmerId]);
  }


  filters = {
  name: '',
  minPrice: null,
  maxPrice: null,
  category: '',
  page: this.currentPage,
  size: this.pageSize
};


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
  this.loadFarmersWithProducts();
   this.showSuccessPopup();
}


  //   loadFarmersWithProducts(): void {
  //   this.consumerService.getAllFarmers().subscribe({
  //     next: (res: any) => {
  //       const farmers = res.response;
  //       const productRequests = farmers.map((farmer: any) =>

  //         this.consumerService.getAllFarmerProducts({farmerId: farmer.id}).toPromise().then(products => ({
  //           ...farmer,
  //           products: products?.products || []
            
  //         }))
  //       );

  //       Promise.all(productRequests).then((results) => {
  //         this.farmersWithProducts = results;
  //       });
  //     },
  //     error: (err) => {
  //       console.error('Failed to fetch farmers', err);
  //     }
  //   });
  // }



loadFarmersWithProducts(): void {
  this.consumerService.getAllFarmers().subscribe({
    next: (res: any) => {
      const farmers = res.response.farmers || [];;

      const productRequests = farmers.map((farmer: any) => {
        const filtersWithFarmer = {
          ...this.filters,
          farmerId: farmer.id
        };

        return this.consumerService.getAllFarmerProducts(filtersWithFarmer)
          .toPromise()
          .then(products => ({
            ...farmer,
            products: products?.products || []
          }));
      });

      Promise.all(productRequests).then((results) => {
        // this.farmersWithProducts = results;

          // 🔽 Sort descending by product count
        this.farmersWithProducts = results.sort(
          (a, b) => b.products.length - a.products.length
        );
      });
    },
    error: (err) => {
      console.error('❌ Failed to fetch farmers', err);
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
        console.log(item.productId+"aaaaaaaaaaaaaaaaaaa")
        this.consumerService.getProductById(item.productId).subscribe({
          next: (productRes: any) => {
            const availableStock = productRes.response.stock;
            console.log("asdfghjkllkjhgfdsasdfgh"+availableStock)
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
  const currentFarmerId = product.farmerId;

  // If cart is empty, add directly
  if (this.cart.length === 0) {
    this.addProductToCart(product.id);
    return;
  }

  // Otherwise, fetch existing farmerId of cart's first product
  const firstProductId = this.cart[0]?.productId;
console.log('firstProductId:', firstProductId);
  this.consumerService.getProductById(firstProductId).subscribe({
    next: (cartProduct: any) => {
    console.log('Cart product fetched:', cartProduct);

      const existFarmerId = cartProduct.response.farmerId;

      console.log('existFarmerId:', existFarmerId);
      console.log('currentFarmerId:', currentFarmerId);

      if (existFarmerId !== currentFarmerId) {
        this.pendingProduct = product;
        this.showReplaceConfirm = true;
      } else {
        this.addProductToCart(product.id);
      }
    },
    error: err => {
      console.error('Error fetching product by ID:', err);
    }
  });
}

addProductToCart(productId: number) {
  this.consumerService.addToCart(productId).subscribe(() => {
    this.loadCart();
  });
}
  
confirmReplace() {
 
  this.consumerService.addToCart( this.pendingProduct.id).subscribe(() => {
      this.loadCart();
    });

  // Reset
  this.showReplaceConfirm = false;
  this.pendingProduct = null;
}

cancelReplace() {
  this.showReplaceConfirm = false;
  this.pendingProduct = null;
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
