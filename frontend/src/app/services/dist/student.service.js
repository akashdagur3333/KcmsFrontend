"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StudentService = void 0;
var core_1 = require("@angular/core");
var enviroment_1 = require("../enviroment");
var StudentService = /** @class */ (function () {
    function StudentService(http) {
        this.http = http;
        this.address = enviroment_1.environment.url;
    }
    StudentService.prototype.addStudents = function (data) {
        return this.http.post(this.address + 'students', data);
    };
    StudentService.prototype.getAllStudents = function () {
        return this.http.get(this.address + 'students');
    };
    StudentService.prototype.deleteStudents = function (id) {
        return this.http["delete"](this.address + 'students/' + id);
    };
    StudentService.prototype.updateStudents = function (id, data) {
        return this.http.put(this.address + 'students/' + id, data);
    };
    StudentService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StudentService);
    return StudentService;
}());
exports.StudentService = StudentService;
