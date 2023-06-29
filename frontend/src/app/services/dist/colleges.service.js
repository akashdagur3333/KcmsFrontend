"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CollegesService = void 0;
var core_1 = require("@angular/core");
var enviroment_1 = require("../enviroment");
var CollegesService = /** @class */ (function () {
    function CollegesService(http) {
        this.http = http;
        this.address = enviroment_1.environment.url;
    }
    CollegesService.prototype.addColleges = function (data) {
        return this.http.post(this.address + 'colleges', data);
    };
    CollegesService.prototype.getAllColleges = function () {
        return this.http.get(this.address + 'colleges');
    };
    CollegesService.prototype.deleteColleges = function (id) {
        return this.http["delete"](this.address + 'colleges/' + id);
    };
    CollegesService.prototype.updateColleges = function (id, data) {
        return this.http.put(this.address + 'colleges/' + id, data);
    };
    CollegesService.prototype.updateStatus = function (id, data) {
        return this.http.put('https://knocialindiagreatong.onrender.com/collegesStatus/' + id, data);
    };
    CollegesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CollegesService);
    return CollegesService;
}());
exports.CollegesService = CollegesService;
