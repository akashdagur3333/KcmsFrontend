"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignupService = void 0;
var core_1 = require("@angular/core");
var enviroment_1 = require("../enviroment");
var SignupService = /** @class */ (function () {
    function SignupService(http) {
        this.http = http;
        this.address = enviroment_1.environment.url;
    }
    SignupService.prototype.loginUser = function (data) {
        return this.http.post(this.address + 'user/login', data);
    };
    SignupService.prototype.getIPAddress = function () {
        return this.http.get("http://api.ipify.org/?format=json");
    };
    SignupService.prototype.header = function () {
        var headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        return { headers: headers };
    };
    SignupService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SignupService);
    return SignupService;
}());
exports.SignupService = SignupService;
