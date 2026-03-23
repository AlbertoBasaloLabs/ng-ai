import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ItemDetailViewModel } from './item-detail.component';
import {
  AddToCartRequest,
  ItemDetailRepository,
} from './item-detail.repository';
import { CartStore } from './cart.store';

@Injectable() // provided in the page component — shares its injection context
export class ItemDetailComponentService {
  readonly #repository = inject(ItemDetailRepository);
  readonly #cartStore = inject(CartStore);

  // Wired to the page's route input signal via connect()
  #id: Signal<string> = signal('');

  readonly #itemResource = rxResource({
    request: () => this.#id(),
    loader: ({ request: id }) => this.#repository.getById$(id),
  });

  readonly #addToCartRequest = signal<AddToCartRequest | null>(null);
  readonly #addToCartResource = rxResource({
    request: () => this.#addToCartRequest(),
    loader: ({ request }) => this.#repository.addToCart$(request!),
  });

  // Presentation state — item
  readonly item: Signal<ItemDetailViewModel | undefined> =
    this.#itemResource.value;
  readonly isLoading = this.#itemResource.isLoading;
  readonly error = computed(() =>
    this.#itemResource.error() ? 'Failed to load item details.' : null,
  );

  // Presentation state — add to cart
  readonly addToCartLoading = this.#addToCartResource.isLoading;
  readonly addToCartError = computed(() =>
    this.#addToCartResource.error() ? 'Failed to add item to cart.' : null,
  );

  // Cart state — read from the shared store
  readonly cartCount = this.#cartStore.count;

  // Called once by the page to wire its route input signal into the resource
  connect(id: Signal<string>): void {
    this.#id = id;
  }

  addToCart(quantity: number): void {
    const item = this.item();
    if (!item) return;

    this.#cartStore.add({
      itemId: item.id,
      name: item.name,
      price: item.price,
      currency: item.currency,
      quantity,
    });
    this.#addToCartRequest.set({ itemId: item.id, quantity });
  }
}
