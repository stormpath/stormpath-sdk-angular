import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StormpathModule } from '../src/stormpath.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { StormpathConfiguration } from '../src/stormpath/stormpath.config';

let config: StormpathConfiguration = new StormpathConfiguration();
config.endpointPrefix = 'https://raible.apps.stormpath.io';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, StormpathModule],
  bootstrap: [AppComponent],
  providers: [{
    provide: StormpathConfiguration, useValue: config
  }]
})
export class DemoModule {
}
