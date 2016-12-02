import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Account } from '../shared/account';
import {
  Stormpath, LoginFormModel, LoginService, StormpathErrorResponse
} from '../stormpath/stormpath.service';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html'
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

  constructor(public stormpath: Stormpath, public loginService: LoginService) {
  }

  ngOnInit(): void {
    this.user$ = this.stormpath.user$;
    this.loggedIn$ = this.user$.map(user => !!user);
    this.loginFormModel = {
      login: '',
      password: ''
    };
  }

  login(): void {
    this.error = null;
    this.stormpath.login(this.loginFormModel)
      .subscribe(null, (error: StormpathErrorResponse) => {
        this.error = error.message;
      });
  }

  forgot(): void {
    this.loginService.forgotPassword();
  }
}
