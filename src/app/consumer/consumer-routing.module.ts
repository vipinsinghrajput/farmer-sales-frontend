import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
   {
            path: 'dashboard',
            canActivate: [authGuard],
            loadComponent: () => 
                import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
          },
            { path: 'profile',
          canActivate: [authGuard],
          loadComponent: () =>
          import('./profile/profile.component').then(m => m.ProfileComponent)
        },
         { path: 'orders',
        canActivate: [authGuard],
        loadComponent: () =>
        import('./order/order.component').then(m => m.OrdersComponent)
       },
        { path: 'orders-history',
        canActivate: [authGuard],
        loadComponent: () =>
        import('./order-history/order-history.component').then(m => m.OrderHistoryComponent)
       },
        { path: 'notification',
        canActivate: [authGuard],
        loadComponent: () =>
        import('./notification/notification.component').then(m => m.NotificationComponent)
},
 { path: 'view-farm/:farmerId',
        canActivate: [authGuard],
        loadComponent: () =>
        import('./view-farm/view-farm.component').then(m => m.ViewFarmComponent)
},
{ path: 'cart',
        canActivate: [authGuard],
        loadComponent: () =>
        import('./cart/cart.component').then(m => m.CartComponent)
},
{ path: 'product',
        canActivate: [authGuard],
        loadComponent: () =>
        import('./product/product.component').then(m => m.ProductComponent)
}


];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class ConsumerRoutingModule { }
