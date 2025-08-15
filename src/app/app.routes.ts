import { Routes } from '@angular/router';
import { ListComponent } from './products/list/list.component';

export const routes: Routes = [
  { path: 'products', component: ListComponent },
  { path: '**', redirectTo: 'products' }
];
