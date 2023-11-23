import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.interface';
import { ProductsService } from '../services/product/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditCreateProductPayload } from 'src/app/models/edit-create-product-payload.interface';
import { ProductEvent } from 'src/app/models/product-event.interface';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  hasWrongPath = false;
  isFetchingProcessStarted = false;

  params: any;
  product!: Product;
  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
            console.log(apiResponse);
            if (apiResponse?.data) {
              this.product = apiResponse.data;
            }
          },
          error: err => {
            console.log('error');
            console.log(err);
          },
        });
      },
      error: err => console.log(err),
    });
  }
  onFormSubmission(editProductPayload: ProductEvent<EditCreateProductPayload>) {
    if (window.confirm('Are you sure you want to update the product?')) {
      try {
        this.productsService.patchProductById(
          editProductPayload.payload.id,
          editProductPayload.payload.optional
        );
        this.router.navigate(['/products']);
      } catch (error) {
        console.log('ERROR editing product');
      }
    }
  }
}
