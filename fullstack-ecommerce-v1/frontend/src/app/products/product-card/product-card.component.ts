import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductEventType } from 'src/app/models/product-event-type.type';
import { ProductEvent } from 'src/app/models/product-event.interface';
import { Product } from 'src/app/models/product.interface';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input()
  product!: Product;
  @Output()
  event = new EventEmitter<ProductEvent<null>>();
  constructor() {}

  emitEvent(eventType: ProductEventType): void {
    this.event.emit({
      type: eventType,
      payload: {
        id: this.product.id,
        optional: null,
      },
    });
  }
}
