import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/product/products.service';
import { EditCreateProductPayload } from 'src/app/models/edit-create-product-payload.interface';
import { ProductEvent } from 'src/app/models/product-event.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  onFormSubmission(
    createProductEvent: ProductEvent<EditCreateProductPayload>
  ): void {
    this.productsService
      .postProduct(createProductEvent.payload.optional)
      .subscribe({
        error: () => {
          console.log('ERROR creating product');
        },
        next: () => {
          this.router.navigate(['/products']);
        },
      });
  }
}
