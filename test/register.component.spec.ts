import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RegisterComponent } from '../src/register/register.component';
import { Stormpath } from '../src/stormpath/stormpath.service';
import { MockStormpathService } from './mocks/stormpath.mock.service';
import { FormsModule } from '@angular/forms';

xdescribe('RegisterComponent', () => {
  let mockStormpathService: MockStormpathService;

  beforeEach(() => {
    /* For some strange reason, when I uncomment the line below, it causes the following error:
      SyntaxError: Use of reserved word 'import'
      at test/entry.ts:79518 */
    //mockStormpathService = new MockStormpathService();

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule],
      providers: [
        {provide: Stormpath, useValue: mockStormpathService}
      ]
    });
  });

  it('should show default registration fields', () => {
    const fixture  = TestBed.createComponent(RegisterComponent);
    let form = `{
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
        }`;
    mockStormpathService.setResponse(form);
    fixture.detectChanges();
    expect(mockStormpathService.registrationViewSpy).toHaveBeenCalled();

    // verify data was set on component when initialized
    let registerComponent: any = fixture.debugElement.componentInstance;
    expect(registerComponent.model.form.fields[0]).toBe({
      label: 'First Name', placeholder: 'First Name',
      required: true, type: 'text', name: 'givenName'
    });

  });

});
