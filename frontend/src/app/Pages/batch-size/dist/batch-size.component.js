"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BatchSizeComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var batch_size_model_component_1 = require("src/app/Model/batch-size-model/batch-size-model.component");
var sweetalert2_1 = require("sweetalert2");
var BatchSizeComponent = /** @class */ (function () {
    function BatchSizeComponent(api, dialog) {
        this.api = api;
        this.dialog = dialog;
        this.displayedColumns = ['id', 'batch_size', 'action'];
    }
    BatchSizeComponent.prototype.ngOnInit = function () {
        this.getAllBatchSize();
    };
    BatchSizeComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    BatchSizeComponent.prototype.openDialog = function () {
        var _this = this;
        this.dialog.open(batch_size_model_component_1.BatchSizeModelComponent, {
            width: '30%'
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllBatchSize();
            }
        });
    };
    BatchSizeComponent.prototype.getAllBatchSize = function () {
        var _this = this;
        this.api.getAllBatchSize().subscribe({
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
    BatchSizeComponent.prototype.editBatchSize = function (data) {
        var _this = this;
        this.dialog.open(batch_size_model_component_1.BatchSizeModelComponent, {
            width: '30%',
            data: data
        }).afterClosed().subscribe(function (val) {
            if (val == 'Update') {
                _this.getAllBatchSize();
            }
        });
    };
    BatchSizeComponent.prototype.deleteBatchSize = function (id) {
        var _this = this;
        this.api.deleteBatchSize(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Batch Size Deleted Successfully', 'success');
                _this.getAllBatchSize();
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
    ], BatchSizeComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], BatchSizeComponent.prototype, "sort");
    BatchSizeComponent = __decorate([
        core_1.Component({
            selector: 'app-batch-size',
            templateUrl: './batch-size.component.html',
            styleUrls: ['./batch-size.component.css']
        })
    ], BatchSizeComponent);
    return BatchSizeComponent;
}());
exports.BatchSizeComponent = BatchSizeComponent;
