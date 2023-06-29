"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MainUserFullComponent = void 0;
var core_1 = require("@angular/core");
var jwt_decode_1 = require("jwt-decode");
var MainUserFullComponent = /** @class */ (function () {
    function MainUserFullComponent() {
    }
    MainUserFullComponent.prototype.ngOnInit = function () {
        var technical = document.getElementById('tech');
        var hr = document.getElementById('hrm');
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        var role = this.token.role;
        if (role == 'technical') {
            technical === null || technical === void 0 ? void 0 : technical.removeAttribute('hidden');
        }
        else if (role == 'hr') {
            hr === null || hr === void 0 ? void 0 : hr.removeAttribute('hidden');
        }
    };
    MainUserFullComponent = __decorate([
        core_1.Component({
            selector: 'app-main-user-full',
            templateUrl: './main-user-full.component.html',
            styleUrls: ['./main-user-full.component.css']
        })
    ], MainUserFullComponent);
    return MainUserFullComponent;
}());
exports.MainUserFullComponent = MainUserFullComponent;
