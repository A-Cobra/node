import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/product/products.service';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response.interface';
import { Product } from 'src/app/models/product.interface';
import { ProductEvent } from 'src/app/models/product-event.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualize-products',
  templateUrl: './visualize-products.component.html',
  styleUrls: ['./visualize-products.component.scss'],
})
export class VisualizeProductsComponent implements OnInit {
  productsData$!: Observable<ApiResponse<Product[]>>;
  prods: Product[] = [
    { id: 1, name: 'myName', description: 'anyDesc', price: 14 },
  ];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateProducts();
  }

  handleProductCardEvent(productCardEvent: ProductEvent): void {
    if (productCardEvent.type === 'edit') {
      this.redirectToEditProductPage(productCardEvent.payload.id);
      return;
    }
    this.deleteProduct(productCardEvent.payload.id);
  }

  redirectToEditProductPage(productId: number): void {
    this.router.navigate(['/products', 'edit', productId]);
  }
  deleteProduct(productId: number): void {
    if (window.confirm('DO you really want to delete the product?')) {
      try {
        this.productsService.deleteProductById(productId);
        this.updateProducts();
      } catch (error) {
        console.log('Error deleting product');
      }
    }
  }

  updateProducts(): void {
    this.productsData$ = this.productsService.getAllProducts();
  }
}
