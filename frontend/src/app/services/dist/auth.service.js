"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var enviroment_1 = require("../enviroment");
var AuthService = /** @class */ (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
        //https://knocialindiagreatong.onrender.com/
        // http://3.7.133.163:3000/
        this.address = enviroment_1.environment.url;
    }
    AuthService.prototype.adduserData = function (data) {
        return this.http.post(this.address + 'user/register', data);
    };
    AuthService.prototype.alluser = function () {
        return this.http.get(this.address + 'user/alluser');
    };
    AuthService.prototype.deleteUser = function (id, data) {
        return this.http["delete"](this.address + 'user/deleteuser/' + id, data);
    };
    AuthService.prototype.updateUser = function (id, data) {
        return this.http.put(this.address + 'user/updateUser/' + id, data);
    };
    AuthService.prototype.checkToken = function () {
        this.token = localStorage.getItem('token');
        return this.http.get(this.address + 'user/checkToken', { headers: new http_1.HttpHeaders().set('Authorization', this.token) });
    };
    AuthService.prototype.isAuthenticated = function () {
        var token = localStorage.getItem('token');
        if (!token) {
            this.router.navigate(['/']);
            return false;
        }
        else {
            return true;
        }
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
