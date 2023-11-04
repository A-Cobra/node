import { AfterViewInit, Component, Input } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Product } from 'src/app/models/product.interface';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements AfterViewInit {
  @Input()
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
  };

  form = this.buildReactiveForm();

  constructor(private fb: NonNullableFormBuilder) {}

  ngAfterViewInit(): void {
    this.form = this.buildReactiveForm();
  }

  buildReactiveForm() {
    return this.fb.group({
      name: [this.product.name, []],
      description: [this.product.description, []],
      price: [this.product.price, []],
    });
  }

  onFormSubmit() {
    console.log('Submitting form');
  }
}
