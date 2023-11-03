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
        console.log('OK');

        const productId = parseInt(routeParams['productId']);
        console.log('productId');
        console.log(productId);
        if (isNaN(productId)) {
          this.hasWrongPath = true;
          console.log('WRONG PATH');
        }
        // console.log(typeof productId);
        this.params = routeParams;
        // console.log(routeParams);
      },
      error: err => console.log(err),
    });
  }
}
