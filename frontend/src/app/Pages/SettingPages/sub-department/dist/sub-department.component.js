"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubDepartmentComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var subdepartment_model_component_1 = require("src/app/Model/subdepartment-model/subdepartment-model.component");
var sweetalert2_1 = require("sweetalert2");
var SubDepartmentComponent = /** @class */ (function () {
    function SubDepartmentComponent(api, dialog) {
        this.api = api;
        this.dialog = dialog;
        this.displayedColumns = ['id', 'head_department', 'sub_department', 'action'];
    }
    SubDepartmentComponent.prototype.ngOnInit = function () {
        this.getAllSubDepartment();
    };
    SubDepartmentComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    SubDepartmentComponent.prototype.openDialog = function () {
        var _this = this;
        this.dialog.open(subdepartment_model_component_1.SubdepartmentModelComponent, {
            width: '30%'
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllSubDepartment();
            }
        });
    };
    SubDepartmentComponent.prototype.getAllSubDepartment = function () {
        var _this = this;
        this.api.getAllSubdepartment().subscribe({
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
    SubDepartmentComponent.prototype.editSubDepartment = function (data) {
        var _this = this;
        this.dialog.open(subdepartment_model_component_1.SubdepartmentModelComponent, {
            width: '30%',
            data: data
        }).afterClosed().subscribe(function (val) {
            if (val == 'Update') {
                _this.getAllSubDepartment();
            }
        });
    };
    SubDepartmentComponent.prototype.deleteSubDepartment = function (id) {
        var _this = this;
        this.api.deleteSubdepartment(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Sub Department Deleted Successfully', 'success');
                _this.getAllSubDepartment();
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
    ], SubDepartmentComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], SubDepartmentComponent.prototype, "sort");
    SubDepartmentComponent = __decorate([
        core_1.Component({
            selector: 'app-sub-department',
            templateUrl: './sub-department.component.html',
            styleUrls: ['./sub-department.component.css']
        })
    ], SubDepartmentComponent);
    return SubDepartmentComponent;
}());
exports.SubDepartmentComponent = SubDepartmentComponent;
