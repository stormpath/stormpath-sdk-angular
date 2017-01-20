import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {
  StormpathConfiguration, StormpathModule, CookieTokenStoreManager,
  LocalStorageTokenStoreManager
} from 'angular-stormpath';

let params: any = {};

export function stormpathConfig(): StormpathConfiguration {
  let config: StormpathConfiguration = new StormpathConfiguration();

  if (location.search) {
    let parts: Array<String> = location.search.substring(1).split('&');

    for (let i: number = 0; i < parts.length; i++) {
      let nv: any = parts[i].split('=');
      if (!nv[0]) continue;
      params[nv[0]] = nv[1] || true;
    }
  }

// allow switching between local server and client api
  if (params['api']) {
    config.endpointPrefix = params['api'];
    console.info('Configured endpointPrefix to be: ' + params['api']);
  }

  return config;
}

// allow switching between localStorage and cookies
let tokenStore: any;
if (params['storage'] && (params['storage'] === 'cookies')) {
  tokenStore = CookieTokenStoreManager;
  console.info('Configured token storage to use cookies');
} else {
  tokenStore = LocalStorageTokenStoreManager;
  console.info('Configured token storage to use localStorage');
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, StormpathModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: StormpathConfiguration, useFactory: stormpathConfig
    },
    {
      provide: 'tokenStore', useClass: tokenStore
    }
  ]
})
export class DemoModule {
}
