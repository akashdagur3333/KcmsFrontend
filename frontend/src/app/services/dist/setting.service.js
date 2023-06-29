"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SettingService = void 0;
var core_1 = require("@angular/core");
var enviroment_1 = require("../enviroment");
var SettingService = /** @class */ (function () {
    function SettingService(http) {
        this.http = http;
        this.address = enviroment_1.environment.url;
    }
    //location
    SettingService.prototype.addLocation = function (data) {
        return this.http.post(this.address + 'location', data);
    };
    SettingService.prototype.getAllLocation = function () {
        return this.http.get(this.address + 'location');
    };
    SettingService.prototype.deleteLocation = function (id) {
        return this.http["delete"](this.address + 'location/' + id);
    };
    SettingService.prototype.updateLocation = function (id, data) {
        return this.http.put(this.address + 'location/' + id, data);
    };
    //financial
    SettingService.prototype.addFinancial = function (data) {
        return this.http.post(this.address + 'financial', data);
    };
    SettingService.prototype.getAllFinancial = function () {
        return this.http.get(this.address + 'financial');
    };
    SettingService.prototype.deleteFinancial = function (id) {
        return this.http["delete"](this.address + 'financial/' + id);
    };
    SettingService.prototype.updateFinancial = function (id, data) {
        return this.http.put(this.address + 'financial/' + id, data);
    };
    //department
    SettingService.prototype.addDepartment = function (data) {
        return this.http.post(this.address + 'department', data);
    };
    SettingService.prototype.getAllDepartment = function () {
        return this.http.get(this.address + 'department');
    };
    SettingService.prototype.deleteDepartment = function (id) {
        return this.http["delete"](this.address + 'department/' + id);
    };
    SettingService.prototype.updateDepartment = function (id, data) {
        return this.http.put(this.address + 'department/' + id, data);
    };
    //Sub department
    SettingService.prototype.addSubDepartment = function (data) {
        return this.http.post(this.address + 'sub_department', data);
    };
    SettingService.prototype.getAllSubdepartment = function () {
        return this.http.get(this.address + 'sub_department');
    };
    SettingService.prototype.deleteSubdepartment = function (id) {
        return this.http["delete"](this.address + 'sub_department/' + id);
    };
    SettingService.prototype.updateSubdepartment = function (id, data) {
        return this.http.put(this.address + 'sub_department/' + id, data);
    };
    //designation
    SettingService.prototype.addDesignation = function (data) {
        return this.http.post(this.address + 'designation', data);
    };
    SettingService.prototype.getAllDesignation = function () {
        return this.http.get(this.address + 'designation');
    };
    SettingService.prototype.deleteDesignation = function (id) {
        return this.http["delete"](this.address + 'designation/' + id);
    };
    SettingService.prototype.updateDesignation = function (id, data) {
        return this.http.put(this.address + 'designation/' + id, data);
    };
    //Qualification
    SettingService.prototype.addQualification = function (data) {
        return this.http.post(this.address + 'qualification', data);
    };
    SettingService.prototype.getAllQualification = function () {
        return this.http.get(this.address + 'qualification');
    };
    SettingService.prototype.deleteQualification = function (id) {
        return this.http["delete"](this.address + 'qualification/' + id);
    };
    SettingService.prototype.updateQualification = function (id, data) {
        return this.http.put(this.address + 'qualification/' + id, data);
    };
    //package
    SettingService.prototype.addPackage = function (data) {
        return this.http.post(this.address + 'package', data);
    };
    SettingService.prototype.getAllPackage = function () {
        return this.http.get(this.address + 'package');
    };
    SettingService.prototype.deletePackage = function (id) {
        return this.http["delete"](this.address + 'package/' + id);
    };
    SettingService.prototype.updatePackage = function (id, data) {
        return this.http.put(this.address + 'package/' + id, data);
    };
    //shift
    SettingService.prototype.addShift = function (data) {
        return this.http.post(this.address + 'shift', data);
    };
    SettingService.prototype.getAllShift = function () {
        return this.http.get(this.address + 'shift');
    };
    SettingService.prototype.deleteShift = function (id) {
        return this.http["delete"](this.address + 'shift/' + id);
    };
    SettingService.prototype.updateShift = function (id, data) {
        return this.http.put(this.address + 'shift/' + id, data);
    };
    //vsrValue
    SettingService.prototype.addVsrvalue = function (data) {
        return this.http.post(this.address + 'vsrValue', data);
    };
    SettingService.prototype.getAllVsrValue = function () {
        return this.http.get(this.address + 'vsrValue');
    };
    SettingService.prototype.deleteVsrvalue = function (id) {
        return this.http["delete"](this.address + 'vsrValue/' + id);
    };
    SettingService.prototype.UpdateVsrValue = function (id, data) {
        return this.http.put(this.address + 'vsrValue/' + id, data);
    };
    //ledger
    SettingService.prototype.addLedger = function (data) {
        return this.http.post(this.address + 'ledger', data);
    };
    SettingService.prototype.getAllLedger = function () {
        return this.http.get(this.address + 'ledger');
    };
    SettingService.prototype.deleteLedger = function (id) {
        return this.http["delete"](this.address + 'ledger/' + id);
    };
    SettingService.prototype.updateLedger = function (id, data) {
        return this.http.put(this.address + 'ledger/' + id, data);
    };
    //stream
    SettingService.prototype.addStream = function (data) {
        return this.http.post(this.address + 'stream', data);
    };
    SettingService.prototype.getAllStream = function () {
        return this.http.get(this.address + 'stream');
    };
    SettingService.prototype.deleteStream = function (id) {
        return this.http["delete"](this.address + 'stream/' + id);
    };
    SettingService.prototype.updateStream = function (id, data) {
        return this.http.put(this.address + 'stream/' + id, data);
    };
    //batch size
    SettingService.prototype.addBatchSize = function (data) {
        return this.http.post(this.address + 'batchSize', data);
    };
    SettingService.prototype.getAllBatchSize = function () {
        return this.http.get(this.address + 'batchSize');
    };
    SettingService.prototype.deleteBatchSize = function (id) {
        return this.http["delete"](this.address + 'batchSize/' + id);
    };
    SettingService.prototype.updateBatchSize = function (id, data) {
        return this.http.put(this.address + 'batchSize/' + id, data);
    };
    //trainer
    SettingService.prototype.addTrainer = function (data) {
        return this.http.post(this.address + 'trainer', data);
    };
    SettingService.prototype.getAllTrainer = function () {
        return this.http.get(this.address + 'trainer');
    };
    SettingService.prototype.deleteTrainer = function (id) {
        return this.http["delete"](this.address + 'trainer/' + id);
    };
    SettingService.prototype.updateTrainer = function (id, data) {
        return this.http.put(this.address + 'trainer/' + id, data);
    };
    //relieving
    SettingService.prototype.addRelieving = function (data) {
        return this.http.post(this.address + 'relieving', data);
    };
    SettingService.prototype.getAllRelieving = function () {
        return this.http.get(this.address + 'relieving');
    };
    SettingService.prototype.deleteRelieving = function (id) {
        return this.http["delete"](this.address + 'relieving/' + id);
    };
    SettingService.prototype.updateRelieving = function (id, data) {
        return this.http.put(this.address + 'relieving/' + id, data);
    };
    SettingService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SettingService);
    return SettingService;
}());
exports.SettingService = SettingService;
