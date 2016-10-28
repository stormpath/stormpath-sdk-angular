import { Component, Injectable, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Stormpath, PasswordResetRequest, defaultSpTokenResolver } from '../stormpath/stormpath.service';


@Component({
  selector: 'reset-password',
  template: `
<div class="row">
  <div class="col-sm-offset-4 col-xs-12 col-sm-4">
    <p *ngIf="verifying" class="alert alert-warning text-center">We are verifying your password reset link</p>
    <p class="alert alert-success" *ngIf="reset">Your new password has been set, you may now login.</p>
    <div *ngIf="verificationFailed" class="alert alert-danger">
      This password reset link is not valid, please request a new reset link.
    </div>
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    <form class="form-horizontal" *ngIf="verified && !reset" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="spEmail" class="col-xs-12 col-sm-4 control-label">New Password</label>
        <div class="col-xs-12 col-sm-4">
          <input class="form-control" id="spUsername" [(ngModel)]="formModel.password" placeholder="New Password" type="password" [disabled]="posting">
        </div>
      </div>
      <div class="form-group">
        <label for="spEmail" class="col-xs-12 col-sm-4 control-label">Confirm New Password</label>
        <div class="col-xs-12 col-sm-4">
          <input class="form-control" id="spUsername" [(ngModel)]="formModel.confirmPassword" placeholder="Confirm New Password" type="password" [disabled]="posting">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-4 col-sm-4">
          <p class="alert alert-danger" *ngIf="error">{{error}}</p>
          <button type="submit" class="btn btn-primary" [disabled]="posting">Set New Password</button>
        </div>
      </div>
    </form>
  </div>
</div>

`
})
@Injectable()
export class ResetPasswordComponent implements OnInit {

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
  ngOnInit() {
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

  verify() {
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

  send() {
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

  onSubmit() {
    this.send();
  }
};
