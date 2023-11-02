import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductsService } from './services/product/products.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CreateProductComponent],
  imports: [CommonModule, ProductsRoutingModule, HttpClientModule],
  exports: [CreateProductComponent],
})
export class ProductsModule {}
