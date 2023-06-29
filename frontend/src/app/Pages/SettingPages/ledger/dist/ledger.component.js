"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LedgerComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var ledgers_model_component_1 = require("src/app/Model/ledgers-model/ledgers-model.component");
var sweetalert2_1 = require("sweetalert2");
var LedgerComponent = /** @class */ (function () {
    function LedgerComponent(api, dialog) {
        this.api = api;
        this.dialog = dialog;
        this.displayedColumns = ['id', 'ledger_name', 'action'];
    }
    LedgerComponent.prototype.ngOnInit = function () {
        this.getAllLedger();
    };
    LedgerComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    LedgerComponent.prototype.openDialog = function () {
        var _this = this;
        this.dialog.open(ledgers_model_component_1.LedgersModelComponent, {
            width: '50%'
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllLedger();
            }
        });
    };
    LedgerComponent.prototype.getAllLedger = function () {
        var _this = this;
        this.api.getAllLedger().subscribe({
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
    LedgerComponent.prototype.editLedger = function (data) {
        var _this = this;
        this.dialog.open(ledgers_model_component_1.LedgersModelComponent, {
            width: '30%',
            data: data
        }).afterClosed().subscribe(function (val) {
            if (val == 'Update') {
                _this.getAllLedger();
            }
        });
    };
    LedgerComponent.prototype.deleteLedger = function (id) {
        var _this = this;
        this.api.deleteLedger(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Ledger Deleted Successfully', 'success');
                _this.getAllLedger();
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
    ], LedgerComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], LedgerComponent.prototype, "sort");
    LedgerComponent = __decorate([
        core_1.Component({
            selector: 'app-ledger',
            templateUrl: './ledger.component.html',
            styleUrls: ['./ledger.component.css']
        })
    ], LedgerComponent);
    return LedgerComponent;
}());
exports.LedgerComponent = LedgerComponent;
