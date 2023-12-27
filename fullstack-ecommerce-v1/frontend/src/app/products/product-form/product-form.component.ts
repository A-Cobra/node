import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { EditCreateProductPayload } from 'src/app/models/edit-create-product-payload.interface';
import { ProductEventType } from 'src/app/models/product-event-type.type';
import { ProductEvent } from 'src/app/models/product-event.interface';
import { Product } from 'src/app/models/product.interface';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements AfterViewInit {
  @Input()
  formType: ProductEventType = 'create';

  @Input()
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
  };

  @Output()
  formSubmission = new EventEmitter<ProductEvent<EditCreateProductPayload>>();

  form = this.buildReactiveForm();

  constructor(
    private fb: NonNullableFormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.form = this.buildReactiveForm();
    this.cdr.detectChanges();
  }

  buildReactiveForm() {
    return this.fb.group({
      name: [this.product.name, []],
      description: [this.product.description, []],
      price: [this.product.price, []],
    });
  }

  onFormSubmission() {
    this.formSubmission.emit({
      type: this.formType,
      payload: {
        id: this.product.id,
        optional: this.form.value as EditCreateProductPayload,
      },
    });
  }
}
