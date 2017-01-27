import { Component } from '@angular/core';
import { AuthPortComponent } from 'angular-stormpath';

@Component({
  selector: 'demo-app',
  template: `<div class="container">
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

</div>`
})
export class AppComponent extends AuthPortComponent {
}
