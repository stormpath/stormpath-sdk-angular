import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { Account, StormpathModule, Stormpath, StormpathConfiguration, StormpathHttp } from '../../src';
import { MockBackend } from '@angular/http/testing';
import { Response, ResponseOptions, BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';

describe('StormpathHttp', () => {

  describe('same domain', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StormpathModule],
        providers: [
          {
            provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new StormpathHttp(backend, defaultOptions);
          },
            deps: [MockBackend, BaseRequestOptions]
          },
          {provide: Stormpath, useClass: Stormpath},
          {provide: MockBackend, useClass: MockBackend},
          {provide: BaseRequestOptions, useClass: BaseRequestOptions}
        ]
      });
    });

    it('should add x-stormpath-agent if same domain',
      inject([Stormpath, MockBackend], fakeAsync((stormpath: Stormpath, mockBackend: MockBackend) => {
        let account: boolean | Account;
        mockBackend.connections.subscribe(c => {
          expect(c.request.headers.get('X-Stormpath-Agent')).toBe('stormpath-sdk-angular/0.0.x angular/2.x');
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
          expect(c.request.headers.get('X-Stormpath-Agent')).toBe('stormpath-sdk-angular/0.0.x angular/2.x');
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
  });

  describe('different domain', () => {

    beforeEach(() => {
      let config: StormpathConfiguration = new StormpathConfiguration();
      config.endpointPrefix = "http://api.mycompany.com";

      TestBed.configureTestingModule({
        imports: [StormpathModule],
        providers: [
          {
            provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
          },
          {provide: Stormpath, useClass: Stormpath},
          {provide: MockBackend, useClass: MockBackend},
          {provide: BaseRequestOptions, useClass: BaseRequestOptions},
          {provide: StormpathConfiguration, useValue: config}
        ]
      });
    });

    it('should not add x-stormpath-agent if different domain',
      inject([Stormpath, MockBackend], fakeAsync((stormpath: Stormpath, mockBackend: MockBackend) => {
        let account: boolean | Account;
        mockBackend.connections.subscribe(c => {
          expect(c.request.headers.get('X-Stormpath-Agent')).toBeFalsy();
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

    it('should not add x-stormpath-agent if post request',
      inject([Stormpath, MockBackend], fakeAsync((stormpath: Stormpath, mockBackend: MockBackend) => {
        let account: boolean | Account;
        mockBackend.connections.subscribe(c => {
          expect(c.request.headers.get('X-Stormpath-Agent')).toBeFalsy();
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
  });
});
