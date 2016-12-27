import { Injectable, Inject } from '@angular/core';
import {
  Http,
  ConnectionBackend,
  Response,
  RequestOptionsArgs,
  Request,
  RequestOptions,
  XHRBackend
} from '@angular/http';
import { Observable } from 'rxjs';
import { JsonGetOptions } from './stormpath.service';
import { TokenStoreManager } from './token-store.manager';
import { StormpathConfiguration } from './stormpath.config';

// function that allows overriding the default Http provider
export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions,
                            config: StormpathConfiguration,
                            tokenStore: TokenStoreManager): Http {
  return new StormpathHttp(backend, defaultOptions, config, tokenStore);
}

@Injectable()
export class StormpathHttp extends Http {
  private currentDomain: CurrentDomain;

  constructor(private backend: ConnectionBackend,
              private defaultOptions: RequestOptions,
              private config: StormpathConfiguration,
              @Inject('tokenStore') private tokenStore: TokenStoreManager,) {
    super(backend, defaultOptions);
    this.currentDomain = new CurrentDomain();
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.domainCheck(url, options);
    return super.get(url, options);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.domainCheck(url, options);
    return super.post(url, body, options);
  }

  private domainCheck(url: string, options: RequestOptionsArgs): void {
    if (this.currentDomain.equals(url)) {
      // todo: replace 0.0.x with actual version: https://github.com/stormpath/stormpath-sdk-angular/issues/12
      options.headers.set('X-Stormpath-Agent', 'stormpath-sdk-angular/0.0.x angular/2.x');
    } else {
      let token = this.tokenStore.get(this.config.oauthTokenName);
      if (token && token.expires_at && token.expires_at > new Date().getTime()) {
        if (options == null) {
          options = new JsonGetOptions();
        }
        options.headers.set('Authorization', 'Bearer ' + token.access_token);
      }
    }
  }
}

@Injectable()
export class CurrentDomain {
  private window: any = window;

  equals(url: string|Request): boolean {
    let link: any = this.window.document.createElement('a');
    link.href = url;

    return this.window.location.host === link.host;
  }
}
