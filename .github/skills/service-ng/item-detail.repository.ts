import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface ItemDetail {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  updatedAtIso: string;
}

export interface SaveItemDetailRequest {
  id: string;
  name: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ItemDetailRepository {
  readonly #httpClient = inject(HttpClient);

  getById$(id: string): Observable<ItemDetail> {
    return this.#httpClient.get<ItemDetail>(`/api/items/${id}`);
  }

  save$(request: SaveItemDetailRequest): Observable<ItemDetail> {
    return this.#httpClient.put<ItemDetail>(`/api/items/${request.id}`, request);
  }
}
