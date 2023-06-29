"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OtherWaiverComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var sweetalert2_1 = require("sweetalert2");
var OtherWaiverComponent = /** @class */ (function () {
    function OtherWaiverComponent(api) {
        this.api = api;
        this.displayedColumns = ['id', 'rpt_id', 'name', 'father_name', 'amount', 'remarks', 'gst_amount', 'waived_by', 'action'];
    }
    OtherWaiverComponent.prototype.ngOnInit = function () {
        this.getAllOtherWaiver();
    };
    OtherWaiverComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    OtherWaiverComponent.prototype.getAllOtherWaiver = function () {
        var _this = this;
        this.api.getAllOtherWaiver().subscribe({
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
    OtherWaiverComponent.prototype.deleteOtherWaiver = function (id) {
        var _this = this;
        this.api.deleteOtherWaiver(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'OtherWaiver Deleted Successfully', 'success');
                _this.getAllOtherWaiver();
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
    ], OtherWaiverComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], OtherWaiverComponent.prototype, "sort");
    OtherWaiverComponent = __decorate([
        core_1.Component({
            selector: 'app-other-waiver',
            templateUrl: './other-waiver.component.html',
            styleUrls: ['./other-waiver.component.css']
        })
    ], OtherWaiverComponent);
    return OtherWaiverComponent;
}());
exports.OtherWaiverComponent = OtherWaiverComponent;
