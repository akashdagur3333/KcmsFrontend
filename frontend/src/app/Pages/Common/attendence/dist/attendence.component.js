"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AttendenceComponent = void 0;
var core_1 = require("@angular/core");
var daygrid_1 = require("@fullcalendar/daygrid");
var jwt_decode_1 = require("jwt-decode");
var AttendenceComponent = /** @class */ (function () {
    function AttendenceComponent(api) {
        this.api = api;
        this.EventData = [];
        this.getAllLoginStatus();
    }
    AttendenceComponent.prototype.ngOnInit = function () {
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.Data = this.token.rpt_id;
        this.getAllLoginStatus();
        this.calender();
    };
    AttendenceComponent.prototype.handleDateClick = function (args) {
        alert(args.event.title);
    };
    AttendenceComponent.prototype.getAllLoginStatus = function () {
        var _this = this;
        this.api.getAllStatus(this.Data).subscribe({
            next: function (res) {
                _this.data = res;
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    AttendenceComponent.prototype.calender = function () {
        this.calendarOptions = {
            initialView: 'dayGridMonth',
            plugins: [daygrid_1["default"]],
            selectable: true,
            eventClick: this.handleDateClick.bind(this)
        };
    };
    AttendenceComponent = __decorate([
        core_1.Component({
            selector: 'app-attendence',
            templateUrl: './attendence.component.html',
            styleUrls: ['./attendence.component.css']
        })
    ], AttendenceComponent);
    return AttendenceComponent;
}());
exports.AttendenceComponent = AttendenceComponent;
