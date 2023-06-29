"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PackagesComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var package_model_component_1 = require("src/app/Model/package-model/package-model.component");
var sweetalert2_1 = require("sweetalert2");
var PackagesComponent = /** @class */ (function () {
    function PackagesComponent(api, dialog) {
        this.api = api;
        this.dialog = dialog;
        this.displayedColumns = ['id', 'pkg_id', 'name', 'training_days', 'net_pay', 'ctc_after', 'action'];
    }
    PackagesComponent.prototype.ngOnInit = function () {
        this.getAllPackage();
    };
    PackagesComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    PackagesComponent.prototype.openDialog = function () {
        var _this = this;
        this.dialog.open(package_model_component_1.PackageModelComponent, {
            width: '60%',
            height: '70%'
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllPackage();
            }
        });
    };
    PackagesComponent.prototype.getAllPackage = function () {
        var _this = this;
        this.api.getAllPackage().subscribe({
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
    PackagesComponent.prototype.editPackage = function (data) {
        var _this = this;
        this.dialog.open(package_model_component_1.PackageModelComponent, {
            width: '60%',
            height: '70%',
            data: data
        }).afterClosed().subscribe(function (val) {
            if (val == 'Update') {
                _this.getAllPackage();
            }
        });
    };
    PackagesComponent.prototype.deletePackage = function (id) {
        var _this = this;
        this.api.deletePackage(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Package Deleted Successfully', 'success');
                _this.getAllPackage();
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
    ], PackagesComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], PackagesComponent.prototype, "sort");
    PackagesComponent = __decorate([
        core_1.Component({
            selector: 'app-packages',
            templateUrl: './packages.component.html',
            styleUrls: ['./packages.component.css']
        })
    ], PackagesComponent);
    return PackagesComponent;
}());
exports.PackagesComponent = PackagesComponent;
