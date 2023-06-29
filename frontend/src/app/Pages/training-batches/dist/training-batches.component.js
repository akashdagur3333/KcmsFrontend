"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TrainingBatchesComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var moment = require("moment");
var training_model_component_1 = require("src/app/Model/training-model/training-model.component");
var sweetalert2_1 = require("sweetalert2");
var TrainingBatchesComponent = /** @class */ (function () {
    function TrainingBatchesComponent(dialog, api) {
        this.dialog = dialog;
        this.api = api;
        this.displayedColumns = ['id', 'batch_id', 'batch_name', 'batch_location', 'batch_start', 'batch_size', 'occupied_seat', 'aviable_seat', 'batch_type', 'batch_trainer', 'view', 'action'];
    }
    TrainingBatchesComponent.prototype.ngOnInit = function () {
        this.getallBatches();
    };
    TrainingBatchesComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    TrainingBatchesComponent.prototype.OpenModel = function () {
        var _this = this;
        this.dialog.open(training_model_component_1.TrainingModelComponent, {
            width: '50%'
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getallBatches();
            }
        });
    };
    TrainingBatchesComponent.prototype.getallBatches = function () {
        var _this = this;
        this.api.getAllBateches().subscribe({
            next: function (res) {
                res.sort(function (x) {
                    // this.date=x.batch_starting_date;
                    _this.date = moment(x.batch_starting_date).utc().format('YYYY-MM-DD');
                });
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
    TrainingBatchesComponent.prototype.editBatches = function (data) {
        var _this = this;
        this.dialog.open(training_model_component_1.TrainingModelComponent, {
            width: '50%',
            data: data
        }).afterClosed().subscribe(function (val) {
            if (val == 'Update') {
                _this.getallBatches();
            }
        });
    };
    TrainingBatchesComponent.prototype.deleteBatches = function (id) {
        var _this = this;
        this.api.deleteBatches(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Batch Deleted Successfully', 'success');
                _this.getallBatches();
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
    ], TrainingBatchesComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], TrainingBatchesComponent.prototype, "sort");
    TrainingBatchesComponent = __decorate([
        core_1.Component({
            selector: 'app-training-batches',
            templateUrl: './training-batches.component.html',
            styleUrls: ['./training-batches.component.css']
        })
    ], TrainingBatchesComponent);
    return TrainingBatchesComponent;
}());
exports.TrainingBatchesComponent = TrainingBatchesComponent;
