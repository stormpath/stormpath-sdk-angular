import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Stormpath, LoginService } from '../stormpath/stormpath.service';
import { Account } from '../shared/account';

@Component({
  selector: 'sp-authport',
  template: `
      <div class="container">
        <br/>
        <br/>


        <div class="row" *ngIf="(user$ | async) === false">
          <div class="col-xs-12 col-sm-offset-3 col-sm-6">


            <h1 class="text-center">Hello</h1>

            <br/>
          </div>
          <div class="col-xs-12 col-sm-offset-3 col-sm-6">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4>
                  <ul class="nav nav-pills">
                    <li role="presentation" [ngClass]="{active:loginService.login || loginService.forgot}" (click)="showLogin()"><a href="#">Sign In</a></li>
                    <li role="presentation" [ngClass]="{active:loginService.register}" (click)="showRegister()" class="pull-right"><a>Register</a></li>

                  </ul>
                </h4>
              </div>
              <div class="panel-body text-center">
                <div class="row" *ngIf="loginService.forgot">
                  <forgot-password-form></forgot-password-form>
                </div>
                <div class="row" *ngIf="loginService.login">
                  <div class="col-xs-12">
                    <login-form></login-form>
                  </div>
                </div>
                <div class="row" *ngIf="loginService.register">
                  <div class="col-xs-12">
                    <register-form autoLogin=true></register-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  providers: [LoginService]
})
@Injectable()
export class AuthPortComponent implements OnInit {
  private user$: Observable<Account | boolean>;
  private loggedIn$: Observable<boolean>;
  private login: boolean;
  private register: boolean;
  protected forgot: boolean;

  constructor(public stormpath: Stormpath, public loginService: LoginService) {
    this.user$ = this.stormpath.user$;
    this.loggedIn$ = this.user$.map(user => !!user);
  }

  ngOnInit() {
    this.loginService.login = true;
    this.loginService.register = false;
    this.forgot = this.loginService.forgot;
    this.user$ = this.stormpath.user$;
    this.loggedIn$ = this.user$.map(user => !!user);
  }

  showLogin() {
    this.loginService.login = !(this.loginService.forgot = this.loginService.register = false);
    // this.flip(this.loginService.login, this.loginService.loginService.register);
  }

  showRegister() {
    this.loginService.forgot = this.loginService.login = false;
    this.loginService.register = true;
    // this.flip(this.loginService.loginService.register, this.loginService.login);
  }

  forgotPassword() {
    this.loginService.login = false;
    this.forgot = true;
  }

  flip(a: boolean, b: boolean) {
    a = !(b = false);
  }

  logout() {
    // this.stormpath.logout();
  }
}
