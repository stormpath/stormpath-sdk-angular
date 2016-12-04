import { Component, Injectable, OnInit, TemplateRef, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Stormpath, PasswordResetRequest, defaultSpTokenResolver } from '../stormpath/stormpath.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html'
})
@Injectable()
export class ResetPasswordComponent implements OnInit {
  /**
   * A reference to a `<template>` tag that if set will override this component's template. Use like so:
   * ```
   * <template #customTemplate>
   *   // custom HTML with login form
   * </template>
   * ```
   * Then pass customTemplate to the `reset-password` component like so `[customTemplate]="customTemplate"`
   */
  @Input() customTemplate: TemplateRef<any>;
  protected disabled: boolean;
  protected error: string;
  protected formModel: PasswordResetRequest;
  protected posting: boolean;
  protected reset: boolean;
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
    this.formModel = {
      sptoken: this.spTokenResolver(),
      password: ''
    };
    // debugger
    if (this.formModel.sptoken) {
      this.verify();

    }
  }

  spTokenResolver(): string {
    return defaultSpTokenResolver(this.location);
  }

  verify(): void {
    this.verifying = true;
    this.stormpath.verifyPasswordResetToken(this.formModel.sptoken)
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

  send(): void {
    this.stormpath.resetPassword(this.formModel)
      .subscribe(
      () => {
        this.posting = false;
        this.reset = true;
      },
      (error) => {
        this.posting = false;
        this.error = error.message;
      }
      );
  }

  onSubmit(): void {
    this.send();
  }
}
