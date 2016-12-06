import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Stormpath, defaultSpTokenResolver } from '../stormpath/stormpath.service';

@Component({
  selector: 'email-verification',
  template: `<template #defaultTemplate>
<div class="row">
  <div class="col-sm-offset-4 col-xs-12 col-sm-4">
    <p *ngIf="verifying" class="alert alert-warning">We are verifying your account</p>
    <p *ngIf="verified" class="alert alert-success">
      Your account has has been verified!  You may now login.
    </p>
    <div *ngIf="verificationFailed" class="alert alert-danger">
      This email verification link is not valid.  Please request a new email verification link.
    </div>
    <p class="text-danger" *ngIf="error">{{error}}</p>
  </div>
</div>
</template>
<template
  [ngTemplateOutlet]="customTemplate || defaultTemplate">
</template>`
})
@Injectable()
export class EmailVerificationComponent implements OnInit {
  /**
   * A reference to a `<template>` tag that if set will override this component's template. Use like so:
   * ```
   * <template #customTemplate>
   *   // custom HTML with login form
   * </template>
   * ```
   * Then pass customTemplate to the `email-verification` component like so `[customTemplate]="customTemplate"`
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
