"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProposedCollegeComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var college_model_component_1 = require("src/app/Model/college-model/college-model.component");
var sweetalert2_1 = require("sweetalert2");
var ProposedCollegeComponent = /** @class */ (function () {
    function ProposedCollegeComponent(api, dialog) {
        this.api = api;
        this.dialog = dialog;
        this.displayedColumns = ['id', 'college_id', 'college_name', 'city', 'state', 'pin_code', 'type', 'tnp_head', 'date', 'add', 'action'];
        this.PerposedCollege = [];
    }
    ProposedCollegeComponent.prototype.ngOnInit = function () {
        this.getallColleges();
    };
    ProposedCollegeComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    ProposedCollegeComponent.prototype.addPanel = function (data) {
        var _this = this;
        this.dialog.open(college_model_component_1.CollegeModelComponent, {
            width: '30%',
            data: data
        }).afterClosed().subscribe(function (val) {
            if (val == 'Panel') {
                _this.getallColleges();
            }
        });
    };
    ProposedCollegeComponent.prototype.getallColleges = function () {
        var _this = this;
        this.api.getAllColleges().subscribe({
            next: function (res) {
                _this.PerposedCollege = res.filter(function (X) {
                    return X.status === 1;
                });
                _this.PerposedCollege.reverse();
                _this.dataSource = new table_1.MatTableDataSource(_this.PerposedCollege);
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
    ProposedCollegeComponent.prototype.editColleges = function (data) {
        var _this = this;
        this.dialog.open(college_model_component_1.CollegeModelComponent, {
            width: '30%',
            data: data
        }).afterClosed().subscribe(function (val) {
            if (val == 'Update') {
                _this.getallColleges();
            }
        });
    };
    ProposedCollegeComponent.prototype.deleteColleges = function (id) {
        var _this = this;
        this.api.deleteColleges(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'college Deleted Successfully', 'success');
                _this.getallColleges();
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
    ], ProposedCollegeComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], ProposedCollegeComponent.prototype, "sort");
    ProposedCollegeComponent = __decorate([
        core_1.Component({
            selector: 'app-proposed-college',
            templateUrl: './proposed-college.component.html',
            styleUrls: ['./proposed-college.component.css']
        })
    ], ProposedCollegeComponent);
    return ProposedCollegeComponent;
}());
exports.ProposedCollegeComponent = ProposedCollegeComponent;
