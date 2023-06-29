"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RouteGuardService = void 0;
var core_1 = require("@angular/core");
var jwt_decode_1 = require("jwt-decode");
var RouteGuardService = /** @class */ (function () {
    function RouteGuardService(router, auth) {
        this.router = router;
        this.auth = auth;
    }
    RouteGuardService.prototype.canActivate = function (route) {
        var expectedRoleArray = route.data;
        expectedRoleArray = expectedRoleArray['expectedRole'];
        var token = localStorage.getItem('token');
        var tokenPayload;
        //check token
        try {
            tokenPayload = jwt_decode_1["default"](token);
        }
        catch (err) {
            localStorage.clear();
            this.router.navigate(['/']);
        }
        //console.log(tokenPayload.role)
        //check role
        var checkRole = false;
        for (var i = 0; i <= expectedRoleArray['length']; i++) {
            if (expectedRoleArray[i] == tokenPayload.role) {
                checkRole = true;
            }
        }
        if (tokenPayload.role == 'user' || tokenPayload.role == 'admin' || tokenPayload.role == 'hr' || tokenPayload.role == 'technical' || tokenPayload.role == 'nadmin') {
            if (this.auth.isAuthenticated() && checkRole) {
                return true;
            }
            this.router.navigate(['/home']);
            return false;
        }
        else {
            this.router.navigate(['/']);
            localStorage.clear();
            return false;
        }
    };
    RouteGuardService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RouteGuardService);
    return RouteGuardService;
}());
exports.RouteGuardService = RouteGuardService;
