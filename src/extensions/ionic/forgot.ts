import { Component } from '@angular/core';
import { ForgotPasswordComponent } from '../../forgot-password/index';

@Component({
  selector: 'page-forgot-password',
  template: `<ion-header>
  <ion-navbar>
    <ion-title>
      Forgot Password
    </ion-title>
  </ion-navbar>
</ion-header>
<ion-content padding>
  <p *ngIf="sent">
    We have sent a password reset link to the email address of the account that you specified.
    Please check your email for this message, then click on the link.<br>
    <button ion-button type="button" (click)="showLogin()">Back to Login</button>
  </p>
  <ion-row>
    <ion-col>
      <form *ngIf="!sent" #registerForm="ngForm" (ngSubmit)="onSubmit(registerForm.value)" autocomplete="off">
        <ion-list inset>
          <ion-item>
            <ion-input name="email" type="email" id="spEmail" [(ngModel)]="forgotPasswordFormModel.email"
                       placeholder="Your Email Address" [disabled]="posting" required></ion-input>
          </ion-item>
        </ion-list>
        <ion-row>
          <ion-col>
            <p class="text-danger" *ngIf="error">{{error}}</p>
            <button ion-button type="submit" full [disabled]="!registerForm.form.valid || posting">Request Password Reset</button>
          </ion-col>
        </ion-row>
      </form>
    </ion-col>
  </ion-row>
</ion-content>`
})
export class ForgotPasswordPage extends ForgotPasswordComponent {}
