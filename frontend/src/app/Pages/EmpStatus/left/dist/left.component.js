"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LeftComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var sweetalert2_1 = require("sweetalert2");
var LeftComponent = /** @class */ (function () {
    function LeftComponent(dialog, api) {
        this.dialog = dialog;
        this.api = api;
        this.failStatus = 1;
        this.displayedColumns = ['id', 'rpt_id', 'type', 'name', 'sex', 'reporting_date', 'reported_at', 'doj', 'pending_value', 'jobStatus'];
    }
    LeftComponent.prototype.ngOnInit = function () {
        this.getAllReporting();
        var show = document.getElementById('jobStatus');
        show === null || show === void 0 ? void 0 : show.removeAttribute('hidden');
    };
    LeftComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    LeftComponent.prototype.getAllReporting = function () {
        var _this = this;
        this.api.getAllReporting().subscribe({
            next: function (res) {
                _this.data = res.filter(function (x) {
                    if (x.status == 5 && x.left[0].failStatus == _this.failStatus) {
                        x.status = 'Left';
                        return x;
                    }
                });
                _this.dataSource = new table_1.MatTableDataSource(_this.data);
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
    LeftComponent.prototype.getAllid = function () {
        this.inPool = document.getElementById('inPool');
        this.awaited = document.getElementById('awaited');
        this.inTraining = document.getElementById('inTraining');
        this.trainingCompleted = document.getElementById('trainingCompleted');
        this.jobStatus = document.getElementById('jobStatus');
    };
    LeftComponent.prototype.showPool = function () {
        var _a, _b, _c, _d, _e;
        this.failStatus = 4;
        this.getAllReporting();
        this.getAllid();
        (_a = this.inPool) === null || _a === void 0 ? void 0 : _a.removeAttribute('hidden');
        (_b = this.awaited) === null || _b === void 0 ? void 0 : _b.setAttribute('hidden', '');
        (_c = this.inTraining) === null || _c === void 0 ? void 0 : _c.setAttribute('hidden', '');
        (_d = this.trainingCompleted) === null || _d === void 0 ? void 0 : _d.setAttribute('hidden', '');
        (_e = this.jobStatus) === null || _e === void 0 ? void 0 : _e.setAttribute('hidden', '');
    };
    LeftComponent.prototype.showJobStatus = function () {
        var _a, _b, _c, _d, _e;
        this.failStatus = 1;
        this.getAllReporting();
        this.getAllid();
        (_a = this.jobStatus) === null || _a === void 0 ? void 0 : _a.removeAttribute('hidden');
        (_b = this.awaited) === null || _b === void 0 ? void 0 : _b.setAttribute('hidden', '');
        (_c = this.inTraining) === null || _c === void 0 ? void 0 : _c.setAttribute('hidden', '');
        (_d = this.trainingCompleted) === null || _d === void 0 ? void 0 : _d.setAttribute('hidden', '');
        (_e = this.inPool) === null || _e === void 0 ? void 0 : _e.setAttribute('hidden', '');
    };
    LeftComponent.prototype.showAwaited = function () {
        var _a, _b, _c, _d, _e;
        this.failStatus = 3;
        this.getAllReporting();
        this.getAllid();
        (_a = this.awaited) === null || _a === void 0 ? void 0 : _a.removeAttribute('hidden');
        (_b = this.inPool) === null || _b === void 0 ? void 0 : _b.setAttribute('hidden', '');
        (_c = this.inTraining) === null || _c === void 0 ? void 0 : _c.setAttribute('hidden', '');
        (_d = this.trainingCompleted) === null || _d === void 0 ? void 0 : _d.setAttribute('hidden', '');
        (_e = this.jobStatus) === null || _e === void 0 ? void 0 : _e.setAttribute('hidden', '');
    };
    LeftComponent.prototype.showIntraining = function () {
        var _a, _b, _c, _d, _e;
        this.failStatus = 5;
        this.getAllReporting();
        this.getAllid();
        (_a = this.inTraining) === null || _a === void 0 ? void 0 : _a.removeAttribute('hidden');
        (_b = this.awaited) === null || _b === void 0 ? void 0 : _b.setAttribute('hidden', '');
        (_c = this.inPool) === null || _c === void 0 ? void 0 : _c.setAttribute('hidden', '');
        (_d = this.trainingCompleted) === null || _d === void 0 ? void 0 : _d.setAttribute('hidden', '');
        (_e = this.jobStatus) === null || _e === void 0 ? void 0 : _e.setAttribute('hidden', '');
    };
    LeftComponent.prototype.showTrainingCompleted = function () {
        var _a, _b, _c, _d, _e;
        this.failStatus = 2;
        this.getAllReporting();
        this.getAllid();
        (_a = this.trainingCompleted) === null || _a === void 0 ? void 0 : _a.removeAttribute('hidden');
        (_b = this.awaited) === null || _b === void 0 ? void 0 : _b.setAttribute('hidden', '');
        (_c = this.inTraining) === null || _c === void 0 ? void 0 : _c.setAttribute('hidden', '');
        (_d = this.inPool) === null || _d === void 0 ? void 0 : _d.setAttribute('hidden', '');
        (_e = this.jobStatus) === null || _e === void 0 ? void 0 : _e.setAttribute('hidden', '');
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], LeftComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], LeftComponent.prototype, "sort");
    LeftComponent = __decorate([
        core_1.Component({
            selector: 'app-left',
            templateUrl: './left.component.html',
            styleUrls: ['./left.component.css']
        })
    ], LeftComponent);
    return LeftComponent;
}());
exports.LeftComponent = LeftComponent;
