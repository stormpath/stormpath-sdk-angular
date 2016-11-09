import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';

import { ReplaySubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/throw';

import { Account, BaseStormpathAccount } from '../shared/account';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { StormpathConfiguration } from './stormpath.config';

let APPLICATION_JSON: string = 'application/json';

class JsonGetOptions extends RequestOptions {
  constructor() {
    super({
      headers: new Headers({ 'Accept': APPLICATION_JSON })
    });
  }
}

class JsonPostOptions extends JsonGetOptions {
  constructor() {
    super();
    this.headers.append('Content-Type', APPLICATION_JSON);
  }
}

export function defaultSpTokenResolver(location: Location): string {
  let m: RegExpMatchArray = location.path().match(/sptoken=([^&]+)/);
  return m && m.length === 2 ? m[1] : '';
}

export interface RegistrationFormModel {
  email?: string;
  surname?: string;
  givenName?: string;
  password?: string;
  [propName: string]: any;
}

export interface ForgotPasswordFormModel {
  email: string;
  accountStore?: Object;
  organizationNameKey?: string;
}

export interface ResendEmailVerificationRequest {
  login: string;
  accountStore?: Object;
  organizationNameKey?: string;
}

export interface PasswordResetRequest {
  accountStore?: Object;
  organizationNameKey?: string;
  password: string;
  sptoken: string;
}

export interface LoginFormModel {
  login: string;
  password: string;
  accountStore?: Object;
  organizationNameKey?: string;
}

export interface StormpathErrorResponse {
  status: number;
  message: string;
}

export class LoginService {
  public forgot: boolean;
  public login: boolean;
  public register: boolean;
  constructor() {
    this.forgot = false;
    this.login = true;
    this.register = false;
  }
  forgotPassword(): void {
    this.forgot = true;
    this.login = false;
  }
}

@Injectable()
export class Stormpath {
  public user$: Observable<Account | boolean>;
  public userSource: ReplaySubject<Account | boolean>;

  constructor(public http: Http, public config: StormpathConfiguration) {
    this.userSource = new ReplaySubject<Account>(1);
    this.user$ = this.userSource.asObservable();
    this.getAccount()
      .subscribe(user => this.userSource.next(user));
  }

  /**
   * Attempts to get the current user by making a request of the /me endpoint.
   *
   * @return {Observable<Account | boolean>}
   * An observable that will return an Account if the user is logged in, or false
   * if the user is not logged in.
   */
  getAccount(): Observable<Account | boolean> {
    return this.http.get(this.config.meUri, new JsonGetOptions())
      .map(this.jsonParser)
      .map(this.accountTransformer)
      .catch((error: any) => {
        if (error.status && error.status === 401) {
          return Observable.of(false);
        }
        if (error.status && error.status === 404) {
          return Observable.throw(new Error('/me endpoint not found, please check server configuration.'));
        }
        return Observable.throw(error);
      });
  }

  getRegistrationViewModel(): any {
    return this.http.get(this.config.registerUri, new JsonGetOptions())
      .map(this.jsonParser)
      .catch(this.errorTranslator);
  }

  /**
   * Attempts to register a new account by making a POST request to the
   * /register endpoint.
   *
   * @return {Observable<Account>}
   * An observable that will return an Account if the POST was successful.
   */
  register(form: Object): Observable<Account> {
    let observable: Observable<Account> = this.http.post(this.config.registerUri, JSON.stringify(form), new JsonPostOptions())
      .map(this.jsonParser)
      .map(this.accountTransformer)
      .catch(this.errorTranslator)
      .share();
    return observable;
  }

  login(form: LoginFormModel): Observable<Account> {
    let observable: Observable<Account> = this.http.post(this.config.loginUri, JSON.stringify(form), new JsonPostOptions())
      .map(this.jsonParser)
      .map(this.accountTransformer)
      .catch(this.errorTranslator)
      .share();

    observable.subscribe(user => this.userSource.next(user), () => undefined);
    return observable;
  }

  logout(): void {
    this.http.post(this.config.logoutUri, null, new JsonGetOptions())
      .catch(this.errorThrower)
      .subscribe(() => this.userSource.next(false));
  }

  resendVerificationEmail(request: ResendEmailVerificationRequest): any {
    return this.http.post(this.config.verifyUri, JSON.stringify(request), new JsonPostOptions())
      .map(this.jsonParser)
      .catch(this.errorTranslator);
  }

  sendPasswordResetEmail(form: ForgotPasswordFormModel): any {
    return this.http.post(this.config.forgotUri, JSON.stringify(form), new JsonPostOptions())
      .map(this.jsonParser)
      .catch(this.errorTranslator);
  }

  resetPassword(form: PasswordResetRequest): any {
    return this.http.post(this.config.changeUri, JSON.stringify(form), new JsonPostOptions())
      .map(this.jsonParser)
      .catch(this.errorTranslator);
  }

  verifyEmailVerificationToken(sptoken: string): any {
    return this.http.get(this.config.verifyUri + '?sptoken=' + sptoken, new JsonGetOptions())
      .map(this.jsonParser)
      .catch(this.errorTranslator);
  }

  verifyPasswordResetToken(sptoken: string): any {
    return this.http.get(this.config.changeUri + '?sptoken=' + sptoken, new JsonGetOptions())
      .map(this.jsonParser)
      .catch(this.errorTranslator);
  }

  /**
   * Returns the JSON error from an HTTP response, or a generic error if the
   * response is not a JSON error
   * @param {any} error
   */
  private errorTranslator(error: any): ErrorObservable {
    let errorObject: StormpathErrorResponse;
    try {
      errorObject = error.json();
    } catch (e) {
      console.error(error);
    }
    if (!errorObject || !errorObject.message) {
      errorObject = { message: 'Server Error', status: 0 };
    }
    return Observable.throw(errorObject);
  }

  private errorThrower(error: any): ErrorObservable {
    return Observable.throw(error);
  }

  private accountTransformer(json: any): Account {
    if (json && json.account) {
      return new Account(json.account as BaseStormpathAccount);
    } else {
      Observable.throw(new Error('expected an account response'));
    }
  }

  private jsonParser(res: Response): any {
    if (res.text() === '') {
      return null;
    }
    try {
      return res.json();
    } catch (e) {
      throw new Error('Response was not JSON, check your server configuration');
    }
  }
}
