"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FineWaiverComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var sweetalert2_1 = require("sweetalert2");
var FineWaiverComponent = /** @class */ (function () {
    function FineWaiverComponent(api) {
        this.api = api;
        this.displayedColumns = ['id', 'rpt_id', 'name', 'father_name', 'amount', 'remarks', 'gst_amount', 'waived_by', 'action'];
    }
    FineWaiverComponent.prototype.ngOnInit = function () {
        this.getAllFineWaiver();
    };
    FineWaiverComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    FineWaiverComponent.prototype.getAllFineWaiver = function () {
        var _this = this;
        this.api.getAllFineWaiver().subscribe({
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
    FineWaiverComponent.prototype.deleteFineWaiver = function (id) {
        var _this = this;
        this.api.deleteFineWaiver(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'FineWaiver Deleted Successfully', 'success');
                _this.getAllFineWaiver();
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
    ], FineWaiverComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], FineWaiverComponent.prototype, "sort");
    FineWaiverComponent = __decorate([
        core_1.Component({
            selector: 'app-fine-waiver',
            templateUrl: './fine-waiver.component.html',
            styleUrls: ['./fine-waiver.component.css']
        })
    ], FineWaiverComponent);
    return FineWaiverComponent;
}());
exports.FineWaiverComponent = FineWaiverComponent;
