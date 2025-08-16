import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, ButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Productos',
        icon: 'pi pi-box',
        routerLink: ['/main/products'],
        routerLinkActiveOptions: { exact: true } 
      },
      {
        label: 'Proveedores',
        icon: 'pi pi-truck',
        routerLink: ['/main/providers'],
        routerLinkActiveOptions: { exact: true }
      }
    ];
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
