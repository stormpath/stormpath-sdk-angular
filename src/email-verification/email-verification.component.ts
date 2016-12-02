import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Stormpath, defaultSpTokenResolver } from '../stormpath/stormpath.service';

@Component({
  selector: 'email-verification',
  templateUrl: './email-verification.component.html'
})
@Injectable()
export class EmailVerificationComponent implements OnInit {
  /**
   * A reference to a <template> tag that if set will override this component's template. Use like so:
   * <template #customTemplate>
   *   // custom HTML with login form
   * </template>
   *
   * Then pass customTemplate to the email-verification component like so `[customTemplate]="customTemplate"`
   */
  @Input() customTemplate: TemplateRef<any>;

  protected error: string;
  protected verifying: boolean;
  protected verified: boolean;
  protected verificationFailed: boolean;
  protected sptoken: string;

  constructor(public stormpath: Stormpath, public location: Location) {
  }

  ngOnInit(): void {
    this.verifying = false;
    this.verified = false;
    this.verificationFailed = false;
    this.sptoken = this.spTokenResolver();
    if (this.sptoken) {
      this.verify();
    }
  }

  spTokenResolver(): string {
    return defaultSpTokenResolver(this.location);
  }

  verify(): void {
    this.verifying = true;
    this.stormpath.verifyEmailVerificationToken(this.sptoken)
      .subscribe(() => {
        this.verifying = false;
        this.verified = true;
      }, (error) => {
        this.verifying = false;
        if (error.status && error.status === 404) {
          this.verificationFailed = true;
        } else {
          this.error = error.message;
        }
      });
  }
}
