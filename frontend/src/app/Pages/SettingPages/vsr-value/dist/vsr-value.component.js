"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VsrValueComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var vsr_value_model_component_1 = require("src/app/Model/vsr-value-model/vsr-value-model.component");
var sweetalert2_1 = require("sweetalert2");
var VsrValueComponent = /** @class */ (function () {
    function VsrValueComponent(api, dialog) {
        this.api = api;
        this.dialog = dialog;
        this.displayedColumns = ['id', 'vsr_value', 'action'];
    }
    VsrValueComponent.prototype.ngOnInit = function () {
        this.getAllVsr();
    };
    VsrValueComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    VsrValueComponent.prototype.openDialog = function () {
        var _this = this;
        this.dialog.open(vsr_value_model_component_1.VsrValueModelComponent, {
            width: '50%'
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllVsr();
            }
        });
    };
    VsrValueComponent.prototype.getAllVsr = function () {
        var _this = this;
        this.api.getAllVsrValue().subscribe({
            next: function (res) {
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
    VsrValueComponent.prototype.editVsr = function (data) {
        var _this = this;
        this.dialog.open(vsr_value_model_component_1.VsrValueModelComponent, {
            width: '30%',
            data: data
        }).afterClosed().subscribe(function (val) {
            if (val == 'Update') {
                _this.getAllVsr();
            }
        });
    };
    VsrValueComponent.prototype.deleteVsr = function (id) {
        var _this = this;
        this.api.deleteVsrvalue(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'VSR Value Deleted Successfully', 'success');
                _this.getAllVsr();
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
    ], VsrValueComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], VsrValueComponent.prototype, "sort");
    VsrValueComponent = __decorate([
        core_1.Component({
            selector: 'app-vsr-value',
            templateUrl: './vsr-value.component.html',
            styleUrls: ['./vsr-value.component.css']
        })
    ], VsrValueComponent);
    return VsrValueComponent;
}());
exports.VsrValueComponent = VsrValueComponent;
