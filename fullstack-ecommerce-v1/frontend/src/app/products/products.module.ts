import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from './services/product/products.service';

@NgModule({
  declarations: [CreateProductComponent],
  imports: [CommonModule, ProductsRoutingModule, HttpClientModule],
  exports: [CreateProductComponent],
  providers: [ProductsService],
})
export class ProductsModule {}
