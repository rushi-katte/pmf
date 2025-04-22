import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product  } from './Product';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';
  private apiUrl1 = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl1}`);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8080/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`http://localhost:8080/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/${id}`);
  }
}
