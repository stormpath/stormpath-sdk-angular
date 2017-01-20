import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Stormpath, ForgotPasswordFormModel, StormpathErrorResponse } from '../stormpath/stormpath.service';

@Component({
  selector: 'forgot-password-form',
  template: `<template #defaultTemplate>
  <div class="row">
    <div class="col-xs-12">
      <p *ngIf="sent" class="alert alert-success">
        We have sent a password reset link to the email address of the account that you specified.
        Please check your email for this message, then click on the link.
      </p>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12">
      <form class="form-horizontal" *ngIf="!sent" #form="ngForm" (ngSubmit)="onSubmit(form.value)" autocomplete="off">
        <div class="form-group">
          <label for="spEmail" class="col-sm-3 control-label">Email</label>
          <div class="col-sm-9">
            <input class="form-control" name="email" type="email" id="spEmail" [(ngModel)]="forgotPasswordFormModel.email"
                   placeholder="Your Email Address" [disabled]="posting" required>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-3">
            <p class="text-danger" *ngIf="error">{{error}}</p>
            <button type="submit" class="btn btn-primary" [disabled]="posting">Request Password Reset</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<template
  [ngTemplateOutlet]="customTemplate || defaultTemplate">
</template>`
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

  onSubmit(form: any): void {
    this.send();
  }
}
