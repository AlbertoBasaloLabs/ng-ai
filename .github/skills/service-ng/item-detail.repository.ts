import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface ItemDetail {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
}

export interface CartItem {
  itemId: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
}

export interface AddToCartRequest {
  itemId: string;
  quantity: number;
}

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
