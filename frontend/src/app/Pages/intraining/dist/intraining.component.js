"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IntrainingComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var add_left_model_component_1 = require("src/app/Model/add-left-model/add-left-model.component");
var add_training_complete_model_component_1 = require("src/app/Model/add-training-complete-model/add-training-complete-model.component");
var sweetalert2_1 = require("sweetalert2");
var IntrainingComponent = /** @class */ (function () {
    function IntrainingComponent(dialog, api) {
        this.dialog = dialog;
        this.api = api;
        this.displayedColumns = ['id', 'rpt_id', 'type', 'name', 'sex', 'reporting_date', 'reported_at', 'doj', 'pending_value', 'jobStatus'];
    }
    IntrainingComponent.prototype.ngOnInit = function () {
        this.getAllReporting();
    };
    IntrainingComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    IntrainingComponent.prototype.getAllReporting = function () {
        var _this = this;
        this.api.getAllReporting().subscribe({
            next: function (res) {
                var data = res.filter(function (x) {
                    if (x.pending_value == 0 && x.status == 2) {
                        x.status = 'In Training';
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
    IntrainingComponent.prototype.fromPool = function (event, data) {
        var _this = this;
        var value = event.target.value;
        console.log(value, data);
        if (value == '3') {
            this.dialog.open(add_training_complete_model_component_1.AddTrainingCompleteModelComponent, {
                width: '60%',
                height: '70%',
                data: data
            }).afterClosed().subscribe(function (val) {
                if (val == 'Update') {
                    _this.getAllReporting();
                }
            });
        }
        else if (value == '5') {
            this.dialog.open(add_left_model_component_1.AddLeftModelComponent, {
                width: '60%',
                height: '70%',
                data: { intraining: data }
            }).afterClosed().subscribe(function (val) {
                if (val == 'Update') {
                    _this.getAllReporting();
                }
            });
        }
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], IntrainingComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], IntrainingComponent.prototype, "sort");
    IntrainingComponent = __decorate([
        core_1.Component({
            selector: 'app-intraining',
            templateUrl: './intraining.component.html',
            styleUrls: ['./intraining.component.css']
        })
    ], IntrainingComponent);
    return IntrainingComponent;
}());
exports.IntrainingComponent = IntrainingComponent;
