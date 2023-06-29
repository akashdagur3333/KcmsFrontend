"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReportingService = void 0;
var core_1 = require("@angular/core");
var enviroment_1 = require("../enviroment");
var ReportingService = /** @class */ (function () {
    function ReportingService(http) {
        this.http = http;
        this.address = enviroment_1.environment.url;
    }
    ReportingService.prototype.validate = function (data) {
        return this.http.post(this.address + 'validate', data);
    };
    ReportingService.prototype.addReporting = function (data) {
        return this.http.post(this.address + 'reporting', data);
    };
    ReportingService.prototype.getAllReporting = function () {
        return this.http.get(this.address + 'reporting');
    };
    ReportingService.prototype.deleteReporting = function (id) {
        return this.http["delete"](this.address + 'reporting/' + id);
    };
    ReportingService.prototype.updateReporting = function (id, data) {
        return this.http.put(this.address + 'reporting/' + id, data);
    };
    ReportingService.prototype.updatePendingValue = function (id, data) {
        return this.http.put(this.address + 'reporting/Pending_value/' + id, data);
    };
    ReportingService.prototype.updateJobStatus = function (id, data) {
        return this.http.put(this.address + 'reporting/JobStatus/' + id, data);
    };
    //reciept
    ReportingService.prototype.addReciept = function (data) {
        return this.http.post(this.address + 'reciept', data);
    };
    ReportingService.prototype.getAllReciept = function () {
        return this.http.get(this.address + 'reciept');
    };
    ReportingService.prototype.deleteReciept = function (id) {
        return this.http["delete"](this.address + 'reciept/' + id);
    };
    //fine
    ReportingService.prototype.addFine = function (data) {
        return this.http.post(this.address + 'fine', data);
    };
    ReportingService.prototype.getAllFine = function () {
        return this.http.get(this.address + 'fine');
    };
    ReportingService.prototype.deleteFine = function (id) {
        return this.http["delete"](this.address + 'fine/' + id);
    };
    //other
    ReportingService.prototype.addOther = function (data) {
        return this.http.post(this.address + 'other', data);
    };
    ReportingService.prototype.getAllOther = function () {
        return this.http.get(this.address + 'other');
    };
    ReportingService.prototype.deleteOther = function (id) {
        return this.http["delete"](this.address + 'other/' + id);
    };
    //fineWaiver
    ReportingService.prototype.addFineWaiver = function (data) {
        return this.http.post(this.address + 'fineWaiver', data);
    };
    ReportingService.prototype.getAllFineWaiver = function () {
        return this.http.get(this.address + 'fineWaiver');
    };
    ReportingService.prototype.deleteFineWaiver = function (id) {
        return this.http["delete"](this.address + 'fineWaiver/' + id);
    };
    //otherWaiver 
    ReportingService.prototype.addOtherWaiver = function (data) {
        return this.http.post(this.address + 'otherWaiver', data);
    };
    ReportingService.prototype.getAllOtherWaiver = function () {
        return this.http.get(this.address + 'otherWaiver');
    };
    ReportingService.prototype.deleteOtherWaiver = function (id) {
        return this.http["delete"](this.address + 'otherWaiver/' + id);
    };
    //vsrWaiver
    ReportingService.prototype.addVSRWaiver = function (data) {
        return this.http.post(this.address + 'vsrWaiver', data);
    };
    ReportingService.prototype.getAllVSRWaiver = function () {
        return this.http.get(this.address + 'vsrWaiver');
    };
    ReportingService.prototype.deleteVSRWaiver = function (id) {
        return this.http["delete"](this.address + 'vsrWaiver/' + id);
    };
    ReportingService.prototype.Total = function (pending, amount) {
        return pending - amount;
    };
    ReportingService.prototype.calGST = function (value) {
        var cal = (value / 118) * 100;
        return this.roundUp(value - cal, 1);
    };
    ReportingService.prototype.roundUp = function (num, precision) {
        precision = Math.pow(1, precision);
        return Math.ceil(num * precision) / precision;
    };
    ReportingService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ReportingService);
    return ReportingService;
}());
exports.ReportingService = ReportingService;
