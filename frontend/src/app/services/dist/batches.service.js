"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BatchesService = void 0;
var core_1 = require("@angular/core");
var enviroment_1 = require("../enviroment");
var BatchesService = /** @class */ (function () {
    function BatchesService(http) {
        this.http = http;
        this.address = enviroment_1.environment.url;
    }
    BatchesService.prototype.addBatches = function (data) {
        return this.http.post(this.address + 'training_batches', data);
    };
    BatchesService.prototype.getAllBateches = function () {
        return this.http.get(this.address + 'training_batches');
    };
    BatchesService.prototype.deleteBatches = function (id) {
        return this.http["delete"](this.address + 'training_batches/' + id);
    };
    BatchesService.prototype.updateBatches = function (id, data) {
        return this.http.put(this.address + 'training_batches/' + id, data);
    };
    BatchesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BatchesService);
    return BatchesService;
}());
exports.BatchesService = BatchesService;
