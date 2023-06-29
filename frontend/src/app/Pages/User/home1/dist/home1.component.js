"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Home1Component = void 0;
var core_1 = require("@angular/core");
var Home1Component = /** @class */ (function () {
    function Home1Component() {
    }
    Home1Component.prototype.ngOnInit = function () {
        var header = document.getElementById('header');
        var sidebar = document.getElementById('sidebar');
        header === null || header === void 0 ? void 0 : header.setAttribute('hidden', '');
        sidebar === null || sidebar === void 0 ? void 0 : sidebar.setAttribute('hidden', '');
    };
    Home1Component = __decorate([
        core_1.Component({
            selector: 'app-home1',
            templateUrl: './home1.component.html',
            styleUrls: ['./home1.component.css']
        })
    ], Home1Component);
    return Home1Component;
}());
exports.Home1Component = Home1Component;
