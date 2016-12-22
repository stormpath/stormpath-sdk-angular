import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Account } from '../shared/account';
import {
  Stormpath, LoginFormModel, LoginService, StormpathErrorResponse
} from '../stormpath/stormpath.service';
import { FormsModule } from '@angular/forms';
import { EventManager } from '../stormpath/event-manager.service';

@Component({
  selector: 'login-form',
  template: `<template #defaultTemplate>
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
  <button (click)="login()" id="loginBtn" type="submit" class="btn btn-primary pull-right">Login</button>
</form>
</template>
<template
  [ngTemplateOutlet]="customTemplate || defaultTemplate">
</template>`
})
@Injectable()
export class LoginComponent implements OnInit {
  /**
   * A reference to a `<template>` tag that if set will override this component's template. Use like so:
   * ```
   * <template #customTemplate>
   *   // custom HTML with login form
   * </template>
   * ```
   * Then pass customTemplate to the `login-form` component like so `[customTemplate]="customTemplate"`
   */
  @Input() customTemplate: TemplateRef<any>;

  protected loginFormModel: LoginFormModel;
  protected user$: Observable<Account | boolean>;
  protected loggedIn$: Observable<boolean>;
  protected error: string;

  constructor(public stormpath: Stormpath, public loginService: LoginService, public eventManager: EventManager) {
  }

  ngOnInit(): void {
    this.user$ = this.stormpath.user$;
    this.loggedIn$ = this.user$.map(user => !!user);
    this.loginFormModel = {
      login: '',
      password: ''
    };
  }

  login2(): void {
    this.error = null;
    this.stormpath.login(this.loginFormModel)
      .subscribe(null, (error: StormpathErrorResponse) => {
        this.error = error.message;
      });
  }

  login () {
    this.stormpath.login(this.loginFormModel).then(() => {

      this.eventManager.broadcast(
        {
          name: 'authenticationSuccess',
          content: 'Sending Authentication Success'
        }
      );

    }).catch((error: StormpathErrorResponse) => {
      this.error = error.message;
    });
  }

  forgot(): void {
    this.loginService.forgotPassword();
  }
}
