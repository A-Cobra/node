import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/product/products.service';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response.interface';
import { Product } from 'src/app/models/product.interface';
import { ProductEvent } from 'src/app/models/product-event.interface';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-visualize-products',
  templateUrl: './visualize-products.component.html',
  styleUrls: ['./visualize-products.component.scss'],
})
export class VisualizeProductsComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  message = {
    success: (productName: number) =>
      `Product with id ${productName} deleted successfully`,
    error: 'There was a problem deleting the product, please try again later',
  };

  productsData$!: Observable<ApiResponse<Product[]>>;
  prods: Product[] = [
    { id: 1, name: 'myName', description: 'anyDesc', price: 14 },
  ];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.updateProducts();
  }

  handleProductCardEvent(productCardEvent: ProductEvent<null>): void {
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
    const snackBarRef = this.snackBar.open(
      'Do you really want to delete the product?',
      'YES',
      {
        duration: 4000,
        verticalPosition: this.verticalPosition,
        horizontalPosition: this.horizontalPosition,
      }
    );

    snackBarRef.onAction().subscribe({
      next: () => {
        try {
          this.productsService.deleteProductById(productId);
          this.updateProducts();
          this.snackBar.open(this.message.success(productId), undefined, {
            duration: 3500,
          });
        } catch (error) {
          this.snackBar.open(this.message.error, undefined, {
            duration: 3500,
          });
        }
      },
    });
  }

  updateProducts(): void {
    this.productsData$ = this.productsService.getAllProducts();
  }
}
