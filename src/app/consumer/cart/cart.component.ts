// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { ConsumerService } from '../../services/consumer.service';

// @Component({
//   selector: 'app-cart',
//   imports: [CommonModule],
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.scss']
// })
// export class CartComponent  implements OnInit {
//   cartItems: any[] = [];

//   constructor(private http: HttpClient, private consumerService:ConsumerService) {}

//   ngOnInit(): void {
//     this.fetchCart();
//   }


//  fetchCart() {
//     this.consumerService.getCart().subscribe({
//         next: (res:any) => {
//           console.log(res.cartId)
//           this.cartItems = res.items || [];
//         },
//         error: (err) => {
//           console.error('❌ Failed to fetch cart', err);
//         }
//     });
//   }

//   incrementQuantity(item: any): void {
//     item.quantity++;
//   }

//   decrementQuantity(item: any): void {
//     if (item.quantity > 1) {
//       item.quantity--;
//     }
//   }

//   confirmCart(): void {
//     const payload = this.cartItems.map(item => ({
//       productId: item.productId,
//       quantity: item.quantity
//     }));

//     this.http.post('https://farmer-sales-backend.onrender.com/cart/confirm', payload)
//       .subscribe({
//         next: (res) => {
//           alert('✅ Cart confirmed successfully');
//         },
//         error: (err) => {
//           alert('❌ Failed to confirm cart');
//           console.error(err);
//         }
//       });
//   }
// }



import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConsumerService } from '../../services/consumer.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ConsumerNavbarComponent } from '../../shared/consumer-navbar/consumer-navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, ReactiveFormsModule,FormsModule,ConsumerNavbarComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
 
  cartItems: any[] = [];
  totalAmount: number = 0;

  addresses: any[] = [];
  selectedAddressId: number | null =null;
  addressForm: FormGroup;


  constructor(private consumerService: ConsumerService,private fb: FormBuilder, private http: HttpClient, private router: Router) {

          this.addressForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  
    this.loadCart();
    this.fetchAddresses();

  }

validateCartBeforeCheckout(): void {
  this.cartItems.forEach(item => {
    this.consumerService.getProductById(item.productId).subscribe({
      next: (res: any) => {
        const availableStock = res.response.stock;
        const available = res.response.available;
        if (!available) {
          alert(`❌ ${item.productName} is no longer available and has been removed from your cart.`);
          this.remove(item);
        } else if (item.quantity > availableStock) {
          alert(`⚠️ Quantity for ${item.productName} reduced to ${availableStock} due to limited stock.`);
          item.quantity = availableStock;
        }
      },
      error: (err) => {
        console.error(`❌ Failed to validate ${item.productName}`, err);
      }
    });
  });
}

  fetchAddresses() {
     this.consumerService.fetchAddresses()
      .subscribe(res => {
        this.addresses = res;
        if (this.addresses.length) {
          this.selectedAddressId = this.addresses[0].id;
        }
      });
    
  }

  // saveNewAddress() {
  //   if (this.addressForm.valid) {
  //     this.consumerService.saveNewAddress(this.addressForm.value)
  //       .subscribe(res => {
  //         alert('✅ Address added!');
  //         this.fetchAddresses(); // Refresh address list
  //         this.selectedAddressId = res.response.id; // Select new one
  //       });
  //   }
  // }
  errorMessage: string = '';

saveNewAddress() {
  this.errorMessage = ''; // Clear any previous error

  if (this.addressForm.valid) {
    this.consumerService.saveNewAddress(this.addressForm.value).subscribe({
      next: (res) => {
        alert('✅ Address added!');
        this.fetchAddresses(); // Refresh list
        this.selectedAddressId = res.response.id; // Select new one
      },
      error: (err) => {
        alert(err.error?.message || '❌ Failed to add address.');

        this.errorMessage = '❌ Failed to add address. Please try again.';
        console.error(err);
      }
    });
  } else {
    this.errorMessage = '❗ Please fill all required fields correctly.';
  }
}



  loadCart() {
    this.consumerService.getCart().subscribe({
      next: (res:any) => {
        this.cartItems = res.items || [];
        this.calculateTotal();
           this.validateCartBeforeCheckout();
            this.fetchAddresses();
      },
      error: (err) => {
        console.error('Error loading cart:', err);
      }
    });
  }

  // increment(item: any) {
  //   this.consumerService.incrementQuantity(item.productId).subscribe(() => this.loadCart());
  // }

  increment(item: any) {
  this.errorMessage = ''; // Clear previous error

  this.consumerService.incrementQuantity(item.productId).subscribe({
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

  decrement(item: any) {
    this.consumerService.decrementQuantity(item.productId).subscribe(() => this.loadCart());
  }

  remove(item: any) {
    this.consumerService.removeItem(item.productId).subscribe(() => this.loadCart());
  }
 


platformFee: number = 0;
deliveryFee: number = 0;
finalAmount: number = 0;
platformFeePercentage: number = 5; // 5% platform fee

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    // 2️⃣ Platform fee as percentage
  this.platformFee = (this.totalAmount * this.platformFeePercentage) / 100;

  // 3️⃣ Call backend to get delivery fee
   this.fetchDeliveryFee();
  
  }


  onAddressChange(event: any) {
   this.loadCart();
}

viewProduct() {
  this.router.navigate(['/consumer/product']);
}

fetchDeliveryFee() {
 const productId = this.cartItems[0].productId;;
 const addressId = this.selectedAddressId;
 this.consumerService.deliveryfee(addressId,productId).subscribe({
      next: (res:any) => {
        this.deliveryFee = res.response;
         this.finalAmount = this.totalAmount + this.platformFee +  this.deliveryFee;
      },
      error: (err) => {
        // console.error('Error loading distance:', err);
         console.error("❌ Failed to get distance", err);
         alert('❌ Failed to get distance'+ err)
        this.deliveryFee = 0;
        this.finalAmount = this.totalAmount + this.platformFee;
      }
    });
  }

  checkout() {
    if(this.selectedAddressId != null){
    this.consumerService.checkout(this.selectedAddressId).subscribe({
      next: (res) => {
        alert('✅ Order placed successfully!');
        this.loadCart();
      },
      error: (err) => {
        alert('❌ Failed to checkout');
      }
    });
    }else
     alert('❌ Please Select Delivery Address ');
  }
}
