import { ProductEventType } from './product-event-type.type';

export interface ProductEvent<T> {
  type: ProductEventType;
  payload: {
    id: number;
    optional: T;
  };
}
