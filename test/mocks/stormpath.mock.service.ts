import { SpyObject } from './helper';
import Spy = jasmine.Spy;
import { Stormpath } from '../../src/stormpath/stormpath.service';
import { Account } from '../../src/shared/account';
import { Observable } from 'rxjs';
import { BaseStormpathAccount } from '../../src/shared/account';
import 'rxjs/add/operator/map';

export class MockStormpathService extends SpyObject {
  public user$: Observable<Account | boolean>;
  getAccount: Spy;
  getRegistrationViewSpy: Spy;
  fakeResponse: any;

  constructor() {
    super(Stormpath);

    this.fakeResponse = null;
    this.getRegistrationViewSpy = this.spy('getRegistrationViewModel').andReturn(this);
    this.getAccount = this.spy('getAccount').andReturn(this);
  }

  subscribe(callback: any): any {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  setUser(props: BaseStormpathAccount): void {
    let account = new Account(props);
    this.user$ = Observable.of(account);
  }
}
