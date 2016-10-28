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
var common_1 = require('@angular/common');
var stormpath_service_1 = require('../stormpath/stormpath.service');
var ResetPasswordComponent = (function () {
    function ResetPasswordComponent(stormpath, location) {
        this.stormpath = stormpath;
        this.location = location;
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        this.verifying = false;
        this.verified = false;
        this.verificationFailed = false;
        this.formModel = {
            sptoken: this.spTokenResolver(),
            password: ''
        };
        // debugger
        if (this.formModel.sptoken) {
            this.verify();
        }
    };
    ResetPasswordComponent.prototype.spTokenResolver = function () {
        return stormpath_service_1.defaultSpTokenResolver(this.location);
    };
    ResetPasswordComponent.prototype.verify = function () {
        var _this = this;
        this.verifying = true;
        this.stormpath.verifyPasswordResetToken(this.formModel.sptoken)
            .subscribe(function () {
            _this.verifying = false;
            _this.verified = true;
        }, function (error) {
            _this.verifying = false;
            if (error.status && error.status === 404) {
                _this.verificationFailed = true;
            }
            else {
                _this.error = error.message;
            }
        });
    };
    ResetPasswordComponent.prototype.send = function () {
        var _this = this;
        this.stormpath.resetPassword(this.formModel)
            .subscribe(function () {
            _this.posting = false;
            _this.reset = true;
        }, function (error) {
            _this.posting = false;
            _this.error = error.message;
        });
    };
    ResetPasswordComponent.prototype.onSubmit = function () {
        this.send();
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            selector: 'reset-password',
            template: "\n<div class=\"row\">\n  <div class=\"col-sm-offset-4 col-xs-12 col-sm-4\">\n    <p *ngIf=\"verifying\" class=\"alert alert-warning text-center\">We are verifying your password reset link</p>\n    <p class=\"alert alert-success\" *ngIf=\"reset\">Your new password has been set, you may now login.</p>\n    <div *ngIf=\"verificationFailed\" class=\"alert alert-danger\">\n      This password reset link is not valid, please request a new reset link.\n    </div>\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-xs-12\">\n    <form class=\"form-horizontal\" *ngIf=\"verified && !reset\" (ngSubmit)=\"onSubmit()\">\n      <div class=\"form-group\">\n        <label for=\"spEmail\" class=\"col-xs-12 col-sm-4 control-label\">New Password</label>\n        <div class=\"col-xs-12 col-sm-4\">\n          <input class=\"form-control\" id=\"spUsername\" [(ngModel)]=\"formModel.password\" placeholder=\"New Password\" type=\"password\" [disabled]=\"posting\">\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"spEmail\" class=\"col-xs-12 col-sm-4 control-label\">Confirm New Password</label>\n        <div class=\"col-xs-12 col-sm-4\">\n          <input class=\"form-control\" id=\"spUsername\" [(ngModel)]=\"formModel.confirmPassword\" placeholder=\"Confirm New Password\" type=\"password\" [disabled]=\"posting\">\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <div class=\"col-sm-offset-4 col-sm-4\">\n          <p class=\"alert alert-danger\" *ngIf=\"error\">{{error}}</p>\n          <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"posting\">Set New Password</button>\n        </div>\n      </div>\n    </form>\n  </div>\n</div>\n\n"
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [stormpath_service_1.Stormpath, common_1.Location])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;
;
//# sourceMappingURL=reset-password.component.js.map