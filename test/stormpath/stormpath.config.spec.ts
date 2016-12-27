import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { Account, StormpathModule, Stormpath, StormpathConfiguration } from '../../src';
import { MockBackend } from '@angular/http/testing';
import { Response, ResponseOptions, BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { LocalStorageTokenStoreManager } from '../../src/stormpath/token-store.manager';

describe('StormpathConfiguration', () => {

  beforeEach(() => {
    let config: StormpathConfiguration = new StormpathConfiguration();
    config.endpointPrefix = "http://api.mycompany.com";
    config.meUri = "/account";
    config.changeUri = "/account/change-password";
    config.forgotUri = "/account/forgot-password";
    config.loginUri = "/signin";
    config.logoutUri = "/signout";
    config.registerUri = "/account/signup";
    config.verifyUri = "/account/verify-password";

    TestBed.configureTestingModule({
      imports: [StormpathModule],
      providers: [
        {
          provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: Stormpath,
          useFactory: (http: Http, tokenStore: LocalStorageTokenStoreManager, config: StormpathConfiguration) => {
            return new Stormpath(http, config, tokenStore);
          }, deps: [Http, LocalStorageTokenStoreManager, StormpathConfiguration]
        },
        {provide: MockBackend, useClass: MockBackend},
        {provide: BaseRequestOptions, useClass: BaseRequestOptions},
        {provide: StormpathConfiguration, useValue: config}
      ]
    });
  });

  it('should allow overriding the endpoint prefix for /register',
    inject([Stormpath, MockBackend], fakeAsync((stormpath: Stormpath, mockBackend: MockBackend) => {
      let res: Response;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('http://api.mycompany.com/account/signup');
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

  it('should allow overriding the /me endpoint',
    inject([Stormpath, MockBackend], fakeAsync((stormpath: Stormpath, mockBackend: MockBackend) => {
      let account: boolean | Account;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('http://api.mycompany.com/account');
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

  it('should allow overriding all endpoints',
    inject([StormpathConfiguration], fakeAsync((config: StormpathConfiguration) => {
      expect(config.endpointPrefix).toBe('http://api.mycompany.com');
      expect(config.changeUri).toBe('http://api.mycompany.com/account/change-password');
      expect(config.forgotUri).toBe('http://api.mycompany.com/account/forgot-password');
      expect(config.loginUri).toBe('http://api.mycompany.com/signin');
      expect(config.logoutUri).toBe('http://api.mycompany.com/signout');
      expect(config.verifyUri).toBe('http://api.mycompany.com/account/verify-password');
    }))
  );
});
