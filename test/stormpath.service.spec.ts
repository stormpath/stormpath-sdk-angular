import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { StormpathModule } from '../src/stormpath.module';
import { Stormpath } from '../src/stormpath/stormpath.service';
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
        }, deps: [MockBackend, BaseRequestOptions]
        },
        {provide: Stormpath, useClass: Stormpath},
        {provide: MockBackend, useClass: MockBackend},
        {provide: BaseRequestOptions, useClass: BaseRequestOptions}
      ]
    });
  });

  it('should show default registration fields', () => {
    inject([Stormpath, MockBackend], fakeAsync((stormpath: Stormpath, mockBackend: MockBackend) => {
      let res: Response;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('register');
        let response: ResponseOptions = new ResponseOptions({
          body: `{
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
        }`
        });
        c.mockRespond(new Response(response));
      });
      stormpath.getRegistrationViewModel().subscribe((response) => {
        res = response;
      });
      tick();
      expect(res[0].form.fields[0].label).toBe('First Name');
    }));
  });
});
