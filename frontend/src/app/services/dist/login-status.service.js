"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginStatusService = void 0;
var core_1 = require("@angular/core");
var enviroment_1 = require("../enviroment");
var LoginStatusService = /** @class */ (function () {
    function LoginStatusService(http) {
        this.http = http;
        this.address = enviroment_1.environment.url;
    }
    LoginStatusService.prototype.updateLoginStatus = function (id, data) {
        return this.http.put(this.address + 'updateloginStatus/' + id, data);
    };
    LoginStatusService.prototype.getTotalActive = function (id) {
        return this.http.get(this.address + 'getTotalActive/' + id);
    };
    LoginStatusService.prototype.getAllStatus = function (id) {
        return this.http.get(this.address + 'getUserStatus/' + id);
    };
    LoginStatusService.prototype.getPersonalStatus = function (id) {
        return this.http.get(this.address + 'getUserSingleStatus/' + id);
    };
    LoginStatusService.prototype.converter = function (data) {
        var second = Math.floor(data % 60);
        var minute = Math.floor((data / 60) % 60);
        var hour = Math.floor((data / (60 * 60)));
        return hour + 'H ' + minute + 'M ' + second + 'S';
    };
    LoginStatusService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LoginStatusService);
    return LoginStatusService;
}());
exports.LoginStatusService = LoginStatusService;
