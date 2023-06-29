"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.QuesrionService = void 0;
var core_1 = require("@angular/core");
var enviroment_1 = require("../enviroment");
var QuesrionService = /** @class */ (function () {
    function QuesrionService(http) {
        this.http = http;
        this.address = enviroment_1.environment.url;
    }
    QuesrionService.prototype.addQuestion = function (data) {
        return this.http.post(this.address + 'question', data);
    };
    QuesrionService.prototype.getAllQuestion = function () {
        return this.http.get(this.address + 'question');
    };
    QuesrionService.prototype.deleteQuestion = function (id) {
        return this.http["delete"](this.address + 'question/' + id);
    };
    QuesrionService.prototype.addTest = function (data) {
        return this.http.post(this.address + 'trainingTest', data);
    };
    QuesrionService.prototype.getAllTest = function () {
        return this.http.get(this.address + 'trainingTest');
    };
    QuesrionService.prototype.deleteTest = function (id) {
        return this.http["delete"](this.address + 'trainingTest/' + id);
    };
    QuesrionService.prototype.updateTest = function (id, data) {
        return this.http.put(this.address + 'trainingTest/' + id, data);
    };
    QuesrionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], QuesrionService);
    return QuesrionService;
}());
exports.QuesrionService = QuesrionService;
