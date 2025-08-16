import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
// import { ApiService } from '../../../core/services/api.service';
import { Product } from '../../../../core/models/product.interface';
import { ProductFormComponent } from '../form/form.component';
import {ButtonGroup} from 'primeng/buttongroup';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    ProductFormComponent,
    ButtonGroup
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  formVisible = false;
  selectedProduct: Product | null = null;

  constructor(
    private api: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.api.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los productos' });
      }
    });
  }

  openForm(product?: Product): void {
    this.selectedProduct = product || null;
    this.formVisible = true;
  }

  saveProduct(data: Omit<Product, 'id' | 'fechaCreacion'>): void {
    if (this.selectedProduct) {
      // Editar
      this.api.updateProduct(this.selectedProduct.id, data).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Producto actualizado' });
        this.loadProducts();
        this.formVisible = false;
      });
    } else {
      // Crear
      this.api.createProduct(data).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Producto creado' });
        this.loadProducts();
        this.formVisible = false;
      });
    }
  }
  deleteProduct(id: number): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar este producto?',
      accept: () => {
        this.api.deleteProduct(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Producto eliminado' });
            this.loadProducts();
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el producto' });
          }
        });
      }
    });
  }
}
