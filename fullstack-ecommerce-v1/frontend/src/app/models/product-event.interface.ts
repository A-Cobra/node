export interface ProductEvent {
  type: ProductEventType;
  payload: {
    id: number;
  };
}

export type ProductEventType = 'edit' | 'delete';
