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
var common_1 = require('@angular/common');
var stormpath_service_1 = require('../stormpath/stormpath.service');
var EmailVerificationComponent = (function () {
    function EmailVerificationComponent(stormpath, location) {
        this.stormpath = stormpath;
        this.location = location;
    }
    EmailVerificationComponent.prototype.ngOnInit = function () {
        this.verifying = false;
        this.verified = false;
        this.verificationFailed = false;
        this.sptoken = this.spTokenResolver();
        if (this.sptoken) {
            this.verify();
        }
    };
    EmailVerificationComponent.prototype.spTokenResolver = function () {
        return stormpath_service_1.defaultSpTokenResolver(this.location);
    };
    EmailVerificationComponent.prototype.verify = function () {
        var _this = this;
        this.verifying = true;
        this.stormpath.verifyEmailVerificationToken(this.sptoken)
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
    EmailVerificationComponent = __decorate([
        core_1.Component({
            selector: 'email-verification',
            template: "\n<div class=\"row\">\n  <div class=\"col-sm-offset-4 col-xs-12 col-sm-4\">\n    <p *ngIf=\"verifying\" class=\"alert alert-warning\">We are verifying your account</p>\n    <p *ngIf=\"verified\" class=\"alert alert-success\">\n      Your account has has been verified!  You may now login.\n    </p>\n    <div *ngIf=\"verificationFailed\" class=\"alert alert-danger\">\n      This email verification link is not valid.  Please request a new email verification link.\n    </div>\n    <p class=\"text-danger\" *ngIf=\"error\">{{error}}</p>\n  </div>\n</div>\n"
        }),
        core_2.Injectable(), 
        __metadata('design:paramtypes', [stormpath_service_1.Stormpath, common_1.Location])
    ], EmailVerificationComponent);
    return EmailVerificationComponent;
}());
exports.EmailVerificationComponent = EmailVerificationComponent;
;
//# sourceMappingURL=email-verification.component.js.map