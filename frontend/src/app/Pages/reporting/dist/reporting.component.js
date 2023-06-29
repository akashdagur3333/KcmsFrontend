"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReportingComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var fine_model_component_1 = require("src/app/Model/fine-model/fine-model.component");
var fine_waiver_model_component_1 = require("src/app/Model/fine-waiver-model/fine-waiver-model.component");
var other_charge_model_component_1 = require("src/app/Model/other-charge-model/other-charge-model.component");
var other_waiver_model_component_1 = require("src/app/Model/other-waiver-model/other-waiver-model.component");
var reciept_model_component_1 = require("src/app/Model/reciept-model/reciept-model.component");
var reporting_model_component_1 = require("src/app/Model/reporting-model/reporting-model.component");
var vsrwaiver_model_component_1 = require("src/app/Model/vsrwaiver-model/vsrwaiver-model.component");
var sweetalert2_1 = require("sweetalert2");
var ReportingComponent = /** @class */ (function () {
    function ReportingComponent(dialog, api) {
        this.dialog = dialog;
        this.api = api;
        this.displayedColumns = ['id', 'rpt_id', 'type', 'offer_letter', 'name', 'father_name', 'mother_name', 'package', 'sex', 'aadhar', 'reporting_date', 'reported_at', 'reported_by', 'doj', 'total_value', 'total_vsr', 'paid_vsr', 'fine', 'paid_fine', 'paid_other', 'fineWaiver', 'vsrWaiver', 'otherWaiver', 'pending_value', 'add', 'action'];
    }
    ReportingComponent.prototype.ngOnInit = function () {
        this.getAllReporting();
    };
    ReportingComponent.prototype.OpenModel = function () {
        var _this = this;
        this.dialog.open(reporting_model_component_1.ReportingModelComponent, {
            width: '60%',
            height: '70%'
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllReporting();
            }
        });
    };
    ReportingComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    ReportingComponent.prototype.getAllReporting = function () {
        var _this = this;
        this.api.getAllReporting().subscribe({
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
    ReportingComponent.prototype.editReporting = function (data) {
        var _this = this;
        this.dialog.open(reporting_model_component_1.ReportingModelComponent, {
            width: '60%',
            height: '70%',
            data: data
        }).afterClosed().subscribe(function (val) {
            if (val == 'Update') {
                _this.getAllReporting();
            }
        });
    };
    ReportingComponent.prototype.deleteReporting = function (id) {
        var _this = this;
        this.api.deleteReporting(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Reporting Deleted Successfully', 'success');
                _this.getAllReporting();
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
    ReportingComponent.prototype.addReciept = function (reciept) {
        var _this = this;
        this.dialog.open(reciept_model_component_1.RecieptModelComponent, {
            width: '60%',
            data: { reciept: reciept }
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllReporting();
            }
        });
    };
    ReportingComponent.prototype.addFine = function (fine) {
        var _this = this;
        this.dialog.open(fine_model_component_1.FineModelComponent, {
            width: '60%',
            data: { fine: fine }
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllReporting();
            }
        });
    };
    ReportingComponent.prototype.addFineWaiver = function (fineWaiver) {
        var _this = this;
        this.dialog.open(fine_waiver_model_component_1.FineWaiverModelComponent, {
            width: '60%',
            data: { fineWaiver: fineWaiver }
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllReporting();
            }
        });
    };
    ReportingComponent.prototype.addVSRWaiver = function (VSR_waiver) {
        var _this = this;
        this.dialog.open(vsrwaiver_model_component_1.VSRWaiverModelComponent, {
            width: '60%',
            data: { VSR_waiver: VSR_waiver }
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllReporting();
            }
        });
    };
    ReportingComponent.prototype.addother = function (other) {
        var _this = this;
        this.dialog.open(other_charge_model_component_1.OtherChargeModelComponent, {
            width: '60%',
            data: { other: other }
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllReporting();
            }
        });
    };
    ReportingComponent.prototype.addOtherWaiver = function (otherWaiver) {
        var _this = this;
        this.dialog.open(other_waiver_model_component_1.OtherWaiverModelComponent, {
            width: '60%',
            data: { otherWaiver: otherWaiver }
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllReporting();
            }
        });
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], ReportingComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], ReportingComponent.prototype, "sort");
    ReportingComponent = __decorate([
        core_1.Component({
            selector: 'app-reporting',
            templateUrl: './reporting.component.html',
            styleUrls: ['./reporting.component.css']
        })
    ], ReportingComponent);
    return ReportingComponent;
}());
exports.ReportingComponent = ReportingComponent;
