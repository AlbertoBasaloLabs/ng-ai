import {
  ChangeDetectionStrategy,
  Component,
  computed,
  InjectionToken,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { ItemDetailService } from './item-detail.service';
import { CartStoreService } from '../../shared/cart-store.service';

@Component({
  selector: 'app-item-detail-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './item-detail.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ItemDetailPage {
  readonly id = input.required<string>();
  readonly #itemDetailService = inject(ItemDetailService);
  readonly #cartStoreService = inject(CartStoreService);

  readonly loadingLabel = computed(() => 'Loading item...' + this.id());
  readonly notFoundLabel = computed(() => `Item  ${this.id()} not found.`);
  readonly backToHomeLabel = 'Back to home';

  readonly item = computed(() => this.#itemDetailService.getById(this.id()));
  readonly isLoading = computed(() => this.#itemDetailService.loading());

  onAddToCartRequested(itemId: string) {
    this.#cartStoreService.addItem(itemId);
  }
}
