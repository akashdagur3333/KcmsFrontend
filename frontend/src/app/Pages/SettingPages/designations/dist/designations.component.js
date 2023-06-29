"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DesignationsComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var designation_model_component_1 = require("src/app/Model/designation-model/designation-model.component");
var sweetalert2_1 = require("sweetalert2");
var DesignationsComponent = /** @class */ (function () {
    function DesignationsComponent(api, dialog) {
        this.api = api;
        this.dialog = dialog;
        this.displayedColumns = ['id', 'head_department', 'designation', 'action'];
    }
    DesignationsComponent.prototype.ngOnInit = function () {
        this.getAllDesignation();
    };
    DesignationsComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    DesignationsComponent.prototype.openDialog = function () {
        var _this = this;
        this.dialog.open(designation_model_component_1.DesignationModelComponent, {
            width: '30%'
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllDesignation();
            }
        });
    };
    DesignationsComponent.prototype.getAllDesignation = function () {
        var _this = this;
        this.api.getAllDesignation().subscribe({
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
    DesignationsComponent.prototype.deleteDesignation = function (id) {
        var _this = this;
        this.api.deleteDesignation(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Designation Deleted Successfully', 'success');
                _this.getAllDesignation();
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
    DesignationsComponent.prototype.editDesignation = function (data) {
        var _this = this;
        this.dialog.open(designation_model_component_1.DesignationModelComponent, {
            width: '30%',
            data: data
        }).afterClosed().subscribe(function (val) {
            if (val == 'Update') {
                _this.getAllDesignation();
            }
        });
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], DesignationsComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], DesignationsComponent.prototype, "sort");
    DesignationsComponent = __decorate([
        core_1.Component({
            selector: 'app-designations',
            templateUrl: './designations.component.html',
            styleUrls: ['./designations.component.css']
        })
    ], DesignationsComponent);
    return DesignationsComponent;
}());
exports.DesignationsComponent = DesignationsComponent;
