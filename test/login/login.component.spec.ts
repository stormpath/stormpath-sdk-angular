import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StormpathModule, LoginComponent } from '../../src';

describe('LoginComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StormpathModule]
    });
  });

  it('should show email and password fields', () => {
    const fixture: ComponentFixture<LoginComponent> = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    let html: string = fixture.nativeElement.innerHTML.trim();

    expect(html).toMatch(/<label class="(.*)control-label" for="loginField">Email<\/label>/);
    expect(html).toMatch(/<label class="(.*)control-label" for="passwordField">Password<\/label>/);

    expect(html).toMatch(/<input class="form-control(.*)" id="loginField" name="login" required="" type="text"/);
    expect(html).toMatch(/<input class="form-control(.*)" id="passwordField" name="password" required="" type="password"/);
  });

});
