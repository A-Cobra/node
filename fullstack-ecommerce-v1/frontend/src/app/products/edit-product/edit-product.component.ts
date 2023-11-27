import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.interface';
import { ProductsService } from '../services/product/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditCreateProductPayload } from 'src/app/models/edit-create-product-payload.interface';
import { ProductEvent } from 'src/app/models/product-event.interface';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { take } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  hasWrongPath = false;
  isFetchingProcessStarted = false;
  wasNotFound = false;

  params: any;
  product!: Product;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  message = {
    notFound: 'Sorry, the product was not found',
    success: (productName: string) =>
      `Product ${productName} created successfully`,
    routeParamsError:
      'There was an error with the Angular Router, please try again',
    editError:
      'There was an error editing the note, please try again or refresh',
    successfulEdit: (productName: string) =>
      `Product ${productName} successfully updated`,
  };

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: routeParams => {
        const productId = parseInt(routeParams['productId']);
        if (isNaN(productId)) {
          this.hasWrongPath = true;
          return;
        }
        this.isFetchingProcessStarted = true;
        this.params = routeParams;
        this.productsService.getProductById(productId).subscribe({
          next: apiResponse => {
            if (apiResponse?.data) {
              this.product = apiResponse.data;
            }
          },
          error: err => {
            this.wasNotFound = true;
            const snackBarRef = this.snackBar.open(
              this.message.notFound,
              'Go Home',
              {
                duration: 3500,
              }
            );
            snackBarRef
              .onAction()
              .pipe(take(1))
              .subscribe({
                next: () => this.goHome(),
              });
          },
        });
      },
      error: () => {
        this.snackBar.open(this.message.routeParamsError, undefined, {
          duration: 3500,
        });
      },
    });
  }

  onFormSubmission(editProductPayload: ProductEvent<EditCreateProductPayload>) {
    const snackBarRef = this.snackBar.open(
      'Are you sure you want to update the product?',
      'YES',
      {
        duration: 3500,
        verticalPosition: this.verticalPosition,
        horizontalPosition: this.horizontalPosition,
      }
    );

    snackBarRef
      .onAction()
      .pipe(take(1))
      .subscribe({
        next: () => {
          try {
            this.productsService.patchProductById(
              editProductPayload.payload.id,
              editProductPayload.payload.optional
            );
            this.snackBar.open(
              this.message.successfulEdit(
                editProductPayload.payload.optional.name
              ),
              undefined,
              { duration: 3500 }
            );
            this.goHome();
          } catch (error) {
            const snackBarRef = this.snackBar.open(
              this.message.editError,
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
          }
        },
      });
  }

  goHome(): void {
    this.router.navigate(['/products']);
  }
}
