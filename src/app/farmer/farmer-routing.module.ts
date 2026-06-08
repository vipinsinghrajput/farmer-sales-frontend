import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [

   {
            path: 'dashboard',
            canActivate: [authGuard],
            loadComponent: () =>
              import('./dashboard/dashboard.component').then(m => m.FarmerDashboardComponent)
          },

          { path: 'manage-products',
            canActivate: [authGuard],
            loadComponent: () =>
            import('./farmer-manage-products/farmer-manage-products.component').then(m => m.FarmerManageProductsComponent)
        },
       
        { path: 'profile',
          canActivate: [authGuard],
          loadComponent: () =>
          import('./profile/profile.component').then(m => m.FarmerProfileComponent)
      },
     
      { path: 'order-history',
        canActivate: [authGuard],
        loadComponent: () =>
        import('.//order-history/order-history.component').then(m => m.FarmerOrderHistoryComponent)
    },
    
    { path: 'manage-orders',
      canActivate: [authGuard],
      loadComponent: () =>
      import('./manage-orders/manage-orders.component').then(m => m.FarmerManageOrdersComponent)
  },

  { path: 'notification',
    canActivate: [authGuard],
    loadComponent: () =>
    import('./notification/notification.component').then(m => m.FarmerNotificationComponent)
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmerRoutingModule { }
