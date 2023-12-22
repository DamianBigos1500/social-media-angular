import { Injectable, computed, signal } from '@angular/core';

const initialState: any = {
  user: null,
};

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly _store = signal(initialState);
  readonly user = computed(() => this._store().user);

  setUserCard(userData: any | null) {
    this._store.update((s) => ({ ...s, user: userData }));
  }
}
