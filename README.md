# Stormpath Angular SDK
[![Build Status](https://travis-ci.org/stormpath/stormpath-sdk-angular.svg?branch=master)](https://travis-ci.org/stormpath/stormpath-sdk-angular)
[![npm version](https://badge.fury.io/js/stormpath-sdk-angular.svg)](http://badge.fury.io/js/stormpath-sdk-angular)
[![devDependency Status](https://david-dm.org/stormpath/stormpath-sdk-angular/dev-status.svg)](https://david-dm.org/stormpath/stormpath-sdk-angular#info=devDependencies)
[![GitHub issues](https://img.shields.io/github/issues/stormpath/stormpath-sdk-angular.svg)](https://github.com/stormpath/stormpath-sdk-angular/issues)
[![GitHub stars](https://img.shields.io/github/stars/stormpath/stormpath-sdk-angular.svg)](https://github.com/stormpath/stormpath-sdk-angular/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/stormpath/stormpath-sdk-angular/master/LICENSE)

## Demo
https://stormpath.github.io/stormpath-sdk-angular/demo/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#licence)

## About

Angular 2 SDK for Stormpath's API

## Installation

Install through npm:
```
npm install --save stormpath-sdk-angular
```

Then use it in your app like so:

```typescript
import {Component} from '@angular/core';
import {HelloWorld} from 'stormpath-sdk-angular';

@Component({
  selector: 'demo-app',
  directives: [HelloWorld],
  template: '<hello-world></hello-world>'
})
export class DemoApp {}
```

You may also find it useful to view the [demo source](https://github.com/stormpath/stormpath-sdk-angular/blob/master/demo/demo.ts).

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

## License

MIT
