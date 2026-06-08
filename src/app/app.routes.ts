import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
 
   { path: 'farmer', loadChildren: () => import('./farmer/farmer.module').then(m => m.FarmerModule) }, 

   { path: 'consumer', loadChildren: () => import('./consumer/consumer.module').then(m => m.ConsumerModule) }, 

   { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },

  //  { path: 'deliveryPerson', loadChildren: () => import('./deliveryPerson/deliveryPerson.module').then(m => m.DeliveryPersonModule) },

        { path: '', component: LandingComponent },
      
        {
          path: 'auth',
          loadChildren: () =>
            import('./modules/auth/auth.routes').then((m) => m.AUTH_ROUTES),
        },

        
          // {
          //   path: 'consumer/dashboard',
          //   canActivate: [authGuard],
          //   loadComponent: () => 
          //       import('./consumer/dashboard/dashboard.component').then(m => m.DashboardComponent)
          // },
          
          // {
          //   path: 'admin/dashboard',
          //   canActivate: [authGuard],
          //   loadComponent: () => 
          //       import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
          // },

//           {
//             path: 'farmer/dashboard',
//             canActivate: [authGuard],
//             loadComponent: () =>
//               import('./farmer/dashboard/dashboard.component').then(m => m.FarmerDashboardComponent)
//           },

//           { path: 'farmer/manage-products',
//             canActivate: [authGuard],
//             loadComponent: () =>
//             import('./farmer/farmer-manage-products/farmer-manage-products.component').then(m => m.FarmerManageProductsComponent)
//         },
       
//         { path: 'farmer/profile',
//           canActivate: [authGuard],
//           loadComponent: () =>
//           import('./farmer/profile/profile.component').then(m => m.FarmerProfileComponent)
//       },
     
//       { path: 'farmer/order-history',
//         canActivate: [authGuard],
//         loadComponent: () =>
//         import('./farmer/order-history/order-history.component').then(m => m.FarmerOrderHistoryComponent)
//     },
    
//     { path: 'farmer/manage-orders',
//       canActivate: [authGuard],
//       loadComponent: () =>
//       import('./farmer/manage-orders/manage-orders.component').then(m => m.FarmerManageOrdersComponent)
//   },

//   { path: 'farmer/notification',
//     canActivate: [authGuard],
//     loadComponent: () =>
//     import('./farmer/notification/notification.component').then(m => m.FarmerNotificationComponent)
// },
          {
            path: 'landing',
            loadComponent: () =>
              import('./pages/landing/landing.component').then(
                (m) => m.LandingComponent
              )
          }
          

//   { path: '**', redirectTo: '' } // fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




