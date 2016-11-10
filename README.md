# Stormpath Angular 2 SDK
[![Build Status](https://travis-ci.org/stormpath/stormpath-sdk-angular.svg?branch=master)](https://travis-ci.org/stormpath/stormpath-sdk-angular)
[![npm version](https://badge.fury.io/js/stormpath-sdk-angular.svg)](http://badge.fury.io/js/stormpath-sdk-angular)
[![devDependency Status](https://david-dm.org/stormpath/stormpath-sdk-angular/dev-status.svg)](https://david-dm.org/stormpath/stormpath-sdk-angular#info=devDependencies)
[![GitHub issues](https://img.shields.io/github/issues/stormpath/stormpath-sdk-angular.svg)](https://github.com/stormpath/stormpath-sdk-angular/issues)
[![GitHub stars](https://img.shields.io/github/stars/stormpath/stormpath-sdk-angular.svg)](https://github.com/stormpath/stormpath-sdk-angular/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/stormpath/stormpath-sdk-angular/master/LICENSE)

> Angular 2 Components for integrating with Stormpath's API

<div>
  <a href="http://angular.io">
    <img src="https://github.com/stormpath/stormpath-sdk-angular/raw/master/static/angular.png">
  </a>
  <a href="https://www.stormpath.com/">
    <img src="https://github.com/stormpath/stormpath-sdk-angular/raw/master/static/stormpath.png">
  </a>
</div>

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#licence)

## About

Angular 2 SDK for Stormpath's API. If you're looking for AngularJS support, please see [stormpath-sdk-angularjs](https://github.com/stormpath/stormpath-sdk-angularjs).

## Installation

Install through npm:
```
npm install --save angular-stormpath
```

Then use it in your app like so:

```typescript
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Account, Stormpath } from 'angular-stormpath';

@Component({
  selector: 'app-root',
  template: `<div *ngIf="(user$ | async)" class="row text-center">
       <h2 class="">
         Welcome, ({{ ( user$ | async ).fullName }}).
       </h2>
       <hr/>
       <h4>What would you like to do?</h4>

       <ul class="nav nav-pills nav-stacked text-centered">
         <li role="presentation" (click)="logout()"><a href="#">Logout</a></li>
       </ul>
     </div>

     <sp-authport></sp-authport>`,
  providers: [Stormpath]
})
export class AppComponent {
  private user$: Observable<Account | boolean>;
  private loggedIn$: Observable<boolean>;
  private login: boolean;
  private register: boolean;

  constructor(public stormpath: Stormpath) {}

  ngOnInit() {
    this.login = true;
    this.register = false;
    this.user$ = this.stormpath.user$;
    this.loggedIn$ = this.user$.map(user => !!user);
  }

  showLogin() {
    this.login = !(this.register = false);
  }

  showRegister() {
    this.register = !(this.login = false);
  }

  logout() {
    this.stormpath.logout();
  }
}
```

You may also find it useful to view the [demo source](https://github.com/stormpath/stormpath-sdk-angular/blob/master/demo/app.component.ts).

### Configuration

To override the endpoint prefix or URIs for the various endpoints, you can modify the defaults in [StormpathConfiguration](https://github.com/stormpath/stormpath-sdk-angular/blob/master/src/stormpath/stormpath.config.ts).

For example, to override the endpoint prefix and `/me` URI in [demo.module.ts](https://github.com/stormpath/stormpath-sdk-angular/blob/master/demo/demo.module.ts), change it to the following:

```typescript
let spConfig: StormpathConfiguration = new StormpathConfiguration();
spConfig.endpointPrefix = 'http://api.mycompany.com';
spConfig.meUri = '/account';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StormpathModule],
  bootstrap: [AppComponent],
  providers: [{
    provide: StormpathConfiguration, useValue: spConfig
  }]
})
export class DemoModule {
}
```

### Usage without a module bundler
```
<script src="node_modules/dist/umd/stormpath-sdk-angular/stormpath-sdk-angular.js"></script>
<script>
    // everything is exported Stormpath namespace
</script>
```

## Documentation
All documentation is auto-generated from the source via typedoc and can be viewed here:
https://stormpath.github.io/stormpath-sdk-angular/docs/

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `npm start` to start a development server on port 8000 with auto reload + tests.

### Testing
Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
```bash
npm run release
```

For more information, see [generator-angular2-module](https://www.npmjs.com/package/generator-angular2-module). 
It was used to create this project.

## License

Apache-2.0 © [Stormpath](https://stormpath.com)
