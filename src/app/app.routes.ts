import { Routes } from '@angular/router';
import { ListComponent } from './products/list/list.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuard} from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/pages/register/register.component').then(m => m.RegisterComponent)
  },
  { path: 'products', component: ListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'products' }
];
