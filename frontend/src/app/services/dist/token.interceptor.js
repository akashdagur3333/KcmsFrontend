"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TokenInterceptor = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(router) {
        this.router = router;
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        var token = localStorage.getItem('token');
        if (token) {
            request = request.clone({ setHeaders: { Authorization: 'Bearer' + ' ' + token } });
        }
        return next.handle(request).pipe(rxjs_1.catchError(function (err) {
            if (err instanceof http_1.HttpErrorResponse) {
                console.log(err.url);
            }
            if (err.status == 401 || err.status == 403) {
                if (_this.router.url === '/') { }
                else {
                    localStorage.clear();
                    _this.router.navigate(['/']);
                }
            }
            return rxjs_1.throwError(err);
        }));
    };
    TokenInterceptor = __decorate([
        core_1.Injectable()
    ], TokenInterceptor);
    return TokenInterceptor;
}());
exports.TokenInterceptor = TokenInterceptor;
