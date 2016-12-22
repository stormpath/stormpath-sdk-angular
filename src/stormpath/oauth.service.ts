import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LocalStorageService } from 'ng2-webstorage';
import { StormpathConfiguration } from './stormpath.config';

@Injectable()
export class OAuthService {

  constructor(private http: Http,
              private localStorage: LocalStorageService,
              private config: StormpathConfiguration) {
  }

  getToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  login(credentials): Observable<any> {
    let data = 'username=' + encodeURIComponent(credentials.username) + '&password=' +
      encodeURIComponent(credentials.password) + '&grant_type=password';
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    });

    return this.http.post(this.config.oauthLoginUri, data, {
      headers: headers
    }).map(authSuccess.bind(this));

    function authSuccess(resp) {
      let response = resp.json();
      let expiredAt = new Date();
      expiredAt.setSeconds(expiredAt.getSeconds() + response.expires_in);
      response.expires_at = expiredAt.getTime();
      this.localStorage.store('authenticationToken', response);
      return response;
    }
  }

  logout(): Observable<any> {
    return this.http.post(this.config.oauthLogoutUri, {}).map((response: Response) => {
      this.localStorage.clear('authenticationToken');
      return response;
    });
  }
}
