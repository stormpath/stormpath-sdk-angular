import { Component, Injectable, OnInit } from '@angular/core';

import { Stormpath, ResendEmailVerificationRequest } from '../stormpath/stormpath.service';

@Component({
  selector: 'resend-email-verification',
  template: `
<div class="row">
  <div class="col-sm-offset-4 col-xs-12 col-sm-4">

    <p *ngIf="sent" class="alert alert-success">
      We have sent a new verification message to your email address, please check your email for this message.
    </p>

    <p class="text-danger" *ngIf="error">{{error}}</p>
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
    <form class="form-horizontal" *ngIf="!sent" (ngSubmit)="onSubmit()">

      <div class="form-group">
        <label for="spEmail" class="col-xs-12 col-sm-4 control-label">Email address</label>
        <div class="col-xs-12 col-sm-4">
          <input class="form-control" id="spUsername" [(ngModel)]="formModel.login" [disabled]="posting">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-4 col-xs-12">
          <p class="text-danger" *ngIf="error">{{error}}</p>
          <button type="submit" class="btn btn-primary" [disabled]="posting">Re-Send Verification</button>
        </div>
      </div>
    </form>
  </div>
</div>
  `
})
@Injectable()
export class ResendEmailVerificationComponent implements OnInit {

  protected error: string;
  protected formModel: ResendEmailVerificationRequest;
  protected posting: boolean;
  protected sent: boolean;

  constructor(public stormpath: Stormpath) {

  }
  ngOnInit() {
    this.posting = false;
    this.sent = false;
    this.formModel = {
      login: ''
    };

  }

  send() {
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
  onSubmit() {
    this.send();
  }
};
