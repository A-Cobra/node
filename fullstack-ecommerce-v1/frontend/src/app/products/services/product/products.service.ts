import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response.interface';
import { Product } from 'src/app/models/product.interface';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${API_URL}/products`);
  }

  getProductById(productId: number): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(
      `${API_URL}/products/${productId}`
    );
  }
}
