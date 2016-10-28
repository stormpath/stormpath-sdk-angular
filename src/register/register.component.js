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
var RegisterComponent = (function () {
    function RegisterComponent(stormpath) {
        this.stormpath = stormpath;
        this.unverified = false;
        this.canLogin = false;
        this.formModel = {
            email: 'robert+2@stormpath.com',
            surname: 'robert',
            givenName: 'robert',
            password: 'robert@stormpath.comA1'
        };
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.formModel = {};
        this.stormpath.getRegistrationViewModel()
            .subscribe(function (model) {
            _this.model = model;
        }, function (error) {
            return _this.error = error.message;
        });
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.stormpath.register(this.formModel)
            .subscribe(function (account) {
            _this.registered = true;
            _this.unverified = account.status === 'UNVERIFIED';
            _this.canLogin = account.status === 'ENABLED';
            if (_this.canLogin && _this.autoLogin) {
                var loginAttempt = {
                    login: _this.formModel.email,
                    password: _this.formModel.password
                };
                _this.stormpath.login(loginAttempt);
            }
        }, function (error) { return _this.error = error.message; });
    };
    RegisterComponent.prototype.onSubmit = function () {
        this.register();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RegisterComponent.prototype, "autoLogin", void 0);
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'register-form',
            template: "\n    <form *ngIf=\"!registered\" (ngSubmit)=\"onSubmit()\" class=\"form-horizontal\">\n      <div class=\"form-group\" *ngFor=\"let field of model?.form?.fields\">\n        <label [attr.for]=\"field.name\" class=\"col-sm-4 control-label\">{{field.label}}</label>\n        <div class=\"col-sm-8\">\n          <input class=\"form-control\" [name]=\"field.name\" [id]=\"field.name\" [type]=\"field.type\" [(ngModel)]=\"formModel[field.name]\" [placeholder]=\"field.placeholder\" [disabled]=\"creating\" [required]=\"field.required\">\n        </div>\n      </div>\n      <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n      <button type=\"submit\" class=\"btn btn-primary\">Register</button>\n    </form>\n    <p *ngIf=\"unverified\" class=\"alert alert-success\">\n      Your account has been created and requires verification.\n      Please check your email for a verification link.\n    </p>\n    <p class=\"alert alert-success\" *ngIf=\"canLogin\">\n      Your account has been created, you may now log in.\n    </p>\n  "
        }),
        core_2.Injectable(), 
        __metadata('design:paramtypes', [stormpath_service_1.Stormpath])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
;
//# sourceMappingURL=register.component.js.map