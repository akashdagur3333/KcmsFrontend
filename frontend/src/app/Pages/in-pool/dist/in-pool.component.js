"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InPoolComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var add_intraining_model_component_1 = require("src/app/Model/add-intraining-model/add-intraining-model.component");
var add_left_model_component_1 = require("src/app/Model/add-left-model/add-left-model.component");
var sweetalert2_1 = require("sweetalert2");
var InPoolComponent = /** @class */ (function () {
    function InPoolComponent(dialog, api) {
        this.dialog = dialog;
        this.api = api;
        this.displayedColumns = ['id', 'rpt_id', 'type', 'name', 'sex', 'reporting_date', 'reported_at', 'doj', 'pending_value', 'jobStatus', 'action'];
    }
    InPoolComponent.prototype.ngOnInit = function () {
        this.getInPool();
    };
    InPoolComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    InPoolComponent.prototype.getInPool = function () {
        var _this = this;
        this.api.getAllReporting().subscribe({
            next: function (res) {
                var data = res.filter(function (x) {
                    if (x.pending_value == 0 && x.status == 1) {
                        x.status = 'In Pool';
                        return x;
                    }
                });
                _this.res = data;
                _this.dataSource = new table_1.MatTableDataSource(_this.res);
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
    InPoolComponent.prototype.fromPool = function (event, data) {
        var _this = this;
        var value = event.target.value;
        console.log(value, data);
        if (value == '2') {
            this.dialog.open(add_intraining_model_component_1.AddIntrainingModelComponent, {
                width: '60%',
                height: '70%',
                data: data
            }).afterClosed().subscribe(function (val) {
                if (val == 'Update') {
                    _this.getInPool();
                }
            });
        }
        else if (value == '5') {
            this.dialog.open(add_left_model_component_1.AddLeftModelComponent, {
                width: '60%',
                height: '60%',
                data: { inpool: data }
            }).afterClosed().subscribe(function (val) {
                if (val == 'Update') {
                    _this.getInPool();
                }
            });
        }
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], InPoolComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], InPoolComponent.prototype, "sort");
    InPoolComponent = __decorate([
        core_1.Component({
            selector: 'app-in-pool',
            templateUrl: './in-pool.component.html',
            styleUrls: ['./in-pool.component.css']
        })
    ], InPoolComponent);
    return InPoolComponent;
}());
exports.InPoolComponent = InPoolComponent;
