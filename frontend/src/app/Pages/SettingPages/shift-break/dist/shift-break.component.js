"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShiftBreakComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var shift_break_model_component_1 = require("src/app/Model/shift-break-model/shift-break-model.component");
var sweetalert2_1 = require("sweetalert2");
var ShiftBreakComponent = /** @class */ (function () {
    function ShiftBreakComponent(api, dialog) {
        this.api = api;
        this.dialog = dialog;
        this.displayedColumns = ['id', 'brk_id', 'shift_name', 'shift_start', 'shift_end', 'shift_description', 'break_title', 'break_duration', 'break_title2', 'break_duration2', 'break_title3', 'break_duration3', 'status', 'action'];
    }
    ShiftBreakComponent.prototype.ngOnInit = function () {
        this.getAllShift();
    };
    ShiftBreakComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    ShiftBreakComponent.prototype.openDialog = function () {
        var _this = this;
        this.dialog.open(shift_break_model_component_1.ShiftBreakModelComponent, {
            width: '60%',
            height: '70%'
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllShift();
            }
        });
    };
    ShiftBreakComponent.prototype.getAllShift = function () {
        var _this = this;
        this.api.getAllShift().subscribe({
            next: function (res) {
                res.map(function (X) {
                    if (X.status == '1') {
                        X.status = "Active";
                    }
                    else {
                        X.status = "InActive";
                    }
                });
                res.reverse();
                _this.dataSource = new table_1.MatTableDataSource(res);
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
    ShiftBreakComponent.prototype.editShift = function (data) {
        var _this = this;
        this.dialog.open(shift_break_model_component_1.ShiftBreakModelComponent, {
            width: '60%',
            height: '70%',
            data: data
        }).afterClosed().subscribe(function (val) {
            if (val == 'Update') {
                _this.getAllShift();
            }
        });
    };
    ShiftBreakComponent.prototype.deleteShift = function (id) {
        var _this = this;
        this.api.deleteShift(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Shift Deleted Successfully', 'success');
                _this.getAllShift();
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
    ], ShiftBreakComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], ShiftBreakComponent.prototype, "sort");
    ShiftBreakComponent = __decorate([
        core_1.Component({
            selector: 'app-shift-break',
            templateUrl: './shift-break.component.html',
            styleUrls: ['./shift-break.component.css']
        })
    ], ShiftBreakComponent);
    return ShiftBreakComponent;
}());
exports.ShiftBreakComponent = ShiftBreakComponent;
