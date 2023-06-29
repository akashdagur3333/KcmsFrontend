"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LeftStatusComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var relieving_model_component_1 = require("src/app/Model/relieving-model/relieving-model.component");
var sweetalert2_1 = require("sweetalert2");
var LeftStatusComponent = /** @class */ (function () {
    function LeftStatusComponent(dialog, api) {
        this.dialog = dialog;
        this.api = api;
        this.displayedColumns = ['id', 'rpt_id', 'trn_id', 'emp_id', 'type', 'name', 'sex', 'trn_start', 'trn_end', 'doj', 'dos', 'pending_value', 'jobStatus', 'action'];
    }
    LeftStatusComponent.prototype.ngOnInit = function () {
        this.getInPool();
    };
    LeftStatusComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    LeftStatusComponent.prototype.getInPool = function () {
        var _this = this;
        this.api.getAllReporting().subscribe({
            next: function (res) {
                var data = res.filter(function (x) {
                    if (x.status == 5) {
                        x.status = 'Left';
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
    LeftStatusComponent.prototype.fromPool = function (event, data) {
        var value = event.target.value;
        if (value == 'Relieving') {
            this.dialog.open(relieving_model_component_1.RelievingModelComponent, {
                width: '60%',
                height: '60%',
                data: { add: data }
            });
        }
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], LeftStatusComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], LeftStatusComponent.prototype, "sort");
    LeftStatusComponent = __decorate([
        core_1.Component({
            selector: 'app-left-status',
            templateUrl: './left-status.component.html',
            styleUrls: ['./left-status.component.css']
        })
    ], LeftStatusComponent);
    return LeftStatusComponent;
}());
exports.LeftStatusComponent = LeftStatusComponent;
