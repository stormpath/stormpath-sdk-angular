import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { StormpathModule } from '../src/stormpath.module';
import { LoginComponent } from '../src/login/login.component';

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

    expect(html).to.match(/<label class="(.*)control-label" for="loginField">Email<\/label>/);
    expect(html).to.match(/<label class="(.*)control-label" for="passwordField">Password<\/label>/);

    expect(html).to.match(/<input class="form-control(.*)" id="loginField" name="login" type="text"/);
    expect(html).to.match(/<input class="form-control(.*)" id="passwordField" name="password" type="password"/);
  });

});
