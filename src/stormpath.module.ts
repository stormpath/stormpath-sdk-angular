import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stormpath } from './stormpath/stormpath.service';
import { FormsModule } from '@angular/forms';
import { AuthPortComponent } from './authport/authport.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpModule } from '@angular/http';
import { LoginService } from './stormpath/stormpath.service';
import { StormpathConfiguration } from './stormpath/stormpath.config';

@NgModule({
  declarations: [
    AuthPortComponent,
    ForgotPasswordComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [CommonModule, FormsModule, HttpModule],
  exports: [
    AuthPortComponent,
    ForgotPasswordComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [Stormpath, StormpathConfiguration, LoginService]
})
export class StormpathModule {
}
