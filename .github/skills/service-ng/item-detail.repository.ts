import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AddToCartRequest } from './add-to-cart-request.type';
import { CartItem } from './cart-item.type';
import { ItemDetail } from './item-detail.type';

@Injectable({ providedIn: 'root' })
export class ItemDetailRepository {
  readonly #httpClient = inject(HttpClient);

  getById$(id: string): Observable<ItemDetail> {
    return this.#httpClient.get<ItemDetail>(`/api/items/${id}`);
  }

  addToCart$(request: AddToCartRequest): Observable<CartItem> {
    return this.#httpClient.post<CartItem>(`/api/cart`, request);
  }
}
