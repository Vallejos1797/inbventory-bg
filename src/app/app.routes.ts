import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';


import { AuthGuard } from './auth/auth.guard';
import { MainComponent } from './layouts/components/main/main/main.component';
import { ListComponent } from './feactures/products/components/list/list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'products', component: ListComponent },
      { path: '', redirectTo: 'products', pathMatch: 'full' },
    ],
  },

  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', redirectTo: 'main', pathMatch: 'full' },
];

