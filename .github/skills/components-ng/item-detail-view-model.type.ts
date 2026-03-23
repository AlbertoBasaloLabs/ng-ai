import { ItemFeature } from './item-feature.type';

export type ItemDetailViewModel = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  updatedAtIso: string;
  features: ReadonlyArray<ItemFeature>;
};
