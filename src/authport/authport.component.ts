import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Stormpath, LoginService } from '../stormpath/stormpath.service';
import { Account } from '../shared/account';

@Component({
  selector: 'sp-authport',
  template: `<ng-template #defaultTemplate>
  <div class="container">
    <div class="row" *ngIf="(user$ | async) === false">
      <div class="col-xs-12 col-sm-offset-3 col-sm-6">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4>
              <ul class="nav nav-pills">
                <li role="presentation" [ngClass]="{active:loginService.login || loginService.forgot}" id="login">
                  <a href="" (click)="showLogin(); false">Sign In</a>
                </li>
                <li role="presentation" [ngClass]="{active:loginService.register}" id="register" class="pull-right">
                  <a href="" (click)="showRegister(); false">Register</a>
                </li>
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
</ng-template>
<ng-template
  [ngTemplateOutlet]="customTemplate || defaultTemplate">
</ng-template>`,
  providers: [LoginService]
})
@Injectable()
export class AuthPortComponent implements OnInit {
  /**
   * A reference to a `<ng-template>` tag that if set will override this component's template. Use like so:
   * ```
   * <ng-template #customTemplate>
   *   // custom HTML with login form
   * </ng-template>
   * ```
   * Then pass customTemplate to the sp-authport component like so `[customTemplate]="customTemplate"`
   */
  @Input() customTemplate: TemplateRef<any>;

  private user$: Observable<Account | boolean>;
  private loggedIn$: Observable<boolean>;
  private login: boolean;
  private register: boolean;
  private forgot: boolean;

  constructor(public stormpath: Stormpath, public loginService: LoginService) {
    this.user$ = this.stormpath.user$;
    this.loggedIn$ = this.user$.map(user => !!user);
  }

  ngOnInit(): void {
    this.loginService.login = true;
    this.loginService.register = false;
    this.forgot = this.loginService.forgot;
    this.user$ = this.stormpath.user$;
    this.loggedIn$ = this.user$.map(user => !!user);
  }

  showLogin(): void {
    this.loginService.login = !(this.loginService.forgot = this.loginService.register = false);
  }

  showRegister(): void {
    this.loginService.forgot = this.loginService.login = false;
    this.loginService.register = true;
  }

  forgotPassword(): void {
    this.loginService.login = false;
    this.forgot = true;
  }

  logout(): void {
    this.stormpath.logout();
  }
}
