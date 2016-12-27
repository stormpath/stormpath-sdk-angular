import { LocalStorageService } from 'ng2-webstorage';
import { CookieService } from 'angular2-cookie/core';
import { Injectable } from '@angular/core';

export interface TokenStoreManager {
  get(key: string): any;
  put(key: string, value: any): any;
  remove(key: string): any;
}

@Injectable()
export class LocalStorageTokenStoreManager implements TokenStoreManager {

  constructor(private localStorage: LocalStorageService) {
  }

  get(key: string): string {
    return this.localStorage.retrieve(key);
  }

  put(key: string, value: any): void {
    this.localStorage.store(key, value);
  }

  remove(key: string): any {
    this.localStorage.clear(key);
  }
}

@Injectable()
export class CookieTokenStoreManager implements TokenStoreManager {

  constructor(private cookieStorage: CookieService) {
  }

  get(key: string): Object {
    return this.cookieStorage.getObject(key);
  }

  put(key: string, value: any): void {
    this.cookieStorage.putObject(key, value);
  }

  remove(key: string): any {
    this.cookieStorage.remove(key);
  }
}
