import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ForgotPasswordPage, LoginPage, RegisterPage } from './extensions/ionic/index';

@NgModule({
  declarations: [
    ForgotPasswordPage,
    LoginPage,
    RegisterPage
  ],
  imports: [IonicModule],
  exports: [
    ForgotPasswordPage,
    LoginPage,
    RegisterPage
  ],
  providers: []
})
export class StormpathIonicModule {
}
