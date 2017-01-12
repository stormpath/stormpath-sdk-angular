import { Component } from '@angular/core';
import { LoginComponent } from 'angular-stormpath';

@Component({
  selector: 'login-form',
  template: `<form class="form-horizontal" #form="ngForm" (ngSubmit)="login(form.value)">
    <label for="loginField">Email</label>
    <input name="login" id="loginField" type="text" required [(ngModel)]="loginFormModel.login">
    <label for="passwordField">Password</label>
    <input name="password" id="passwordField" type="password" required [(ngModel)]="loginFormModel.password">
    <a href="#" (click)="forgot(); false">&nbsp;Forgot Password?</a>
    <div *ngIf="error" class="warning">{{error}}</div>
    <button id="loginBtn" type="submit">Login</button>
</form>`
})
export class CustomLoginComponent extends LoginComponent {

}
