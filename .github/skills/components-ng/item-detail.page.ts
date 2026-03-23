import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ItemDetailComponent } from './item-detail.component';
import type { AddToCartRequest } from './add-to-cart-request.type.ts';
import { CartStore } from '../service-ng/cart.store';
import { ItemDetailRepository } from '../service-ng/item-detail.repository';

@Component({
  selector: 'app-item-detail-page',
  standalone: true,
  imports: [RouterLink, ItemDetailComponent],
  templateUrl: './item-detail.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ItemDetailPage {
  readonly #repository = inject(ItemDetailRepository);
  readonly #cartStore = inject(CartStore);

  readonly id = input.required<string>();

  readonly #itemResource = rxResource({
    request: () => this.id(),
    loader: ({ request: id }) => this.#repository.getById$(id),
  });

  readonly #addToCartRequest = signal<AddToCartRequest | null>(null);
  readonly #addToCartResource = rxResource({
    request: () => this.#addToCartRequest(),
    loader: ({ request }) => this.#repository.addToCart$(request!),
  });

  // Presentation state — item
  readonly item = this.#itemResource.value;
  readonly isLoading = this.#itemResource.isLoading;
  readonly error = computed(() =>
    this.#itemResource.error() ? 'Failed to load item details.' : null,
  );

  // Presentation state — add to cart
  readonly addToCartLoading = this.#addToCartResource.isLoading;
  readonly addToCartError = computed(() =>
    this.#addToCartResource.error() ? 'Failed to add item to cart.' : null,
  );

  // Cart state — shared across the app
  readonly cartCount = this.#cartStore.count;

  readonly loadingLabel = 'Loading item...';
  readonly notFoundLabel = 'Item not found.';
  readonly backToHomeLabel = 'Back to home';

  onAddToCartRequested(itemId: string): void {
    const item = this.item();
    if (!item) return;

    this.#cartStore.add({
      itemId: item.id,
      name: item.name,
      price: item.price,
      currency: item.currency,
      quantity: 1,
    });
    this.#addToCartRequest.set({ itemId: item.id, quantity: 1 });
  }
}
