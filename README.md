# Stormpath Angular 2 SDK
[![Build Status](https://travis-ci.org/stormpath/stormpath-sdk-angular.svg?branch=master)](https://travis-ci.org/stormpath/stormpath-sdk-angular)
[![npm version](https://badge.fury.io/js/stormpath-sdk-angular.svg)](http://badge.fury.io/js/stormpath-sdk-angular)
[![devDependency Status](https://david-dm.org/stormpath/stormpath-sdk-angular/dev-status.svg)](https://david-dm.org/stormpath/stormpath-sdk-angular#info=devDependencies)
[![GitHub issues](https://img.shields.io/github/issues/stormpath/stormpath-sdk-angular.svg)](https://github.com/stormpath/stormpath-sdk-angular/issues)
[![GitHub stars](https://img.shields.io/github/stars/stormpath/stormpath-sdk-angular.svg)](https://github.com/stormpath/stormpath-sdk-angular/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/stormpath/stormpath-sdk-angular/master/LICENSE)

<!--
## Demo
https://stormpath.github.io/stormpath-sdk-angular/demo/
-->

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
import {Component} from '@angular/core';
import {Account,Stormpath} from 'angular-stormpath';

@Component({
  selector: 'demo-app',
  template: `<div *ngIf="(user$ | async)" class="row text-center">
       <h2 class="">
         Welcome, ({{ ( user$ | async ).fullName }}).
       </h2>
       <hr/>
       <h4>What would you like to do?</h4>

       <ul class="nav nav-pills nav-stacked text-centered">
         <li role="presentation" (click)="showLogin()"><a href="#">Edit My Profile</a></li>
         <li role="presentation" (click)="logout()"><a href="#"> Logout</a></li>
       </ul>
     </div>

     <sp-authport></sp-authport>`
  providers: [Stormpath]
})
export class DemoApp {
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
