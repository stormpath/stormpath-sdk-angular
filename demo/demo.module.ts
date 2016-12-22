import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StormpathModule } from '../src/stormpath.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { StormpathConfiguration } from '../src/stormpath/stormpath.config';

let config: StormpathConfiguration = new StormpathConfiguration();
let params = {};

if (location.search) {
  let parts = location.search.substring(1).split('&');

  for (let i = 0; i < parts.length; i++) {
    let nv = parts[i].split('=');
    if (!nv[0]) continue;
    params[nv[0]] = nv[1] || true;
  }
}

if (params['api']) {
  config.endpointPrefix = params['api']; //'https://raible.apps.stormpath.io';
  console.log('Configured endpointPrefix to be: ' + params['api']);
}


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
