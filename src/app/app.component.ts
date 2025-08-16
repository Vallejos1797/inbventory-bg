import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import {HeaderComponent} from './layouts/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MenubarModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items = [
    { label: 'Productos', icon: 'pi pi-list', routerLink: '/products' },
    { label: 'Salir', icon: 'pi pi-sign-out', command: () => this.logout() }
  ];

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}
