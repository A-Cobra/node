import { EditCreateProductPayload } from './edit-create-product-payload.interface';

export interface Product extends EditCreateProductPayload {
  id: number;
}
