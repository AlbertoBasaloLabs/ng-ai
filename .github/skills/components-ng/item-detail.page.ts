import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItemDetailComponent } from './item-detail.component';
import { ItemDetailComponentService } from './item-detail.component.service';

@Component({
  selector: 'app-item-detail-page',
  standalone: true,
  imports: [RouterLink, ItemDetailComponent],
  providers: [ItemDetailComponentService],
  templateUrl: './item-detail.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ItemDetailPage implements OnInit {
  readonly id = input.required<string>();
  readonly #service = inject(ItemDetailComponentService);

  readonly item = this.#service.item;
  readonly isLoading = this.#service.isLoading;
  readonly error = this.#service.error;
  readonly cartCount = this.#service.cartCount;

  readonly loadingLabel = 'Loading item...';
  readonly notFoundLabel = 'Item not found.';
  readonly backToHomeLabel = 'Back to home';

  ngOnInit(): void {
    this.#service.connect(this.id);
  }

  onAddToCartRequested(itemId: string): void {
    this.#service.addToCart(1);
  }
}
