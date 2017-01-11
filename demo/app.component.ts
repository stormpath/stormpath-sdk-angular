import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Account, Stormpath } from 'angular-stormpath';

@Component({
  selector: 'demo-app',
  template: `
      <div class="container">
        <div class="row" *ngIf="(user$ | async) === false">
          <div class="col-xs-12 col-sm-offset-3 col-sm-6">
            <h1 class="text-center">Hello</h1>
          </div>
        </div>
        <div *ngIf="(user$ | async)" class="row text-center">
          <h1>
            Welcome, {{ ( user$ | async ).fullName }}
          </h1>
          <hr/>

          <ul class="nav nav-pills nav-stacked text-centered">
            <li role="presentation" (click)="logout(); false"><a id="logout" href="#">Logout</a></li>
          </ul>
        </div>

        <sp-authport></sp-authport>

      </div>
    `,
  providers: [Stormpath]
})
export class AppComponent implements OnInit {
  private user$: Observable<Account | boolean>;
  private loggedIn$: Observable<boolean>;
  private login: boolean;
  private register: boolean;

  constructor(public stormpath: Stormpath) {
  }

  ngOnInit(): void {
    this.login = true;
    this.register = false;
    this.user$ = this.stormpath.user$;
    this.loggedIn$ = this.user$.map(user => !!user);
  }

  showLogin(): void {
    this.login = !(this.register = false);
  }

  showRegister(): void {
    this.register = !(this.login = false);
  }

  logout(): void {
    this.stormpath.logout();
  }
}
