import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { Account, Stormpath, StormpathModule } from '../../src';
import { MockBackend } from '@angular/http/testing';
import { Response, ResponseOptions, BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';

describe('StormpathService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StormpathModule],
      providers: [
        {
          provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        {provide: Stormpath, useClass: Stormpath},
        {provide: MockBackend, useClass: MockBackend},
        {provide: BaseRequestOptions, useClass: BaseRequestOptions}
      ]
    });
  });

  it('should show default registration fields',
    inject([Stormpath, MockBackend], fakeAsync((stormpath: Stormpath, mockBackend: MockBackend) => {
      let res: Response;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('/register');
        let response: ResponseOptions = new ResponseOptions({
          body: {
            'form': {
              'fields': [{
                'label': 'First Name',
                'placeholder': 'First Name',
                'required': true,
                'type': 'text',
                'name': 'givenName'
              }]
            },
            'accountStores': []
          }
        });
        c.mockRespond(new Response(response));
      });
      stormpath.getRegistrationViewModel().subscribe((response) => {
        res = response;
      });
      tick();
      expect(res['form'].fields[0].label).toBe('First Name');
    }))
  );

  it('should get account information',
    inject([Stormpath, MockBackend], fakeAsync((stormpath: Stormpath, mockBackend: MockBackend) => {
      let account: boolean | Account;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('/me');
        let response: ResponseOptions = new ResponseOptions({
          body: {
            account: {
              'href': 'href',
              'username': 'foo',
              'email': 'foo@testmail.stormpath.com'
            },
          }
        });
        c.mockRespond(new Response(response));
      });
      stormpath.getAccount().subscribe((response) => {
        account = response;
      });
      tick();
      expect(account['username']).toBe('foo');
    }))
  );

  it('should return false if /me returns error',
    inject([Stormpath, MockBackend], fakeAsync((stormpath: Stormpath, mockBackend: MockBackend) => {
      let account: boolean | Account;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('/me');
        c.mockError(new Error('access denied'));
      });
      stormpath.getAccount().subscribe(response => {
        account = response;
      }, error => {
        account = false;
      });
      tick();
      expect(account).toBe(false);
    }))
  );
});
