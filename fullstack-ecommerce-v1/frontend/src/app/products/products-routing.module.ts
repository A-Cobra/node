import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { VisualizeProductsComponent } from './visualize-products/visualize-products.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  { path: 'edit/:productId', component: EditProductComponent },
  {
    path: 'create',
    component: CreateProductComponent,
  },
  {
    path: 'form',
    component: ProductFormComponent,
  },
  {
    path: '',
    component: VisualizeProductsComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
