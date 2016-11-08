import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ForgotPasswordComponent } from '../../src/forgot-password/forgot-password.component';
import { StormpathModule } from '../../src/stormpath.module';

describe('ForgotPasswordComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StormpathModule]
    });
  });

  it('should show email field', () => {
    const fixture: ComponentFixture<ForgotPasswordComponent> = TestBed.createComponent(ForgotPasswordComponent);
    fixture.detectChanges();
    let html: string = fixture.nativeElement.innerHTML.trim();

    expect(html).toMatch(/<label class="(.*)control-label" for="spEmail">Email<\/label>/);
    expect(html).toMatch(/<input class="form-control(.*)" id="spEmail" name="email" placeholder="Your Email Address" type="email"/);
  });
});
