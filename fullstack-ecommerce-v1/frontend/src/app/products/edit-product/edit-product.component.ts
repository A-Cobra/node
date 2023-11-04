import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.interface';
import { ProductsService } from '../services/product/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  hasWrongPath = false;

  params: any;
  product!: Product;
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: routeParams => {
        const productId = parseInt(routeParams['productId']);
        if (isNaN(productId)) {
          this.hasWrongPath = true;
          return;
        }
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
        // console.log(routeParams);
      },
      error: err => console.log(err),
    });
  }
}
