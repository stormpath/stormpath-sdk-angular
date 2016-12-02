import { Component, Injectable, OnInit, Input, TemplateRef } from '@angular/core';
import { Stormpath, ResendEmailVerificationRequest } from '../stormpath/stormpath.service';

@Component({
  selector: 'resend-email-verification',
  templateUrl: './resend-email-verification.component.html'
})
@Injectable()
export class ResendEmailVerificationComponent implements OnInit {
  /**
   * A reference to a `<template>` tag that if set will override this component's template. Use like so:
   * ```
   * <template #customTemplate>
   *   // custom HTML with login form
   * </template>
   * ```
   * Then pass customTemplate to the `resend-email-verification` component like so `[customTemplate]="customTemplate"`
   */
  @Input() customTemplate: TemplateRef<any>;
  protected error: string;
  protected formModel: ResendEmailVerificationRequest;
  protected posting: boolean;
  protected sent: boolean;

  constructor(public stormpath: Stormpath) {
  }

  ngOnInit(): void {
    this.posting = false;
    this.sent = false;
    this.formModel = {
      login: ''
    };
  }

  send(): void {
    this.posting = true;
    this.stormpath.resendVerificationEmail(this.formModel)
      .subscribe(() => {
        this.posting = false;
        this.sent = true;
      }, (error) => {
        this.posting = false;
        this.error = error.message;
      });
  }

  onSubmit(): void {
    this.send();
  }
}
