import { Routes } from '@angular/router';
import { loginGuard, authGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    // If the user is logged, redirect to list page, if the user is not logged, redirect to login
    path: '',
    loadComponent: () => {
        return localStorage.getItem('token_doble_electricidad') 
            ? import('./pages/invoices/list/list.page').then( m => m.ListPage) 
            : import('./pages/users/login/login.page').then(m => m.LoginPage);
    },
    pathMatch: 'full',
  },
  // Login path verifying if user is logged
  {
    path: 'login',
    loadComponent: () => import('./pages/users/login/login.page').then( m => m.LoginPage),
    canActivate: [authGuard]
  },
  // Paths that only users' logged can access
  {
    path: 'list',
    loadComponent: () => import('./pages/invoices/list/list.page').then( m => m.ListPage),
    canActivate: [loginGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/users/profile/profile.page').then( m => m.ProfilePage),
    canActivate: [loginGuard]
  },
];
