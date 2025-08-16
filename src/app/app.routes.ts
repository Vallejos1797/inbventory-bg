// import { Routes } from '@angular/router';
// import { ListComponent } from './feactures/products/components/list/list.component';
// import {LoginComponent} from './auth/login/login.component';
// import {AuthGuard} from './auth/auth.guard';

// export const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   {
//     path: 'register',
//     loadComponent: () =>
//       import('./auth/pages/register/register.component').then(m => m.RegisterComponent)
//   },
//   { path: 'products', component: ListComponent, canActivate: [AuthGuard] },
//   { path: '**', redirectTo: 'products' }
// ];

import { Routes } from '@angular/router';

// Páginas/Componentes
import { LoginComponent } from './auth/login/login.component';


// Guard
import { AuthGuard } from './auth/auth.guard';
import { MainComponent } from './layouts/components/main/main/main.component';
import { ListComponent } from './feactures/products/components/list/list.component';

export const routes: Routes = [
  // Público
  { path: 'login', component: LoginComponent },

  // Layout privado
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'products', component: ListComponent },
      // { path: 'providers', loadComponent: () => import('./core/features/providers/components/list/list.component').then(m => m.ProvidersListComponent) },
      { path: '', redirectTo: 'products', pathMatch: 'full' },
    ],
  },

  // Redirecciones
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', redirectTo: 'main', pathMatch: 'full' },
];

