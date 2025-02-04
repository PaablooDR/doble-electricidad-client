import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/users/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/invoices/list/list.page').then( m => m.ListPage),
    canActivate: [loginGuard]
  },
];
