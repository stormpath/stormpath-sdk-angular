import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { EventManager } from './stormpath/event.manager';
import { LocalStorageTokenStoreManager, CookieTokenStoreManager } from './stormpath/token-store.manager';
import { Stormpath } from './stormpath/stormpath.service';
import { Ng2Webstorage } from 'ng2-webstorage';
import { CookieService } from 'angular2-cookie/core';

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
  imports: [CommonModule, FormsModule, HttpModule, Ng2Webstorage],
  exports: [
    AuthPortComponent,
    ForgotPasswordComponent,
    LoginComponent,
    RegisterComponent,
    EmailVerificationComponent,
    ResetPasswordComponent,
    ResendEmailVerificationComponent
  ],
  providers: [
    EventManager, LocalStorageTokenStoreManager, CookieTokenStoreManager, CookieService,
    Stormpath, StormpathConfiguration, LoginService,
    {
      provide: 'tokenStore', useClass: LocalStorageTokenStoreManager,
    },
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, StormpathConfiguration, 'tokenStore']
    }
  ]
})
export class StormpathModule {
}
