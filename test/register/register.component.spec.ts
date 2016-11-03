import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RegisterComponent } from '../../src/register/register.component';
import { Stormpath } from '../../src/stormpath/stormpath.service';
import { MockStormpathService } from '../mocks/stormpath.mock.service';
import { FormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let mockStormpathService: MockStormpathService;

  beforeEach(() => {
    mockStormpathService = new MockStormpathService();

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule],
      providers: [
        {provide: Stormpath, useValue: mockStormpathService}
      ]
    });
  });

  it('should show default registration fields', () => {
    const fixture: ComponentFixture<RegisterComponent> = TestBed.createComponent(RegisterComponent);
    let form = {
      form: {
        fields: [{
          label: 'First Name',
          placeholder: 'First Name',
          required: true,
          type: 'text',
          name: 'givenName'
        }]
      }
    };
    mockStormpathService.setResponse(form);
    fixture.detectChanges();
    expect(mockStormpathService.getRegistrationViewSpy).toHaveBeenCalled();

    // verify data was set on component when initialized
    let registerComponent: any = fixture.debugElement.componentInstance;
    expect(registerComponent.model.form.fields[0].label).toBe('First Name');
  });
});
