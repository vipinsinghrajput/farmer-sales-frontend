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

          { path: 'users',
          canActivate: [authGuard],
          loadComponent: () =>
          import('./manage-users/manage-users.component').then(m => m.ManageUsersComponent)
        },

        { path: 'notification',
    canActivate: [authGuard],
    loadComponent: () =>
    import('./notification/notification.component').then(m => m.NotificationComponent)
}
      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
