import { Component } from '@angular/core';
import { RegisterComponent } from '../../register/index';

@Component({
  selector: 'page-register',
  template: `<ion-header>
  <ion-navbar>
    <ion-title>
      Create Account
    </ion-title>
  </ion-navbar>
</ion-header>
<ion-content padding>
  <form *ngIf="!registered" (ngSubmit)="onSubmit()" autocomplete="off" #registerForm="ngForm">
    <ion-row>
      <ion-col>
        <ion-list inset>
          <ion-item *ngFor="let field of model?.form?.fields">
            <ion-input [name]="field.name" [id]="field.name" [type]="field.type"
                       [(ngModel)]="formModel[field.name]" [placeholder]="field.placeholder"
                       [disabled]="creating" [required]="field.required"></ion-input>
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <div *ngIf="error" class="alert alert-danger">{{error}}</div>
        <button ion-button type="submit" full [disabled]="!registerForm.form.valid">Register</button>
      </ion-col>
    </ion-row>
  </form>
  <p *ngIf="unverified" class="alert alert-success">
    Your account has been created and requires verification.
    Please check your email for a verification link.
  </p>
  <p class="alert alert-success" *ngIf="canLogin">
    Your account has been created, you may now log in.
  </p>
</ion-content>`
})
export class RegisterPage extends RegisterComponent {

  // fix for view model not always loading
  ionViewDidLoad(): void {
    super.ngOnInit();
  }
}
