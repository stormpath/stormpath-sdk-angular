import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LocalStorageService } from 'ng2-webstorage';
import { StormpathConfiguration } from './stormpath.config';
import { LoginFormModel } from './stormpath.service';

@Injectable()
export class OAuthService {
  private headers: Headers;

  constructor(private http: Http,
              private localStorage: LocalStorageService,
              private config: StormpathConfiguration) {
    this.headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    });
  }

  getToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  login(credentials: LoginFormModel): Observable<any> {
    let data = 'username=' + encodeURIComponent(credentials.login) + '&password=' +
      encodeURIComponent(credentials.password) + '&grant_type=password';

    return this.http.post(this.config.oauthLoginUri, data, {
      headers: this.headers
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
    let token = this.getToken();
    let tokenValue = token.refresh_token || token.access_token;
    let tokenHint = token.refresh_token ? 'refresh_token' : 'access_token';
    let data = 'token=' + encodeURIComponent(tokenValue) + '&token_type_hint=' +
      encodeURIComponent(tokenHint);

    return this.http.post(this.config.oauthLogoutUri, data, {headers: this.headers}).map((response: Response) => {
      this.localStorage.clear('authenticationToken');
      return response;
    });
  }
}
