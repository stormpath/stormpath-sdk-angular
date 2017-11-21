# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.2.0"></a>
# [0.2.0](https://github.com/stormpath/stormpath-sdk-angular/compare/v0.1.7...v0.2.0) (2017-11-21)



<a name="2.0.0"></a>
## [0.2.0](https://github.com/stormpath/stormpath-sdk-angular/compare/v0.1.6...v0.2.0) (2017-11-21)


### Bug Fixes

* **package.json:** Remove angular-cookie and webstorage from devDependencies ([833acbb](https://github.com/stormpath/stormpath-sdk-angular/commit/833acbb))



<a name="0.1.6"></a>
## [0.1.6](https://github.com/stormpath/stormpath-sdk-angular/compare/v0.1.5...v0.1.6) (2017-02-04)


### Bug Fixes

* **dependencies:** Remove Ionic pages and module ([a3e837b](https://github.com/stormpath/stormpath-sdk-angular/commit/a3e837b))



<a name="0.1.5"></a>
## [0.1.5](https://github.com/stormpath/stormpath-sdk-angular/compare/v0.1.4...v0.1.5) (2017-02-03)


### Features

* **templates:** Add pages for Ionic with Ionic components in templates ([4360bab](https://github.com/stormpath/stormpath-sdk-angular/commit/4360bab))



<a name="0.1.4"></a>
## [0.1.4](https://github.com/stormpath/stormpath-sdk-angular/compare/v0.1.3...v0.1.4) (2017-01-30)


### Bug Fixes

* **build:** Move ng2-webstorage and angular2-cookies to dependencies since they're required ([d05d730](https://github.com/stormpath/stormpath-sdk-angular/commit/d05d730)), closes [#62](https://github.com/stormpath/stormpath-sdk-angular/issues/62)



<a name="0.1.3"></a>
## [0.1.3](https://github.com/stormpath/stormpath-sdk-angular/compare/v0.1.2...v0.1.3) (2017-01-30)


### Bug Fixes

* **angular:** Change to peerDependencies and allow Angular 2.0.0+ ([cbf9637](https://github.com/stormpath/stormpath-sdk-angular/commit/cbf9637))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/stormpath/stormpath-sdk-angular/compare/v0.1.1...v0.1.2) (2017-01-27)


### Bug Fixes

* **http:** Fix compatibility with Angular versions < 2.3 ([b3ae345](https://github.com/stormpath/stormpath-sdk-angular/commit/b3ae345))
* **logout:** Fix logout fails when no access token found ([6fcaeda](https://github.com/stormpath/stormpath-sdk-angular/commit/6fcaeda))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/stormpath/stormpath-sdk-angular/compare/v0.1.0...v0.1.1) (2017-01-20)


### Bug Fixes

* **config:** Allow autoAuthorizedUris to be modified ([#48](https://github.com/stormpath/stormpath-sdk-angular/issues/48)) ([ca81cbe](https://github.com/stormpath/stormpath-sdk-angular/commit/ca81cbe)), closes [#47](https://github.com/stormpath/stormpath-sdk-angular/issues/47)
* **dependencies:** Lock down version of ng2-webstorage to 1.4.3. ([6b00209](https://github.com/stormpath/stormpath-sdk-angular/commit/6b00209)), closes [#46](https://github.com/stormpath/stormpath-sdk-angular/issues/46)
* **security:** Set autocomplete="off" for all forms ([#52](https://github.com/stormpath/stormpath-sdk-angular/issues/52)) ([e85dc7d](https://github.com/stormpath/stormpath-sdk-angular/commit/e85dc7d)), closes [#51](https://github.com/stormpath/stormpath-sdk-angular/issues/51)



<a name="0.1.0"></a>
## [0.1.0](https://github.com/stormpath/stormpath-sdk-angular/compare/v0.0.5...v0.1.0) (2017-01-12)


### Bug Fixes

* **build:** Fix installation by downgrading to TypeScript 2.0.10. ([#45](https://github.com/stormpath/stormpath-sdk-angular/issues/45)) ([2ec5ae3](https://github.com/stormpath/stormpath-sdk-angular/commit/2ec5ae3))
* **demo:** Fix logout link so event propogation is stopped ([7758ed2](https://github.com/stormpath/stormpath-sdk-angular/commit/7758ed2)), closes [#22](https://github.com/stormpath/stormpath-sdk-angular/issues/22)
* **forms:** Add required field validation to login and forgot password forms. ([#40](https://github.com/stormpath/stormpath-sdk-angular/issues/40)) ([ca2f339](https://github.com/stormpath/stormpath-sdk-angular/commit/ca2f339)), closes [#24](https://github.com/stormpath/stormpath-sdk-angular/issues/24)
* **webpack:** Change X-Stormpath-Agent to read versions from package.json and Angular ([8e3747e](https://github.com/stormpath/stormpath-sdk-angular/commit/8e3747e))


### Features

* **oauth:** Add support for OAuth and Client API ([#37](https://github.com/stormpath/stormpath-sdk-angular/issues/37)) ([e18ed49](https://github.com/stormpath/stormpath-sdk-angular/commit/e18ed49))
* **tests:** Add Protractor configuration and tests ([41c216a](https://github.com/stormpath/stormpath-sdk-angular/commit/41c216a))


### Performance Improvements

* **webpack:** Upgrade to webpack 2 for better performance and ES6 ([9c8b345](https://github.com/stormpath/stormpath-sdk-angular/commit/9c8b345))



<a name="0.0.5"></a>
## [0.0.5](https://github.com/stormpath/stormpath-sdk-angular/compare/v0.0.4...v0.0.5) (2016-12-14)


### Bug Fixes

* **cors:** Use withCredentials: true for requests so CORS works ([991af7b](https://github.com/stormpath/stormpath-sdk-angular/commit/991af7b))


<a name="0.0.4"></a>
## [0.0.4](https://github.com/stormpath/stormpath-sdk-angular/compare/v0.0.3...v0.0.4) (2016-12-06)


### Bug Fixes

* resolving conflicted typedoc dependency ([da6fa97](https://github.com/stormpath/stormpath-sdk-angular/commit/da6fa97))
* **templates:** Fixed 404 in templates by embedding them ([cd0d377](https://github.com/stormpath/stormpath-sdk-angular/commit/cd0d377))
* **typedoc:** Fix typedoc listing of classes in right column ([0a464a4](https://github.com/stormpath/stormpath-sdk-angular/commit/0a464a4))



<a name="0.0.4"></a>
## [0.0.4](https://github.com/stormpath/stormpath-sdk-angular/compare/v0.0.3...v0.0.4) (2016-12-06)


### Bug Fixes

* **templates:** Fixed 404 in templates by embedding them ([98982c4](https://github.com/stormpath/stormpath-sdk-angular/commit/98982c4))
* **typedoc:** Fix typedoc listing of classes in right column ([0a464a4](https://github.com/stormpath/stormpath-sdk-angular/commit/0a464a4))

<a name="0.0.3"></a>
## [0.0.3](https://github.com/stormpath/stormpath-sdk-angular/compare/v0.0.2...v0.0.3) (2016-12-02)


### Features

* Add support for overridding templates ([bc4e6b0](https://github.com/stormpath/stormpath-sdk-angular/commit/bc4e6b0))

<a name="0.0.2"></a>
## [0.0.2](https://github.com/stormpath/stormpath-sdk-angular/compare/v0.0.1...v0.0.2) (2016-11-11)

### Bug Fixes

* Change user-agent to be stormpath-sdk-angular ([021d882](https://github.com/stormpath/stormpath-sdk-angular/commit/021d882))

<a name="0.0.1"></a>
## 0.0.1 (2016-11-10)

* Initial Release
