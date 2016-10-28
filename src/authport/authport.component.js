"use strict";
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
var core_2 = require('@angular/core');
var stormpath_service_1 = require('../stormpath/stormpath.service');
var AuthPortComponent = (function () {
    function AuthPortComponent(stormpath, loginService) {
        this.stormpath = stormpath;
        this.loginService = loginService;
        this.user$ = this.stormpath.user$;
        this.loggedIn$ = this.user$.map(function (user) { return !!user; });
    }
    AuthPortComponent.prototype.ngOnInit = function () {
        this.loginService.login = true;
        this.loginService.register = false;
        this.forgot = this.loginService.forgot;
        this.user$ = this.stormpath.user$;
        this.loggedIn$ = this.user$.map(function (user) { return !!user; });
    };
    AuthPortComponent.prototype.showLogin = function () {
        this.loginService.login = !(this.loginService.forgot = this.loginService.register = false);
        // this.flip(this.loginService.login, this.loginService.loginService.register);
    };
    AuthPortComponent.prototype.showRegister = function () {
        this.loginService.forgot = this.loginService.login = false;
        this.loginService.register = true;
        // this.flip(this.loginService.loginService.register, this.loginService.login);
    };
    AuthPortComponent.prototype.forgotPassword = function () {
        this.loginService.login = false;
        this.forgot = true;
    };
    AuthPortComponent.prototype.flip = function (a, b) {
        a = !(b = false);
    };
    AuthPortComponent.prototype.logout = function () {
        // this.stormpath.logout();
    };
    AuthPortComponent = __decorate([
        core_1.Component({
            selector: 'sp-authport',
            template: "\n      <div class=\"container\">\n        <br/>\n        <br/>\n\n\n        <div class=\"row\" *ngIf=\"(user$ | async) === false\">\n          <div class=\"col-xs-12 col-sm-offset-3 col-sm-6\">\n\n\n            <h1 class=\"text-center\">Hello</h1>\n\n            <br/>\n          </div>\n          <div class=\"col-xs-12 col-sm-offset-3 col-sm-6\">\n            <div class=\"panel panel-default\">\n              <div class=\"panel-heading\">\n                <h4>\n                  <ul class=\"nav nav-pills\">\n                    <li role=\"presentation\" [ngClass]=\"{active:loginService.login || loginService.forgot}\" (click)=\"showLogin()\"><a href=\"#\">Sign In</a></li>\n                    <li role=\"presentation\" [ngClass]=\"{active:loginService.register}\" (click)=\"showRegister()\" class=\"pull-right\"><a>Register</a></li>\n\n                  </ul>\n                </h4>\n              </div>\n              <div class=\"panel-body text-center\">\n                <div class=\"row\" *ngIf=\"loginService.forgot\">\n                  <forgot-password-form></forgot-password-form>\n                </div>\n                <div class=\"row\" *ngIf=\"loginService.login\">\n                  <div class=\"col-xs-12\">\n                    <login-form></login-form>\n                  </div>\n                </div>\n                <div class=\"row\" *ngIf=\"loginService.register\">\n                  <div class=\"col-xs-12\">\n                    <register-form autoLogin=true></register-form>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ",
            providers: [stormpath_service_1.LoginService]
        }),
        core_2.Injectable(), 
        __metadata('design:paramtypes', [stormpath_service_1.Stormpath, stormpath_service_1.LoginService])
    ], AuthPortComponent);
    return AuthPortComponent;
}());
exports.AuthPortComponent = AuthPortComponent;
//# sourceMappingURL=authport.component.js.map