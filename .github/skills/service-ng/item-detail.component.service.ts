import { Injectable, computed, inject, signal } from '@angular/core';
import { SaveItemDetailRequest } from './item-detail.repository';
import { ItemDetailStore } from './item-detail.store';

@Injectable({ providedIn: 'root' })
export class ItemDetailComponentService {
  readonly #store = inject(ItemDetailStore);
  readonly #currentItemId = signal<string | null>(null);

  readonly item = this.#store.item;
  readonly loading = this.#store.loading;
  readonly error = this.#store.error;
  readonly header = computed(() => {
    const item = this.item();
    return item ? `Item detail: ${item.name}` : 'Item detail';
  });

  initialize(itemId: string): void {
    this.#currentItemId.set(itemId);
    this.#store.loadById(itemId);
  }

  save(request: SaveItemDetailRequest): void {
    this.#store.save(request);
  }

  reload(): void {
    const itemId = this.#currentItemId();
    if (!itemId) {
      return;
    }

    this.#store.loadById(itemId);
  }
}
