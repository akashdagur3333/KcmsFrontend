"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SettingComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var location_model_component_1 = require("src/app/Model/location-model/location-model.component");
var sweetalert2_1 = require("sweetalert2");
var SettingComponent = /** @class */ (function () {
    function SettingComponent(api, dialog) {
        this.api = api;
        this.dialog = dialog;
        this.displayedColumns = ['id', 'office_code', 'location', 'address', 'action'];
    }
    SettingComponent.prototype.ngOnInit = function () {
        this.getAllLocations();
    };
    SettingComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    SettingComponent.prototype.getAllLocations = function () {
        var _this = this;
        this.api.getAllLocation().subscribe({
            next: function (res) {
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
    SettingComponent.prototype.editLocation = function (data) {
        var _this = this;
        this.dialog.open(location_model_component_1.LocationModelComponent, {
            width: '30%',
            data: data
        }).afterClosed().subscribe(function (val) {
            if (val == 'Update') {
                _this.getAllLocations();
            }
        });
    };
    SettingComponent.prototype.deleteLocation = function (id) {
        var _this = this;
        this.api.deleteLocation(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Location Deleted Successfully', 'success');
                _this.getAllLocations();
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
    SettingComponent.prototype.openDialog = function () {
        var _this = this;
        this.dialog.open(location_model_component_1.LocationModelComponent, {
            width: '30%'
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllLocations();
            }
        });
    };
    SettingComponent.prototype.viewBatchSize = function () {
        var x = document.getElementById("batchSize");
        x === null || x === void 0 ? void 0 : x.removeAttribute('hidden');
    };
    SettingComponent.prototype.viewTrainer = function () {
        var x = document.getElementById("trainer");
        x === null || x === void 0 ? void 0 : x.removeAttribute('hidden');
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], SettingComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], SettingComponent.prototype, "sort");
    SettingComponent = __decorate([
        core_1.Component({
            selector: 'app-setting',
            templateUrl: './setting.component.html',
            styleUrls: ['./setting.component.css']
        })
    ], SettingComponent);
    return SettingComponent;
}());
exports.SettingComponent = SettingComponent;
