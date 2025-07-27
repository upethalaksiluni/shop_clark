import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, ProductsResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<ProductsResponse>(this.baseUrl).pipe(
      map(response => response.products)
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<ProductsResponse>(`${this.baseUrl}/category/${category}`).pipe(
      map(response => response.products)
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<ProductsResponse>(`${this.baseUrl}/search?q=${query}`).pipe(
      map(response => response.products)
    );
  }

  getLimitedProducts(limit: number = 30): Observable<Product[]> {
    return this.http.get<ProductsResponse>(`${this.baseUrl}?limit=${limit}`).pipe(
      map(response => response.products)
    );
  }
}