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
exports.AllRecordsAttendenceModelComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var AllRecordsAttendenceModelComponent = /** @class */ (function () {
    function AllRecordsAttendenceModelComponent(api, Data, dialog) {
        this.api = api;
        this.Data = Data;
        this.dialog = dialog;
        this.displayedColumns = ['id', 'date', 'loginTime', 'ipAddress', 'lastActive', 'totalActive', 'logout'];
        this.AllData = [];
    }
    AllRecordsAttendenceModelComponent.prototype.ngOnInit = function () {
        this.AllData = [];
        this.AllData.push(this.Data);
        console.log(this.AllData);
        this.dataSource = new table_1.MatTableDataSource(this.AllData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    AllRecordsAttendenceModelComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], AllRecordsAttendenceModelComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], AllRecordsAttendenceModelComponent.prototype, "sort");
    AllRecordsAttendenceModelComponent = __decorate([
        core_1.Component({
            selector: 'app-all-records-attendence-model',
            templateUrl: './all-records-attendence-model.component.html',
            styleUrls: ['./all-records-attendence-model.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AllRecordsAttendenceModelComponent);
    return AllRecordsAttendenceModelComponent;
}());
exports.AllRecordsAttendenceModelComponent = AllRecordsAttendenceModelComponent;
