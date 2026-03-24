import { Injectable, Signal, computed, signal } from '@angular/core';
import { CartItem } from './cart-item.type';

@Injectable({ providedIn: 'root' })
export class CartStore {
  readonly #items = signal<CartItem[]>([]);

  readonly items: Signal<CartItem[]> = this.#items.asReadonly();
  readonly count = computed(() =>
    this.#items().reduce((sum, i) => sum + i.quantity, 0),
  );
  readonly total = computed(() =>
    this.#items().reduce((sum, i) => sum + i.price * i.quantity, 0),
  );

  add(item: CartItem): void {
    this.#items.update((current) => {
      const index = current.findIndex((i) => i.itemId === item.itemId);
      const exists = index !== -1;
      if (exists) {
        const updated = [...current];
        updated[index].quantity += item.quantity;
        return updated;
      }

      return [...current, item];
    });
  }

  remove(itemId: string): void {
    this.#items.update((current) => current.filter((i) => i.itemId !== itemId));
  }

  clear(): void {
    this.#items.set([]);
  }
}
