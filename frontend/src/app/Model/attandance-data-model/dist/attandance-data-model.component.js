"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AttandanceDataModelComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var daygrid_1 = require("@fullcalendar/daygrid");
var AttandanceDataModelComponent = /** @class */ (function () {
    function AttandanceDataModelComponent(api, Data) {
        this.api = api;
        this.Data = Data;
        this.EventData = [];
        this.getAllLoginStatus();
    }
    AttandanceDataModelComponent.prototype.ngOnInit = function () {
        this.getAllLoginStatus();
        this.calender();
    };
    AttandanceDataModelComponent.prototype.handleDateClick = function (args) {
        alert(args.event.title);
    };
    AttandanceDataModelComponent.prototype.getAllLoginStatus = function () {
        var _this = this;
        this.api.getAllStatus(this.Data._id).subscribe({
            next: function (res) {
                _this.data = res;
                //  this.EventData.push(res)
                //   this.EventData.map((X:any)=>{
                //     X.date=moment(X.date).format('YYYY-MM-DD')
                //     this.data={
                //       title:'mohit',
                //       date:'2023-06-16'
                //     }
                //   })
            },
            error: function (err) {
                console.log(err);
            }
        });
        // this.Events.push({
        //   title:'mohit',
        //   date:'2023-06-16'
        // })
    };
    AttandanceDataModelComponent.prototype.calender = function () {
        this.calendarOptions = {
            initialView: 'dayGridMonth',
            plugins: [daygrid_1["default"]],
            selectable: true,
            events: this.Events,
            eventClick: this.handleDateClick.bind(this)
        };
    };
    AttandanceDataModelComponent = __decorate([
        core_1.Component({
            selector: 'app-attandance-data-model',
            templateUrl: './attandance-data-model.component.html',
            styleUrls: ['./attandance-data-model.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AttandanceDataModelComponent);
    return AttandanceDataModelComponent;
}());
exports.AttandanceDataModelComponent = AttandanceDataModelComponent;
