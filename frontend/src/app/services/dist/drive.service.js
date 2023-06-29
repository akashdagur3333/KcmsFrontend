"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DriveService = void 0;
var core_1 = require("@angular/core");
var enviroment_1 = require("../enviroment");
var DriveService = /** @class */ (function () {
    function DriveService(http) {
        this.http = http;
        this.address = enviroment_1.environment.url;
    }
    DriveService.prototype.addDrives = function (data) {
        return this.http.post(this.address + 'drives', data);
    };
    DriveService.prototype.getAllDrives = function () {
        return this.http.get(this.address + 'drives');
    };
    DriveService.prototype.deleteDrives = function (id) {
        return this.http["delete"](this.address + 'drives/' + id);
    };
    DriveService.prototype.updateDrives = function (id, data) {
        return this.http.put(this.address + 'drives/' + id, data);
    };
    DriveService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DriveService);
    return DriveService;
}());
exports.DriveService = DriveService;
