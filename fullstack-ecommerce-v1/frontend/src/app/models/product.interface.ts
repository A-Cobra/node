import { EditProductPayload } from './edit-product-payload.interface';

export interface Product extends EditProductPayload {
  id: number;
}
