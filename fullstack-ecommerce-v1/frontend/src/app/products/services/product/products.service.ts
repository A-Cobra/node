import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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

  patchProductById(
    productId: number,
    payload: EditCreateProductPayload
  ): Observable<ApiResponse<null>> {
    return this.http.patch<ApiResponse<null>>(
      `${API_URL}/products/${productId}`,
      payload
    );
  }

  deleteProductById(productId: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(
      `${API_URL}/products/${productId}`
    );
  }

  postProduct(
    product: EditCreateProductPayload
  ): Observable<ApiResponse<null>> {
    return this.http
      .post<ApiResponse<null>>(`${API_URL}/products`, product)
      .pipe(
        map(data => {
          if (!data.success) {
            throw new Error();
          }
          return data;
        })
      );
  }
}
