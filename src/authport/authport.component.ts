import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Stormpath, LoginService } from '../stormpath/stormpath.service';
import { Account } from '../shared/account';

@Component({
  selector: 'sp-authport',
  templateUrl: './authport.component.html',
  providers: [LoginService]
})
@Injectable()
export class AuthPortComponent implements OnInit {
  /**
   * A reference to a <template> tag that if set will override this component's template. Use like so:
   * <template #customTemplate>
   *   // custom HTML with login form
   * </template>
   *
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
