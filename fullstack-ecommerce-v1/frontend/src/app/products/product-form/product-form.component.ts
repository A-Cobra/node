import { Component, Input } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Product } from 'src/app/models/product.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  @Input()
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
  };

  form = this.fb.group({
    name: [this.product.name, []],
    description: [this.product.description, []],
    price: [this.product.price, []],
  });
  constructor(private fb: NonNullableFormBuilder) {}

  onFormSubmit() {
    console.log('Submitting form');
  }
}
