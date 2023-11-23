import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from './services/product/products.service';
import { VisualizeProductsComponent } from './visualize-products/visualize-products.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { FloatNumberOrNumberRangeDirective } from '../directives/float-number-or-number-range.directive';

@NgModule({
  declarations: [
    CreateProductComponent,
    VisualizeProductsComponent,
    ProductFormComponent,
    EditProductComponent,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FloatNumberOrNumberRangeDirective,
  ],
  exports: [CreateProductComponent],
  providers: [ProductsService],
})
export class ProductsModule {}
