import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../../../core/models/product.interface';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule, InputTextModule, ButtonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class ProductFormComponent implements OnChanges {
  @Input() visible = false;
  @Input() product: Product | null = null;
  form!: FormGroup;

  @Output() save = new EventEmitter<Omit<Product, 'id' | 'fechaCreacion'>>();
  @Output() close = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    imagenUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/i)]],
  });
}


  ngOnChanges(changes: SimpleChanges): void {
    if ('product' in changes) {
      if (this.product) {
        this.form.patchValue({
          nombre: this.product.nombre ?? '',
          descripcion: this.product.descripcion ?? '',
          imagenUrl: (this.product as any).imagenUrl ?? ''
        });
        this.form.markAsPristine();
      } else {
        this.form.reset();
      }
    }
  }

  submit(): void {
    if (this.form.invalid) return;
    this.save.emit(this.form.value as Omit<Product, 'id' | 'fechaCreacion'>);
  }

  onHide(): void {
    this.form.reset();
    this.close.emit();
  }
}
