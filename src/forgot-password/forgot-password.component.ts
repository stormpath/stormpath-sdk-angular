import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Stormpath, ForgotPasswordFormModel, StormpathErrorResponse } from '../stormpath/stormpath.service';

@Component({
  selector: 'forgot-password-form',
  templateUrl: './forgot-password.component.html'
})
@Injectable()
export class ForgotPasswordComponent implements OnInit {
  /**
   * A reference to a `<template>` tag that if set will override this component's template. Use like so:
   * ```
   * <template #customTemplate>
   *   // custom HTML with login form
   * </template>
   * ```
   * Then pass customTemplate to the `forgot-password-form` component like so `[customTemplate]="customTemplate"`
   */
  @Input() customTemplate: TemplateRef<any>;
  protected forgotPasswordFormModel: ForgotPasswordFormModel;
  protected error: string;
  protected sent: boolean;

  constructor(public stormpath: Stormpath) {
    this.sent = false;
  }

  ngOnInit(): void {
    this.forgotPasswordFormModel = {
      email: ''
    };
  }

  send(): void {
    this.error = null;
    this.stormpath.sendPasswordResetEmail(this.forgotPasswordFormModel)
      .subscribe(() => this.sent = true,
        (error: StormpathErrorResponse) => this.error = error.message);
  }

  onSubmit(): void {
    this.send();
  }
}
