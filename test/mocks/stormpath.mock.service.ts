import { SpyObject } from './helper';
import Spy = jasmine.Spy;
import { Stormpath } from '../../src/stormpath/stormpath.service';

export class MockStormpathService extends SpyObject {
  registrationViewSpy: Spy;
  fakeResponse: any;

  constructor() {
    super(Stormpath);

    this.fakeResponse = null;
    this.registrationViewSpy = this.spy('getRegistrationViewModel').andReturn(this);
  }

  subscribe(callback: any): any {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }
}
