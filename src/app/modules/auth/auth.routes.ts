import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'farmer',
    loadChildren: () =>
      import('./farmer/farmer.routes').then(m => m.FARMER_AUTH_ROUTES)
  },
  {
    path: 'consumer',
    loadChildren: () =>
      import('./consumer/consumer.routes').then(m => m.CONSUMER_AUTH_ROUTES)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then(m => m.ADMIN_AUTH_ROUTES)
  },

    {
    path: 'deliveryPerson',
    loadChildren: () =>
      import('./deliveryPerson/deliveryPerson.routes').then(m => m.DELIVERYPERSON_AUTH_ROUTES)
  }


  
];
