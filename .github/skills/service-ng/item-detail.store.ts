import { Injectable, computed, inject, signal } from '@angular/core';
import { ItemDetail, ItemDetailRepository, SaveItemDetailRequest } from './item-detail.repository';

@Injectable({ providedIn: 'root' })
export class ItemDetailStore {
  readonly #repository = inject(ItemDetailRepository);

  readonly #item = signal<ItemDetail | null>(null);
  readonly #loading = signal(false);
  readonly #error = signal<string | null>(null);

  readonly item = this.#item.asReadonly();
  readonly loading = this.#loading.asReadonly();
  readonly error = this.#error.asReadonly();
  readonly isResolved = computed(() => !this.loading() && this.item() !== null);

  loadById(id: string): void {
    this.#loading.set(true);
    this.#error.set(null);

    this.#repository.getById$(id).subscribe({
      next: (itemDetail) => {
        this.#item.set(itemDetail);
        this.#loading.set(false);
      },
      error: (error: unknown) => {
        console.error(error);
        this.#error.set('Failed to load item details.');
        this.#loading.set(false);
      },
    });
  }

  save(request: SaveItemDetailRequest): void {
    this.#loading.set(true);
    this.#error.set(null);

    this.#repository.save$(request).subscribe({
      next: (itemDetail) => {
        this.#item.set(itemDetail);
        this.#loading.set(false);
      },
      error: (error: unknown) => {
        console.error(error);
        this.#error.set('Failed to save item details.');
        this.#loading.set(false);
      },
    });
  }
}
