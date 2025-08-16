import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../../core/models/product.interface';
// import { Product } from '../../../core/models/product.interface';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DialogModule
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() visible = false;
  @Input() product: Product | null = null;
  @Output() save = new EventEmitter<Omit<Product, 'id' | 'fechaCreacion'>>();
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [this.product?.nombre || '', Validators.required],
      descripcion: [this.product?.descripcion || '', Validators.required],
      imagenUrl: [this.product?.imagenUrl || '', [Validators.required, Validators.pattern(/^https?:\/\//)]]
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onHide(): void {
    this.close.emit();
  }
}
