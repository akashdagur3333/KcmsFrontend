"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DirectorMeetingComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var director_meeting_model_component_1 = require("src/app/Model/director-meeting-model/director-meeting-model.component");
var hr_meeting_model_component_1 = require("src/app/Model/hr-meeting-model/hr-meeting-model.component");
var sweetalert2_1 = require("sweetalert2");
var DirectorMeetingComponent = /** @class */ (function () {
    function DirectorMeetingComponent(dialog, api) {
        this.dialog = dialog;
        this.api = api;
        this.displayedColumns = ['id', 'hra_id', 'assign_to', 'invite_to', 'shift', 'start_time', 'end_time', 'location', 'name', 'description', 'hr_remarks', 'submit_by', 'action'];
    }
    DirectorMeetingComponent.prototype.ngOnInit = function () {
        this.getAllDirectorMeeting();
    };
    DirectorMeetingComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    DirectorMeetingComponent.prototype.getAllDirectorMeeting = function () {
        var _this = this;
        this.api.getAllDirectorMeeting().subscribe({
            next: function (res) {
                _this.dataSource = new table_1.MatTableDataSource(res);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
            },
            error: function (err) {
                console.log(err);
                sweetalert2_1["default"].fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: err
                });
            }
        });
    };
    DirectorMeetingComponent.prototype.OpenModel = function () {
        var _this = this;
        this.dialog.open(director_meeting_model_component_1.DirectorMeetingModelComponent, {
            width: '50%'
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllDirectorMeeting();
            }
        });
    };
    DirectorMeetingComponent.prototype.editMeeting = function (data) {
        var _this = this;
        this.dialog.open(hr_meeting_model_component_1.HrMeetingModelComponent, {
            width: '30%',
            data: data
        }).afterClosed().subscribe(function (val) {
            if (val == 'Update') {
                _this.getAllDirectorMeeting();
            }
        });
    };
    DirectorMeetingComponent.prototype.deleteMeeting = function (id) {
        var _this = this;
        this.api.deleteDirectorMeeting(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Director Meeting Deleted Successfully', 'success');
                _this.getAllDirectorMeeting();
            },
            error: function (err) {
                sweetalert2_1["default"].fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: err
                });
            }
        });
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], DirectorMeetingComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], DirectorMeetingComponent.prototype, "sort");
    DirectorMeetingComponent = __decorate([
        core_1.Component({
            selector: 'app-director-meeting',
            templateUrl: './director-meeting.component.html',
            styleUrls: ['./director-meeting.component.css']
        })
    ], DirectorMeetingComponent);
    return DirectorMeetingComponent;
}());
exports.DirectorMeetingComponent = DirectorMeetingComponent;
