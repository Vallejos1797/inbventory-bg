import { Injectable } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/environments';

const PRODUCT_URL: string = `${environment.urlBase}Products`;


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCT_URL);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${PRODUCT_URL}/${id}`);
  }

  createProduct(product: Omit<Product, 'id' | 'fechaCreacion'>): Observable<Product> {
    return this.http.post<Product>(PRODUCT_URL, product);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${PRODUCT_URL}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${PRODUCT_URL}/${id}`);
  }
}
