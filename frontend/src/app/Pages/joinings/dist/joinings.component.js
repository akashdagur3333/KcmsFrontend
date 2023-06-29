"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JoiningsComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var sweetalert2_1 = require("sweetalert2");
var JoiningsComponent = /** @class */ (function () {
    function JoiningsComponent(dialog, api) {
        this.dialog = dialog;
        this.api = api;
        this.displayedColumns = ['id', 'rpt_id', 'type', 'name', 'sex', 'reporting_date', 'reported_at', 'doj', 'pending_value', 'jobStatus'];
    }
    JoiningsComponent.prototype.ngOnInit = function () {
        this.getAllReporting();
    };
    JoiningsComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    JoiningsComponent.prototype.getAllReporting = function () {
        var _this = this;
        this.api.getAllReporting().subscribe({
            next: function (res) {
                var data = res.filter(function (x) {
                    if (x.status == 4) {
                        x.status = 'Joined';
                        return x;
                    }
                });
                _this.dataSource = new table_1.MatTableDataSource(data);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
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
    ], JoiningsComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], JoiningsComponent.prototype, "sort");
    JoiningsComponent = __decorate([
        core_1.Component({
            selector: 'app-joinings',
            templateUrl: './joinings.component.html',
            styleUrls: ['./joinings.component.css']
        })
    ], JoiningsComponent);
    return JoiningsComponent;
}());
exports.JoiningsComponent = JoiningsComponent;
