import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Stormpath } from '../../src/stormpath/stormpath.service';
import { MockStormpathService } from '../mocks/stormpath.mock.service';
import { FormsModule } from '@angular/forms';
import { AuthPortComponent } from '../../src/authport/authport.component';
import { LoginComponent } from '../../src/login/login.component';
import { ForgotPasswordComponent } from '../../src/forgot-password/forgot-password.component';
import { RegisterComponent } from '../../src/register/register.component';
import { Observable } from 'rxjs';

describe('AuthPortComponent', () => {
  let mockStormpathService: MockStormpathService;

  beforeEach(() => {
    mockStormpathService = new MockStormpathService();
    mockStormpathService.setUser({
      href: 'href',
      username: 'username',
      email: 'foo@testmail.stormpath.com',
      givenName: '',
      middleName: '',
      surname: '',
      fullName: '',
      status: '',
      createdAt: '',
      modifiedAt: '',
      passwordModifiedAt: ''
    });

    TestBed.configureTestingModule({
      declarations: [AuthPortComponent, LoginComponent, ForgotPasswordComponent, RegisterComponent],
      imports: [FormsModule],
      providers: [
        {provide: Stormpath, useValue: mockStormpathService}
      ]
    });
  });

  it('should show user as logged in when account present', () => {
    const fixture: ComponentFixture<AuthPortComponent> = TestBed.createComponent(AuthPortComponent);
    fixture.detectChanges();

    // verify data was set on component when initialized
    let authportComponent: any = fixture.debugElement.componentInstance;
    authportComponent.loggedIn$.subscribe((value: boolean) => {
      expect(value).toBe(true);
    }, error => console.log(error.message));
  });

  it('should show user as not logged in when no user', () => {
    mockStormpathService.user$ = Observable.of(false);
    TestBed.configureTestingModule({
      declarations: [AuthPortComponent, LoginComponent, ForgotPasswordComponent, RegisterComponent],
      imports: [FormsModule],
      providers: [
        {provide: Stormpath, useValue: mockStormpathService}
      ]
    });

    const fixture: ComponentFixture<AuthPortComponent> = TestBed.createComponent(AuthPortComponent);
    fixture.detectChanges();

    let authportComponent: any = fixture.debugElement.componentInstance;
    authportComponent.loggedIn$.subscribe((value: boolean) => {
      expect(value).toBe(false);
    }, error => console.log(error.message));
  });
});
