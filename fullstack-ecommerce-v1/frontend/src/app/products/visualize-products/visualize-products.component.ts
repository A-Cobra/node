import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/product/products.service';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response.interface';
import { Product } from 'src/app/models/product.interface';

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

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsData$ = this.productsService.getAllProducts();
  }
}
