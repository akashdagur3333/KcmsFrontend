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
exports.AttendenceTableDetailComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var all_records_attendence_model_component_1 = require("../all-records-attendence-model/all-records-attendence-model.component");
var AttendenceTableDetailComponent = /** @class */ (function () {
    function AttendenceTableDetailComponent(api, Data, dialog) {
        this.api = api;
        this.Data = Data;
        this.dialog = dialog;
        this.displayedColumns = ['id', '_id', 'rpt_id', 'name', 'date', 'action'];
    }
    AttendenceTableDetailComponent.prototype.ngOnInit = function () {
        this.getAllLoginStatus();
    };
    AttendenceTableDetailComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    AttendenceTableDetailComponent.prototype.getAllLoginStatus = function () {
        var _this = this;
        this.api.getPersonalStatus(this.Data._id).subscribe({
            next: function (res) {
                res.reverse();
                _this.dataSource = new table_1.MatTableDataSource(res);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
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
    AttendenceTableDetailComponent.prototype.AllRecords = function (data) {
        this.dialog.open(all_records_attendence_model_component_1.AllRecordsAttendenceModelComponent, {
            width: '50%',
            height: '70%',
            data: data
        });
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], AttendenceTableDetailComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], AttendenceTableDetailComponent.prototype, "sort");
    AttendenceTableDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-attendence-table-detail',
            templateUrl: './attendence-table-detail.component.html',
            styleUrls: ['./attendence-table-detail.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AttendenceTableDetailComponent);
    return AttendenceTableDetailComponent;
}());
exports.AttendenceTableDetailComponent = AttendenceTableDetailComponent;
