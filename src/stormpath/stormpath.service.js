"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
require('rxjs/add/operator/share');
require('rxjs/add/observable/throw');
var account_1 = require('../shared/account');
var APPLICATION_JSON = 'application/json';
var JsonGetOptions = (function (_super) {
    __extends(JsonGetOptions, _super);
    function JsonGetOptions() {
        _super.call(this, {
            headers: new http_1.Headers({ 'Accept': APPLICATION_JSON })
        });
    }
    return JsonGetOptions;
}(http_1.RequestOptions));
var JsonPostOptions = (function (_super) {
    __extends(JsonPostOptions, _super);
    function JsonPostOptions() {
        _super.call(this);
        this.headers.append('Content-Type', APPLICATION_JSON);
    }
    return JsonPostOptions;
}(JsonGetOptions));
function defaultSpTokenResolver(location) {
    var m = location.path().match(/sptoken=([^&]+)/);
    return m && m.length === 2 ? m[1] : '';
}
exports.defaultSpTokenResolver = defaultSpTokenResolver;
var LoginService = (function () {
    function LoginService() {
        this.forgot = false;
        this.login = true;
        this.register = false;
    }
    LoginService.prototype.forgotPassword = function () {
        this.forgot = true;
        this.login = false;
    };
    return LoginService;
}());
exports.LoginService = LoginService;
var Stormpath = (function () {
    function Stormpath(http) {
        var _this = this;
        this.http = http;
        this.userSource = new Rx_1.ReplaySubject(1);
        this.user$ = this.userSource.asObservable();
        this.getAccount()
            .subscribe(function (user) { return _this.userSource.next(user); });
    }
    /**
     * Attempts to get the current user by making a request of the /me endpoint.
     *
     * @return {Observable<Account | boolean>}
     * An observable that will return an Account if the user is logged in, or false
     * if the user is not logged in.
     */
    Stormpath.prototype.getAccount = function () {
        return this.http.get('/me', new JsonGetOptions())
            .map(this.jsonParser)
            .map(this.accountTransformer)
            .catch(function (error) {
            if (error.status && error.status === 401) {
                return Observable_1.Observable.of(false);
            }
            if (error.status && error.status === 404) {
                return Observable_1.Observable.throw(new Error('/me endpoint not found, please check server configuration.'));
            }
            return Observable_1.Observable.throw(error);
        });
    };
    Stormpath.prototype.getRegistrationViewModel = function () {
        return this.http.get('/register', new JsonGetOptions())
            .map(this.jsonParser)
            .catch(this.errorTranslator);
    };
    /**
     * Attempts to register a new account by making a POST request to the
     * /register endpoint.
     *
     * @return {Observable<Account>}
     * An observable that will return an Account if the POST was successful.
     */
    Stormpath.prototype.register = function (form) {
        var observable = this.http.post('/register', JSON.stringify(form), new JsonPostOptions())
            .map(this.jsonParser)
            .map(this.accountTransformer)
            .catch(this.errorTranslator)
            .share();
        return observable;
    };
    Stormpath.prototype.login = function (form) {
        var _this = this;
        var observable = this.http.post('/login', JSON.stringify(form), new JsonPostOptions())
            .map(this.jsonParser)
            .map(this.accountTransformer)
            .catch(this.errorTranslator)
            .share();
        observable.subscribe(function (user) { return _this.userSource.next(user); }, function () { });
        return observable;
    };
    Stormpath.prototype.logout = function () {
        var _this = this;
        this.http.post('/logout', null, new JsonGetOptions())
            .catch(this.errorThrower)
            .subscribe(function () { return _this.userSource.next(false); });
    };
    Stormpath.prototype.resendVerificationEmail = function (request) {
        return this.http.post('/verify', JSON.stringify(request), new JsonPostOptions())
            .map(this.jsonParser)
            .catch(this.errorTranslator);
    };
    Stormpath.prototype.sendPasswordResetEmail = function (form) {
        return this.http.post('/forgot', JSON.stringify(form), new JsonPostOptions())
            .map(this.jsonParser)
            .catch(this.errorTranslator);
    };
    Stormpath.prototype.resetPassword = function (form) {
        return this.http.post('/change', JSON.stringify(form), new JsonPostOptions())
            .map(this.jsonParser)
            .catch(this.errorTranslator);
    };
    Stormpath.prototype.verifyEmailVerificationToken = function (sptoken) {
        return this.http.get('/verify?sptoken=' + sptoken, new JsonGetOptions())
            .map(this.jsonParser)
            .catch(this.errorTranslator);
    };
    Stormpath.prototype.verifyPasswordResetToken = function (sptoken) {
        return this.http.get('/change?sptoken=' + sptoken, new JsonGetOptions())
            .map(this.jsonParser)
            .catch(this.errorTranslator);
    };
    /**
     * Returns the JSON error from an HTTP response, or a generic error if the
     * response is not a JSON error
     * @param {any} error
     */
    Stormpath.prototype.errorTranslator = function (error) {
        var errorObject;
        try {
            errorObject = error.json();
        }
        catch (e) {
            console.error(error);
        }
        if (!errorObject || !errorObject.message) {
            errorObject = { message: 'Server Error', status: 0 };
        }
        return Observable_1.Observable.throw(errorObject);
    };
    Stormpath.prototype.errorThrower = function (error) {
        return Observable_1.Observable.throw(error);
    };
    Stormpath.prototype.accountTransformer = function (json) {
        if (json && json.account) {
            return new account_1.Account(json.account);
        }
        else {
            Observable_1.Observable.throw(new Error('expected an account response'));
        }
    };
    Stormpath.prototype.jsonParser = function (res) {
        if (res.text() === '') {
            return null;
        }
        try {
            return res.json();
        }
        catch (e) {
            throw new Error('Response was not JSON, check your server configuration');
        }
    };
    Stormpath = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Stormpath);
    return Stormpath;
}());
exports.Stormpath = Stormpath;
//# sourceMappingURL=stormpath.service.js.map