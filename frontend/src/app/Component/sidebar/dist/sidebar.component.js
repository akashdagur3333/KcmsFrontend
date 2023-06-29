"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SidebarComponent = void 0;
var core_1 = require("@angular/core");
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent() {
    }
    SidebarComponent.prototype.hrOpen = function () {
        var x = document.getElementById("hrm");
        if ((x === null || x === void 0 ? void 0 : x.classList.value) == 'menu-item has-sub inactive') {
            x === null || x === void 0 ? void 0 : x.classList.replace('inactive', 'active');
        }
        else {
            x === null || x === void 0 ? void 0 : x.classList.replace('active', 'inactive');
        }
    };
    SidebarComponent.prototype.getiddata = function () {
        this.value = document.getElementById("hrm");
    };
    SidebarComponent.prototype.openReporting = function () {
        var x = document.getElementById("hrm2");
        x === null || x === void 0 ? void 0 : x.classList.add('active');
    };
    SidebarComponent.prototype.openhrm = function (id) {
        var x = document.getElementById(id);
        // this.value?.classList.replace('inactive','active')
        // this.value?.classList.add('expand')
        x === null || x === void 0 ? void 0 : x.classList.add('active');
        console.log(x === null || x === void 0 ? void 0 : x.classList.value);
    };
    SidebarComponent.prototype.openplacement = function () {
        var x = document.getElementById("hrm1");
        x === null || x === void 0 ? void 0 : x.classList.add('active');
    };
    SidebarComponent.prototype.openEmpStatus = function () {
        var x = document.getElementById("hrm3");
        x === null || x === void 0 ? void 0 : x.classList.add('active');
    };
    SidebarComponent.prototype.clientOpen = function () {
        var x = document.getElementById("client");
        if ((x === null || x === void 0 ? void 0 : x.classList.value) == 'menu-item has-sub inactive') {
            x === null || x === void 0 ? void 0 : x.classList.replace('inactive', 'active');
        }
        else {
            x === null || x === void 0 ? void 0 : x.classList.replace('active', 'inactive');
        }
    };
    SidebarComponent.prototype.techOpen = function () {
        var x = document.getElementById("tech");
        if ((x === null || x === void 0 ? void 0 : x.classList.value) == 'menu-item has-sub inactive') {
            x === null || x === void 0 ? void 0 : x.classList.replace('inactive', 'active');
        }
        else {
            x === null || x === void 0 ? void 0 : x.classList.replace('active', 'inactive');
        }
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.css']
        })
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
