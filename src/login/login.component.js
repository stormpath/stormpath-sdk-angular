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
var LoginComponent = (function () {
    function LoginComponent(stormpath, loginService) {
        this.stormpath = stormpath;
        this.loginService = loginService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.user$ = this.stormpath.user$;
        this.loggedIn$ = this.user$.map(function (user) { return !!user; });
        this.loginFormModel = {
            login: 'robert@stormpath.com',
            password: 'robert@stormpath.comA'
        };
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.error = null;
        this.stormpath.login(this.loginFormModel)
            .subscribe(null, function (error) {
            _this.error = error.message;
        });
    };
    LoginComponent.prototype.forgot = function () {
        this.loginService.forgotPassword();
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-form',
            template: "\n    <form class=\"form-horizontal\">\n      <div class=\"form-group\">\n        <label for=\"loginField\" class=\"col-sm-3 control-label\">Email</label>\n        <div class=\"col-sm-9\">\n          <input class=\"form-control\" id=\"loginField\" type=\"text\" [(ngModel)]=\"loginFormModel.login\">\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"passwordField\" class=\"col-sm-3 control-label\">Password</label>\n        <div class=\"col-sm-9\">\n          <input class=\"form-control\" id=\"passwordField\" type=\"password\" [(ngModel)]=\"loginFormModel.password\">\n        </div>\n      </div>\n\n\n      <div class=\"form-group\">\n\n        <div class=\"col-xs-10 col-xs-offset-3 text-left\">\n          <a href=\"#\" (click)=\"forgot()\">&nbsp;Forgot Password?</a>\n        </div>\n      </div>\n\n\n      <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n      <button (click)=\"login()\" class=\"btn btn-primary pull-right\">Login</button>\n    </form>\n  "
        }),
        core_2.Injectable(), 
        __metadata('design:paramtypes', [stormpath_service_1.Stormpath, stormpath_service_1.LoginService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
;
//# sourceMappingURL=login.component.js.map