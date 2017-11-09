import { Injectable, Inject, VERSION } from '@angular/core';
import {
  Http,
  ConnectionBackend,
  Response,
  RequestOptionsArgs,
  Request,
  RequestOptions,
  XHRBackend,
  Headers
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JsonGetOptions } from './stormpath.service';
import { TokenStoreManager } from './token-store.manager';
import { StormpathConfiguration, StormpathConstants } from './stormpath.config';
import { AuthToken } from './auth.token';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// function that allows overriding the default Http provider
export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions,
                            config: StormpathConfiguration, tokenStore: TokenStoreManager): Http {
  return new StormpathHttp(backend, defaultOptions, config, tokenStore);
}

@Injectable()
export class StormpathHttp extends Http {
  private currentDomain: CurrentDomain;

  constructor(private backend: ConnectionBackend,
              private defaultOptions: RequestOptions,
              private config: StormpathConfiguration,
              @Inject('tokenStore') private tokenStore: TokenStoreManager) {
    super(backend, defaultOptions);
    this.currentDomain = new CurrentDomain();
  }

  /**
   * Override all requests to add x-stormpath-agent and authorization headers when appropriate
   * @param url the url or a Request
   * @param options request options
   * @returns {Observable<Response>} the response as an observable
   */
  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    this.addHeaders(url, options);
    return super.request(url, options)
      .catch(initialError => {
        if (initialError && initialError.status === 401) {
          let token: AuthToken = this.tokenStore.get(this.config.oauthTokenName);
          // token might be expired, try to refresh
          if ((!AuthToken.isValid(token)) && token && token.refreshToken) {
            let data: string = 'grant_type=refresh_token&refresh_token=' + token.refreshToken;
            return super.post(this.config.oauthLoginUri, data, {
              headers: StormpathConstants.OAUTH_HEADERS
            }).map(response => response.json())
              .mergeMap(token => {
                this.tokenStore.setToken(this.config.oauthTokenName, token);
                // attempt the same request again
                return this.request(url, options);
              });
          } else {
            return Observable.throw(initialError);
          }
        } else {
          return Observable.throw(initialError);
        }
      });
  }

  /**
   * Add Stormpath headers and be aware of options versus request.headers
   * @param url
   * @param options
   */
  private addHeaders(url: string|Request, options: RequestOptionsArgs): void {
    let requestUri: string = (url instanceof Request) ? url.url : url;
    let addToken: boolean = this.config.autoAuthorizedUris.some(rx => rx.test(requestUri));

    if (options == null && addToken) {
      // add headers 'accept: application/json' and 'withCredential: true'
      options = new JsonGetOptions();
    } else {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }

    let version: string = (VERSION) ? VERSION.full : '2.x';
    if (this.config.endpointUris.indexOf(requestUri) > -1) {
      options.headers.set('X-Stormpath-Agent', 'stormpath-sdk-angular/' + this.config.version + ' angular/' + version);
      if (url instanceof Request) {
        url.headers.set('X-Stormpath-Agent', 'stormpath-sdk-angular/' + this.config.version + ' angular/' + version);
      }
    }

    if (!this.currentDomain.equals(requestUri) && addToken) {
      let token: AuthToken = this.tokenStore.get(this.config.oauthTokenName);
      if (AuthToken.isValid(token)) {
        options.headers.set('Authorization', 'Bearer ' + token.accessToken);
        if (url instanceof Request) {
          url.headers.set('Authorization', 'Bearer ' + token.accessToken);
        }
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
