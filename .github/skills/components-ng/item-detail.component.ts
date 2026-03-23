import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import type { ItemDetailViewModel } from './item-detail-view-model.type.ts';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  templateUrl: './item-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailComponent {
  readonly item = input.required<ItemDetailViewModel>();
  readonly addToCartRequested = output<string>();

  readonly labels = {
    detailsHeading: 'Item details',
    itemId: 'Item ID',
    description: 'Description',
    price: 'Price',
    updated: 'Last updated',
    features: 'Features',
    noFeatures: 'No features available.',
    noDescription: 'No description available.',
    addToCart : 'Add to cart',
  } as const;

  readonly titleId = computed(() => `item-title-${this.item().id}`);
  readonly description = computed(() => this.item().description || this.labels.noDescription);
  readonly hasFeatures = computed(() => this.item().features.length > 0);
  readonly formattedPrice = computed(() => {
    const value = this.item().price.toFixed(2);
    return `${value} ${this.item().currency}`;
  });
  readonly formattedUpdatedAt = computed(() => {
    const updatedAt = new Date(this.item().updatedAtIso);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(updatedAt);
  });

  onAddToCartRequested() {
    this.addToCartRequested.emit(this.item().id);
  }

}
