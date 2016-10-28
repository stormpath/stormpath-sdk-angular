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
var stormpath_service_1 = require('../stormpath/stormpath.service');
var ResendEmailVerificationComponent = (function () {
    function ResendEmailVerificationComponent(stormpath) {
        this.stormpath = stormpath;
    }
    ResendEmailVerificationComponent.prototype.ngOnInit = function () {
        this.posting = false;
        this.sent = false;
        this.formModel = {
            login: ''
        };
    };
    ResendEmailVerificationComponent.prototype.send = function () {
        var _this = this;
        this.posting = true;
        this.stormpath.resendVerificationEmail(this.formModel)
            .subscribe(function () {
            _this.posting = false;
            _this.sent = true;
        }, function (error) {
            _this.posting = false;
            _this.error = error.message;
        });
    };
    ResendEmailVerificationComponent.prototype.onSubmit = function () {
        this.send();
    };
    ResendEmailVerificationComponent = __decorate([
        core_1.Component({
            selector: 'resend-email-verification',
            template: "\n<div class=\"row\">\n  <div class=\"col-sm-offset-4 col-xs-12 col-sm-4\">\n\n    <p *ngIf=\"sent\" class=\"alert alert-success\">\n      We have sent a new verification message to your email address, please check your email for this message.\n    </p>\n\n    <p class=\"text-danger\" *ngIf=\"error\">{{error}}</p>\n  </div>\n</div>\n\n<div class=\"row\">\n  <div class=\"col-xs-12\">\n    <form class=\"form-horizontal\" *ngIf=\"!sent\" (ngSubmit)=\"onSubmit()\">\n\n      <div class=\"form-group\">\n        <label for=\"spEmail\" class=\"col-xs-12 col-sm-4 control-label\">Email address</label>\n        <div class=\"col-xs-12 col-sm-4\">\n          <input class=\"form-control\" id=\"spUsername\" [(ngModel)]=\"formModel.login\" [disabled]=\"posting\">\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <div class=\"col-sm-offset-4 col-xs-12\">\n          <p class=\"text-danger\" *ngIf=\"error\">{{error}}</p>\n          <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"posting\">Re-Send Verification</button>\n        </div>\n      </div>\n    </form>\n  </div>\n</div>\n  "
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [stormpath_service_1.Stormpath])
    ], ResendEmailVerificationComponent);
    return ResendEmailVerificationComponent;
}());
exports.ResendEmailVerificationComponent = ResendEmailVerificationComponent;
;
//# sourceMappingURL=resend-email-verification.js.map