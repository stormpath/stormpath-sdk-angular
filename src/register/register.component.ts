import { Component, Input, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Account } from '../shared/account';
import { Stormpath, LoginFormModel, RegistrationFormModel } from '../stormpath/stormpath.service';


@Component({
  selector: 'register-form',
  template: `
    <form *ngIf="!registered" (ngSubmit)="onSubmit()" class="form-horizontal">
      <div class="form-group" *ngFor="let field of model?.form?.fields">
        <label [attr.for]="field.name" class="col-sm-4 control-label">{{field.label}}</label>
        <div class="col-sm-8">
          <input class="form-control" [name]="field.name" [id]="field.name" [type]="field.type" [(ngModel)]="formModel[field.name]" [placeholder]="field.placeholder" [disabled]="creating" [required]="field.required">
        </div>
      </div>
      <div *ngIf="error" class="alert alert-danger">{{error}}</div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
    <p *ngIf="unverified" class="alert alert-success">
      Your account has been created and requires verification.
      Please check your email for a verification link.
    </p>
    <p class="alert alert-success" *ngIf="canLogin">
      Your account has been created, you may now log in.
    </p>
  `
})
@Injectable()
export class RegisterComponent implements OnInit {
  @Input() autoLogin: boolean;
  protected model: Object;
  private error: string;
  protected viewModel$: Observable<Object>;
  protected formModel: RegistrationFormModel;
  protected unverified: boolean;
  protected canLogin: boolean;
  protected registered: boolean;
  constructor(public stormpath: Stormpath) {
    this.unverified = false;
    this.canLogin = false;
    this.formModel = {
      email: 'robert+2@stormpath.com',
      surname: 'robert',
      givenName: 'robert',
      password: 'robert@stormpath.comA1'
    };
  }
  ngOnInit() {
    // this.formModel = {};
    this.stormpath.getRegistrationViewModel()
      .subscribe(model => {
        this.model = model;
      }, error =>
        this.error = error.message
      );
  }
  register() {
    this.stormpath.register(this.formModel)
      .subscribe((account: Account) => {
        this.registered = true;
        this.unverified = account.status === 'UNVERIFIED';
        this.canLogin = account.status === 'ENABLED';

        if (this.canLogin && this.autoLogin) {
          let loginAttempt: LoginFormModel = {
            login: this.formModel.email,
            password: this.formModel.password
          };

          this.stormpath.login(loginAttempt);
        }
      }, error => this.error = error.message);
  }
  onSubmit() {
    this.register();
  }
};
