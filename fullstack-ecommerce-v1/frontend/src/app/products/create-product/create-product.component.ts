import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/product/products.service';
import { EditCreateProductPayload } from 'src/app/models/edit-create-product-payload.interface';
import { ProductEvent } from 'src/app/models/product-event.interface';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { take } from 'rxjs';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  message = {
    error:
      'Sorry, the limit for product creation was reached, please delete any other product an try again later',
    success: (productName: string) =>
      `Product ${productName} created successfully`,
  };

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onFormSubmission(
    createProductEvent: ProductEvent<EditCreateProductPayload>
  ): void {
    this.productsService
      .postProduct(createProductEvent.payload.optional)
      .subscribe({
        error: () => {
          const snackBarRef = this.snackBar.open(
            this.message.error,
            'Go Home',
            {
              duration: 3500,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            }
          );
          snackBarRef
            .onAction()
            .pipe(take(1))
            .subscribe({
              next: () => this.goHome(),
            });
        },
        next: () => {
          this.goHome();
        },
      });
  }

  goHome(): void {
    this.router.navigate(['/products']);
  }
}
