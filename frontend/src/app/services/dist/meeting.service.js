"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MeetingService = void 0;
var core_1 = require("@angular/core");
var enviroment_1 = require("../enviroment");
var MeetingService = /** @class */ (function () {
    function MeetingService(http) {
        this.http = http;
        this.address = enviroment_1.environment.url;
    }
    MeetingService.prototype.addHrActivity = function (data) {
        return this.http.post(this.address + 'Activity', data);
    };
    MeetingService.prototype.getAllHrActivity = function () {
        return this.http.get(this.address + 'Activity');
    };
    MeetingService.prototype.deleteHrActivity = function (id) {
        return this.http["delete"](this.address + 'Activity/' + id);
    };
    MeetingService.prototype.updateHrActivity = function (id, data) {
        return this.http.put(this.address + 'Activity/' + id, data);
    };
    //HR Meeting
    MeetingService.prototype.addHrMeeting = function (data) {
        return this.http.post(this.address + 'HrMeeting', data);
    };
    MeetingService.prototype.getAllHrMeeting = function () {
        return this.http.get(this.address + 'HrMeeting');
    };
    MeetingService.prototype.deleteHrMeeting = function (id) {
        return this.http["delete"](this.address + 'HrMeeting/' + id);
    };
    MeetingService.prototype.updateHrMeeting = function (id, data) {
        return this.http.put(this.address + 'HrMeeting/' + id, data);
    };
    //Director Meeting
    MeetingService.prototype.addDirectorMeeting = function (data) {
        return this.http.post(this.address + 'DirectorMeeting', data);
    };
    MeetingService.prototype.getAllDirectorMeeting = function () {
        return this.http.get(this.address + 'DirectorMeeting');
    };
    MeetingService.prototype.deleteDirectorMeeting = function (id) {
        return this.http["delete"](this.address + 'DirectorMeeting/' + id);
    };
    MeetingService.prototype.updateDirectorMeeting = function (id, data) {
        return this.http.put(this.address + 'DirectorMeeting/' + id, data);
    };
    MeetingService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MeetingService);
    return MeetingService;
}());
exports.MeetingService = MeetingService;
