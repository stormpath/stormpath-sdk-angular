import { LocalStorageService } from 'ng2-webstorage';
import { CookieService } from 'angular2-cookie/core';
import { Injectable } from '@angular/core';
import { AuthToken } from './auth.token';

export abstract class TokenStoreManager {
  abstract get(key: string): AuthToken;

  abstract put(key: string, value: AuthToken): any;

  abstract remove(key: string): void;

  setToken(name: string, token: any): AuthToken {
    // Store a time at which we should renew the token, subtract off one second to give us some buffer of time
    let exp: Date = new Date(new Date().setMilliseconds(0) + ((token.expires_in - 1) * 1000));
    let authToken: AuthToken = new AuthToken(token.access_token, token.refresh_token, token.token_type,
      token.expires_in, token.expires_in, exp);
    this.put(name, authToken);
    return authToken;
  }
}

@Injectable()
export class LocalStorageTokenStoreManager extends TokenStoreManager {

  constructor(private localStorage: LocalStorageService) {
    super();
  }

  get(key: string): AuthToken {
    return this.localStorage.retrieve(key);
  }

  put(key: string, value: AuthToken): void {
    this.localStorage.store(key, value);
  }

  remove(key: string): void {
    this.localStorage.clear(key);
  }
}

@Injectable()
export class CookieTokenStoreManager extends TokenStoreManager {

  constructor(private cookieStorage: CookieService) {
    super();
  }

  get(key: string): AuthToken {
    let token: any = this.cookieStorage.getObject(key);
    if (token) {
      return new AuthToken(token.accessToken, token.refreshToken, token.tokenType, token.expiresIn, token.expiresAt, token.exp);
    } else {
      return null;
    }
  }

  put(key: string, value: AuthToken): void {
    this.cookieStorage.putObject(key, value);
  }

  remove(key: string): void {
    this.cookieStorage.remove(key);
  }
}
