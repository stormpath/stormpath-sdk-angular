import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, Response, RequestOptionsArgs, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class StormpathHttp extends Http {
  private currentDomain: CurrentDomain;

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
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
      options.headers.set('X-Stormpath-Agent', 'angular-stormpath/0.0.x angular/2.0.x');
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
