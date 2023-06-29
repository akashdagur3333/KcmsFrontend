"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TrainingTestsComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var training_test_model_component_1 = require("src/app/Model/training-test-model/training-test-model.component");
var sweetalert2_1 = require("sweetalert2");
var TrainingTestsComponent = /** @class */ (function () {
    function TrainingTestsComponent(dialog, api) {
        this.dialog = dialog;
        this.api = api;
        this.displayedColumns = ['id', 'tst_id', 'test_name', 'test_start', 'test_end', 'test_date', 'test_status', 'action'];
    }
    TrainingTestsComponent.prototype.ngOnInit = function () {
        this.getAllTest();
    };
    TrainingTestsComponent.prototype.OpenModel = function () {
        var _this = this;
        this.dialog.open(training_test_model_component_1.TrainingTestModelComponent, {
            width: '60%',
            height: '80%'
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllTest();
            }
        });
    };
    TrainingTestsComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    TrainingTestsComponent.prototype.getAllTest = function () {
        var _this = this;
        this.api.getAllTest().subscribe({
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
    TrainingTestsComponent.prototype.editTest = function (data) {
        var _this = this;
        this.dialog.open(training_test_model_component_1.TrainingTestModelComponent, {
            width: '60%',
            height: '80%',
            data: { data: data }
        }).afterClosed().subscribe(function (val) {
            if (val == 'Update') {
                _this.getAllTest();
            }
        });
    };
    TrainingTestsComponent.prototype.deleteTest = function (id) {
        var _this = this;
        this.api.deleteTest(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Test Deleted Successfully', 'success');
                _this.getAllTest();
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
    ], TrainingTestsComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], TrainingTestsComponent.prototype, "sort");
    TrainingTestsComponent = __decorate([
        core_1.Component({
            selector: 'app-training-tests',
            templateUrl: './training-tests.component.html',
            styleUrls: ['./training-tests.component.css']
        })
    ], TrainingTestsComponent);
    return TrainingTestsComponent;
}());
exports.TrainingTestsComponent = TrainingTestsComponent;
