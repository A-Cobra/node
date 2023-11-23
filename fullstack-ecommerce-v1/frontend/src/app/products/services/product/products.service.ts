import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response.interface';
import { EditCreateProductPayload } from 'src/app/models/edit-create-product-payload.interface';
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

  patchProductById(productId: number, payload: EditCreateProductPayload): void {
    console.log('PATCHING');
    this.http
      .patch<ApiResponse<null>>(`${API_URL}/products/${productId}`, payload)
      .subscribe({
        next: data => {
          console.log('RESPONSE IN PATCHING');
          console.log(data);
        },
        error: () => {
          throw new Error();
        },
      });
  }

  deleteProductById(productId: number): void {
    this.http
      .delete<ApiResponse<null>>(`${API_URL}/products/${productId}`)
      .subscribe({
        error: () => {
          throw new Error();
        },
      });
  }
}
