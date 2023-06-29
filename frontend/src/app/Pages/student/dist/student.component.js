"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StudentComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var loamodel_component_1 = require("src/app/Model/loamodel/loamodel.component");
var student_model_component_1 = require("src/app/Model/student-model/student-model.component");
var sweetalert2_1 = require("sweetalert2");
var StudentComponent = /** @class */ (function () {
    function StudentComponent(api, dialog) {
        this.api = api;
        this.dialog = dialog;
        this.displayedColumns = ['id', 'str_id', 'drv_id', 'college_id', 'category', 'status', 'college_name', 'student_name', 'sex', 'type', 'branch', 'stream', 'package', 'mobile', 'alt_mobile', 'aadhar', 'view_offer_letter', 'action'];
    }
    StudentComponent.prototype.ngOnInit = function () {
        this.getAllStudents();
    };
    StudentComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    StudentComponent.prototype.getAllStudents = function () {
        var _this = this;
        this.api.getAllStudents().subscribe({
            next: function (res) {
                _this.dataSource = new table_1.MatTableDataSource(res);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
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
    StudentComponent.prototype.OpenModel = function () {
        var _this = this;
        this.dialog.open(student_model_component_1.StudentModelComponent, {
            width: '50%',
            height: '80%',
            data: { message: "addStudent" }
        })
            .afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllStudents();
            }
        });
    };
    StudentComponent.prototype.editStudent = function (data) {
        var _this = this;
        this.dialog.open(student_model_component_1.StudentModelComponent, {
            width: '50%',
            data: { data: data }
        }).afterClosed().subscribe(function (val) {
            if (val == 'Update') {
                _this.getAllStudents();
            }
        });
    };
    StudentComponent.prototype.loaModel = function (data) {
        this.dialog.open(loamodel_component_1.LOAModelComponent, {
            width: '60%',
            height: '70%',
            data: data
        });
    };
    StudentComponent.prototype.deleteStudent = function (id) {
        var _this = this;
        this.api.deleteStudents(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Student Deleted Successfully', 'success');
                _this.getAllStudents();
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
    ], StudentComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], StudentComponent.prototype, "sort");
    StudentComponent = __decorate([
        core_1.Component({
            selector: 'app-student',
            templateUrl: './student.component.html',
            styleUrls: ['./student.component.css']
        })
    ], StudentComponent);
    return StudentComponent;
}());
exports.StudentComponent = StudentComponent;
