import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/product/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {}
}
