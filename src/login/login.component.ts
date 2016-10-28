import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Account } from '../shared/account';
import {
  Stormpath, LoginFormModel, LoginService, StormpathErrorResponse
} from '../stormpath/stormpath.service';

@Component({
  selector: 'login-form',
  template: `
    <form class="form-horizontal">
      <div class="form-group">
        <label for="loginField" class="col-sm-3 control-label">Email</label>
        <div class="col-sm-9">
          <input class="form-control" name="login" id="loginField" type="text" [(ngModel)]="loginFormModel.login">
        </div>
      </div>
      <div class="form-group">
        <label for="passwordField" class="col-sm-3 control-label">Password</label>
        <div class="col-sm-9">
          <input class="form-control" name="password" id="passwordField" type="password" [(ngModel)]="loginFormModel.password">
        </div>
      </div>


      <div class="form-group">

        <div class="col-xs-10 col-xs-offset-3 text-left">
          <a href="#" (click)="forgot()">&nbsp;Forgot Password?</a>
        </div>
      </div>


      <div *ngIf="error" class="alert alert-danger">{{error}}</div>
      <button (click)="login()" class="btn btn-primary pull-right">Login</button>
    </form>
  `
})
@Injectable()
export class LoginComponent implements OnInit {
  protected loginFormModel: LoginFormModel;
  protected user$: Observable<Account | boolean>;
  protected loggedIn$: Observable<boolean>;
  protected error: string;

  constructor(public stormpath: Stormpath, public loginService: LoginService) {

  }
  ngOnInit() {
    this.user$ = this.stormpath.user$;
    this.loggedIn$ = this.user$.map(user => !!user);
    this.loginFormModel = {
      login: 'robert@stormpath.com',
      password: 'robert@stormpath.comA'
    };
  }
  login() {
    this.error = null;
    this.stormpath.login(this.loginFormModel)
      .subscribe(null, (error: StormpathErrorResponse) => {
        this.error = error.message;
      });
  }
  forgot() {
    this.loginService.forgotPassword();
  }
};
