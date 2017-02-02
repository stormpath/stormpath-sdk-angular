import { Component, ViewChild } from '@angular/core';
import { LoginComponent} from '../../login/index';
import { NavController } from 'ionic-angular';
import { Stormpath, LoginService } from '../../stormpath/index';
import { ForgotPasswordPage } from './forgot';
import { RegisterPage } from './register';

@Component({
  selector: 'page-login',
  template: `<ion-header>
  <ion-navbar>
    <ion-title>
      Login
    </ion-title>
  </ion-navbar>
</ion-header>
<ion-content padding>
  <form #loginForm="ngForm" (ngSubmit)="login(loginForm.value)" autocomplete="off">
    <ion-row>
      <ion-col>
        <ion-list inset>
          <ion-item>
            <ion-input placeholder="Email" name="login" id="loginField" type="text"
                       required [(ngModel)]="loginFormModel.login" #email></ion-input>
          </ion-item>
          <ion-item>
            <ion-input placeholder="Password" name="password" id="passwordField"
                       type="password" required [(ngModel)]="loginFormModel.password"></ion-input>
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <div *ngIf="error" class="alert alert-danger">{{error}}</div>
        <button ion-button class="submit-btn" full type="submit" [disabled]="!loginForm.form.valid">Login</button>
        <button ion-button class="forgot-btn" type="button" block clear (click)="forgot()">Forgot Password?</button>
        <button ion-button class="create-btn" type="button" block clear (click)="register()">Create Account</button>
      </ion-col>
    </ion-row>
  </form>
</ion-content>`
})
export class LoginPage extends LoginComponent {
  @ViewChild('email') email: any;

  constructor(stormpath: Stormpath, loginService: LoginService, private nav: NavController) {
    super(stormpath, loginService);
  }

  forgot(): void {
    this.nav.push(ForgotPasswordPage);
  }

  register(): void {
    this.nav.push(RegisterPage);
  }

  ionViewDidLoad(): void {
    setTimeout(() => {
      this.email.setFocus();
    }, 150);
  }
}
