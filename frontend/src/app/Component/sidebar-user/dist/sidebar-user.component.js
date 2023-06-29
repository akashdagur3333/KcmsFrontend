"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SidebarUserComponent = void 0;
var core_1 = require("@angular/core");
var SidebarUserComponent = /** @class */ (function () {
    function SidebarUserComponent() {
    }
    SidebarUserComponent.prototype.techOpen = function () {
        var x = document.getElementById("tech");
        console.log(x === null || x === void 0 ? void 0 : x.classList[2]);
        if ((x === null || x === void 0 ? void 0 : x.classList[2]) == 'active') {
            x === null || x === void 0 ? void 0 : x.classList.replace('active', 'inactive');
        }
        else {
            x === null || x === void 0 ? void 0 : x.classList.replace('inactive', 'active');
            console.log(x === null || x === void 0 ? void 0 : x.classList);
        }
    };
    SidebarUserComponent.prototype.hrOpen = function () {
        var x = document.getElementById("hrm");
        if ((x === null || x === void 0 ? void 0 : x.classList.value) == 'menu-item has-sub inactive') {
            x === null || x === void 0 ? void 0 : x.classList.replace('inactive', 'active');
        }
        else {
            x === null || x === void 0 ? void 0 : x.classList.replace('active', 'inactive');
        }
    };
    SidebarUserComponent.prototype.getiddata = function () {
        this.value = document.getElementById("hrm");
    };
    SidebarUserComponent.prototype.openReporting = function () {
        var x = document.getElementById("hrm2");
        x === null || x === void 0 ? void 0 : x.classList.add('active');
    };
    SidebarUserComponent.prototype.openhrm = function (id) {
        var x = document.getElementById(id);
        // this.value?.classList.replace('inactive','active')
        // this.value?.classList.add('expand')
        x === null || x === void 0 ? void 0 : x.classList.add('active');
        console.log(x === null || x === void 0 ? void 0 : x.classList.value);
    };
    SidebarUserComponent.prototype.openplacement = function () {
        var x = document.getElementById("hrm1");
        x === null || x === void 0 ? void 0 : x.classList.add('active');
    };
    SidebarUserComponent.prototype.openEmpStatus = function () {
        var x = document.getElementById("hrm3");
        x === null || x === void 0 ? void 0 : x.classList.add('active');
    };
    SidebarUserComponent = __decorate([
        core_1.Component({
            selector: 'app-sidebar-user',
            templateUrl: './sidebar-user.component.html',
            styleUrls: ['./sidebar-user.component.css']
        })
    ], SidebarUserComponent);
    return SidebarUserComponent;
}());
exports.SidebarUserComponent = SidebarUserComponent;
