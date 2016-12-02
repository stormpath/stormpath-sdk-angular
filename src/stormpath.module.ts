import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stormpath } from './stormpath/stormpath.service';
import { FormsModule } from '@angular/forms';
import { AuthPortComponent } from './authport/authport.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpModule, RequestOptions, Http, XHRBackend } from '@angular/http';
import { LoginService } from './stormpath/stormpath.service';
import { StormpathConfiguration } from './stormpath/stormpath.config';
import { httpFactory } from './stormpath/stormpath.http';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResendEmailVerificationComponent } from './resend-email-verification/resend-email-verification.component';

@NgModule({
  declarations: [
    AuthPortComponent,
    ForgotPasswordComponent,
    LoginComponent,
    RegisterComponent,
    EmailVerificationComponent,
    ResetPasswordComponent,
    ResendEmailVerificationComponent
  ],
  imports: [CommonModule, FormsModule, HttpModule],
  exports: [
    AuthPortComponent,
    ForgotPasswordComponent,
    LoginComponent,
    RegisterComponent,
    EmailVerificationComponent,
    ResetPasswordComponent,
    ResendEmailVerificationComponent
  ],
  providers: [Stormpath, StormpathConfiguration, LoginService,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }]
})
export class StormpathModule {
}
