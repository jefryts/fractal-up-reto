import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  set(key: string, value: Object | Array<any>) {
    if (value === undefined || value === null) return;

    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    const itemStr = localStorage.getItem(key)!;

    return itemStr !== undefined && itemStr !== null ? JSON.parse(itemStr) : null;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
