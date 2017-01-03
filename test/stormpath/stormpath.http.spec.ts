import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { Account, StormpathModule, Stormpath, StormpathConfiguration, StormpathHttp } from '../../src';
import { MockBackend } from '@angular/http/testing';
import { Response, ResponseOptions, BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { TokenStoreManager, LocalStorageTokenStoreManager } from '../../src/stormpath/token-store.manager';
import { VERSION } from '@angular/core';

const pkgVersion = JSON.stringify(require("../../package.json").version).replace(/['"]+/g, '');

describe('StormpathHttp', () => {

  describe('same domain', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StormpathModule],
        providers: [
          {
            provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions,
                                        tokenStore: TokenStoreManager, config: StormpathConfiguration) => {
            return new StormpathHttp(backend, defaultOptions, config, tokenStore);
          },
            deps: [MockBackend, BaseRequestOptions, StormpathConfiguration]
          },
          {
            provide: Stormpath,
            useFactory: (http: Http, tokenStore: LocalStorageTokenStoreManager, config: StormpathConfiguration) => {
              return new Stormpath(http, config, tokenStore);
            }, deps: [Http, LocalStorageTokenStoreManager, StormpathConfiguration]
          },
          {provide: MockBackend, useClass: MockBackend},
          {provide: BaseRequestOptions, useClass: BaseRequestOptions}
        ]
      });
    });

    it('should add x-stormpath-agent if me endpoint',
      inject([Stormpath, MockBackend], fakeAsync((stormpath: Stormpath, mockBackend: MockBackend) => {
        expect(stormpath.config.version).toBe(pkgVersion);
        let account: boolean | Account;
        mockBackend.connections.subscribe(c => {
          expect(c.request.headers.get('X-Stormpath-Agent')).toBe('stormpath-sdk-angular/' + pkgVersion
            + ' angular/' + VERSION.full);
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

    it('should add x-stormpath-agent if post request',
      inject([Stormpath, MockBackend], fakeAsync((stormpath: Stormpath, mockBackend: MockBackend) => {
        let account: boolean | Account;
        mockBackend.connections.subscribe(c => {
          expect(c.request.headers.get('X-Stormpath-Agent')).toBe('stormpath-sdk-angular/' + pkgVersion
            + ' angular/' + VERSION.full);
          expect(c.request.url).toBe('/login');
          let response: ResponseOptions = new ResponseOptions({
            body: {
              account: {
                'href': 'href',
                'username': 'bar',
                'email': 'bar@testmail.stormpath.com'
              },
            }
          });
          c.mockRespond(new Response(response));
        });
        stormpath.login({login: 'bar', password: 'foo'}).subscribe((response) => {
          account = response;
        });
        tick();
        expect(account['username']).toBe('bar');
      }))
    );

    it('should not add x-stormpath-agent if not Stormpath endpoint',
      inject([Stormpath, MockBackend, Http], fakeAsync((stormpath: Stormpath, mockBackend: MockBackend, http: Http) => {
        mockBackend.connections.subscribe(c => {
          expect(c.request.headers.get('X-Stormpath-Agent')).toBeFalsy();
          expect(c.request.url).toBe('/random-endpoint');
          let response: ResponseOptions = new ResponseOptions({
            body: {
              foo: 'bar'
            }
          });
          c.mockRespond(new Response(response));
        });
        let data: any;
        http.get('/random-endpoint').subscribe((response) => {
          data = response.json();
        });
        tick();
        expect(data['foo']).toBe('bar');
      }))
    );
  });

  describe('different domain', () => {

    beforeEach(() => {
      let config: StormpathConfiguration = new StormpathConfiguration();
      config.endpointPrefix = "http://api.mycompany.com";

      TestBed.configureTestingModule({
        imports: [StormpathModule],
        providers: [
          {
            provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions,
                                        config: StormpathConfiguration) => {
            return new StormpathHttp(backend, defaultOptions, config);
          }, deps: [MockBackend, BaseRequestOptions, StormpathConfiguration]
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

    it('should add x-stormpath-agent if stormpath endpoint',
      inject([Stormpath, MockBackend], fakeAsync((stormpath: Stormpath, mockBackend: MockBackend) => {
        let account: boolean | Account;
        mockBackend.connections.subscribe(c => {
          expect(c.request.headers.get('X-Stormpath-Agent')).toBeTruthy();
          expect(c.request.url).toBe('http://api.mycompany.com/me');
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

    it('should add x-stormpath-agent if post request',
      inject([Stormpath, MockBackend], fakeAsync((stormpath: Stormpath, mockBackend: MockBackend) => {
        let account: boolean | Account;
        mockBackend.connections.subscribe(c => {
          expect(c.request.headers.get('X-Stormpath-Agent')).toBeTruthy();
          expect(c.request.url).toBe('http://api.mycompany.com/register');
          let response: ResponseOptions = new ResponseOptions({
            body: {
              account: {
                'href': 'href',
                'username': 'bar',
                'email': 'bar@testmail.stormpath.com'
              },
            }
          });
          c.mockRespond(new Response(response));
        });
        stormpath.register({
          email: 'bar@testmail.stormpath.com',
          password: 'foo',
          surname: 'Bar',
          givenName: 'Foo'
        }).subscribe((response) => {
          account = response;
        });
        tick();
        expect(account['username']).toBe('bar');
      }))
    );

    it('should not add x-stormpath-agent if not Stormpath endpoint',
      inject([Stormpath, MockBackend, Http], fakeAsync((stormpath: Stormpath, mockBackend: MockBackend, http: Http) => {
        mockBackend.connections.subscribe(c => {
          expect(c.request.headers.get('X-Stormpath-Agent')).toBeFalsy();
          expect(c.request.url).toBe('/random-endpoint');
          let response: ResponseOptions = new ResponseOptions({
            body: {
              foo: 'bar'
            }
          });
          c.mockRespond(new Response(response));
        });
        let data: any;
        http.get('/random-endpoint').subscribe((response) => {
          data = response.json();
        });
        tick();
        expect(data['foo']).toBe('bar');
      }))
    );
  });
});
