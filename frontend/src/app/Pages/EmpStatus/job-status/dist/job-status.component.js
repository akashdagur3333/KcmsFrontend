"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JobStatusComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var sweetalert2_1 = require("sweetalert2");
var JobStatusComponent = /** @class */ (function () {
    function JobStatusComponent(dialog, api) {
        this.dialog = dialog;
        this.api = api;
        this.displayedColumns = ['id', 'rpt_id', 'type', 'name', 'sex', 'reporting_date', 'reported_at', 'doj', 'pending_value', 'jobStatus', 'action'];
    }
    JobStatusComponent.prototype.ngOnInit = function () {
        this.getAwaited();
        this.getInTraining();
        this.getCompleteTraining();
        this.getJoined();
        this.getLeft();
        this.getAllReporting();
        var show = document.getElementById('jobStatus');
        show === null || show === void 0 ? void 0 : show.removeAttribute('hidden');
    };
    JobStatusComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    JobStatusComponent.prototype.getAllReporting = function () {
        var _this = this;
        this.api.getAllReporting().subscribe({
            next: function (res) {
                res.filter(function (x) {
                    if (x.status == 1 && x.pending_value > 0) {
                        x.status = 'Awaited';
                    }
                    else if (x.status == 1 && x.pending_value == 0) {
                        x.status = 'In Pool';
                    }
                    else if (x.status == 2 && x.pending_value == 0) {
                        x.status = 'In Training';
                    }
                    else if (x.status == 3 && x.pending_value == 0) {
                        x.status = 'Training Completed';
                    }
                    else if (x.status == 4 && x.pending_value == 0) {
                        x.status = 'Joined';
                    }
                    else {
                        x.status = 'Left';
                    }
                });
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
    JobStatusComponent.prototype.editReporting = function (data) {
        // this.dialog.open(ReportingModelComponent,{
        //   width:'60%',
        //   height:'70%',
        //   data:data
        // }).afterClosed().subscribe(val=>{
        //   if(val=='Update'){
        //     this.getAllReporting();
        //   }
        // })
    };
    JobStatusComponent.prototype.deleteReporting = function (id) {
        // this.api.deleteReporting(id).subscribe({
        //   next:(res)=>{
        //     Swal.fire(
        //       'Good job!',
        //       'Reporting Deleted Successfully',
        //       'success'
        //     )
        //     this.getAllReporting();
        //   },
        //   error:(err)=>{
        //     Swal.fire({
        //       icon: 'error',
        //       title: 'Oops...',
        //       text: 'Something went wrong!',
        //       footer: err
        //     })
        //   }
        // })
    };
    JobStatusComponent.prototype.getAwaited = function () {
        var _this = this;
        this.api.getAllReporting().subscribe({
            next: function (res) {
                _this.allWaited = res.filter(function (x) {
                    if (x.status == 1 && x.pending_value > 0) {
                        x.status = 'Awaited';
                        return x;
                    }
                });
                console.log(_this.allWaited);
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
    JobStatusComponent.prototype.getInTraining = function () {
        var _this = this;
        this.api.getAllReporting().subscribe({
            next: function (res) {
                _this.allIntraining = res.filter(function (x) {
                    if (x.status == 2) {
                        x.status = 'In Training';
                        return x;
                    }
                });
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
    JobStatusComponent.prototype.getCompleteTraining = function () {
        var _this = this;
        this.api.getAllReporting().subscribe({
            next: function (res) {
                _this.allCompletetraining = res.filter(function (x) {
                    if (x.status == 3) {
                        x.status = 'Complete Training';
                        return x;
                    }
                });
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
    JobStatusComponent.prototype.getJoined = function () {
        var _this = this;
        this.api.getAllReporting().subscribe({
            next: function (res) {
                _this.allJoined = res.filter(function (x) {
                    if (x.status == 4) {
                        x.status = 'Joined';
                        return x;
                    }
                });
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
    JobStatusComponent.prototype.getLeft = function () {
        var _this = this;
        this.api.getAllReporting().subscribe({
            next: function (res) {
                _this.allLeft = res.filter(function (x) {
                    if (x.status == 5) {
                        x.status = 'Left';
                        return x;
                    }
                });
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
    JobStatusComponent.prototype.getAllid = function () {
        this.inPool = document.getElementById('inPool');
        this.awaited = document.getElementById('awaited');
        this.inTraining = document.getElementById('inTraining');
        this.trainingCompleted = document.getElementById('trainingCompleted');
        this.joinedStatus = document.getElementById('joinedStatus');
        this.leftStatus = document.getElementById('leftStatus');
        this.jobStatus = document.getElementById('jobStatus');
        this.relieving = document.getElementById('relieving');
    };
    JobStatusComponent.prototype.showPool = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.getAllid();
        (_a = this.inPool) === null || _a === void 0 ? void 0 : _a.removeAttribute('hidden');
        (_b = this.awaited) === null || _b === void 0 ? void 0 : _b.setAttribute('hidden', '');
        (_c = this.inTraining) === null || _c === void 0 ? void 0 : _c.setAttribute('hidden', '');
        (_d = this.trainingCompleted) === null || _d === void 0 ? void 0 : _d.setAttribute('hidden', '');
        (_e = this.joinedStatus) === null || _e === void 0 ? void 0 : _e.setAttribute('hidden', '');
        (_f = this.leftStatus) === null || _f === void 0 ? void 0 : _f.setAttribute('hidden', '');
        (_g = this.jobStatus) === null || _g === void 0 ? void 0 : _g.setAttribute('hidden', '');
        (_h = this.relieving) === null || _h === void 0 ? void 0 : _h.setAttribute('hidden', '');
    };
    JobStatusComponent.prototype.showJobStatus = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.getAllid();
        (_a = this.jobStatus) === null || _a === void 0 ? void 0 : _a.removeAttribute('hidden');
        (_b = this.awaited) === null || _b === void 0 ? void 0 : _b.setAttribute('hidden', '');
        (_c = this.inTraining) === null || _c === void 0 ? void 0 : _c.setAttribute('hidden', '');
        (_d = this.trainingCompleted) === null || _d === void 0 ? void 0 : _d.setAttribute('hidden', '');
        (_e = this.joinedStatus) === null || _e === void 0 ? void 0 : _e.setAttribute('hidden', '');
        (_f = this.leftStatus) === null || _f === void 0 ? void 0 : _f.setAttribute('hidden', '');
        (_g = this.inPool) === null || _g === void 0 ? void 0 : _g.setAttribute('hidden', '');
        (_h = this.relieving) === null || _h === void 0 ? void 0 : _h.setAttribute('hidden', '');
    };
    JobStatusComponent.prototype.showAwaited = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.getAllid();
        (_a = this.awaited) === null || _a === void 0 ? void 0 : _a.removeAttribute('hidden');
        (_b = this.inPool) === null || _b === void 0 ? void 0 : _b.setAttribute('hidden', '');
        (_c = this.inTraining) === null || _c === void 0 ? void 0 : _c.setAttribute('hidden', '');
        (_d = this.trainingCompleted) === null || _d === void 0 ? void 0 : _d.setAttribute('hidden', '');
        (_e = this.joinedStatus) === null || _e === void 0 ? void 0 : _e.setAttribute('hidden', '');
        (_f = this.leftStatus) === null || _f === void 0 ? void 0 : _f.setAttribute('hidden', '');
        (_g = this.jobStatus) === null || _g === void 0 ? void 0 : _g.setAttribute('hidden', '');
        (_h = this.relieving) === null || _h === void 0 ? void 0 : _h.setAttribute('hidden', '');
    };
    JobStatusComponent.prototype.showIntraining = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.getAllid();
        (_a = this.inTraining) === null || _a === void 0 ? void 0 : _a.removeAttribute('hidden');
        (_b = this.awaited) === null || _b === void 0 ? void 0 : _b.setAttribute('hidden', '');
        (_c = this.inPool) === null || _c === void 0 ? void 0 : _c.setAttribute('hidden', '');
        (_d = this.trainingCompleted) === null || _d === void 0 ? void 0 : _d.setAttribute('hidden', '');
        (_e = this.joinedStatus) === null || _e === void 0 ? void 0 : _e.setAttribute('hidden', '');
        (_f = this.leftStatus) === null || _f === void 0 ? void 0 : _f.setAttribute('hidden', '');
        (_g = this.jobStatus) === null || _g === void 0 ? void 0 : _g.setAttribute('hidden', '');
        (_h = this.relieving) === null || _h === void 0 ? void 0 : _h.setAttribute('hidden', '');
    };
    JobStatusComponent.prototype.showTrainingCompleted = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.getAllid();
        (_a = this.trainingCompleted) === null || _a === void 0 ? void 0 : _a.removeAttribute('hidden');
        (_b = this.awaited) === null || _b === void 0 ? void 0 : _b.setAttribute('hidden', '');
        (_c = this.inTraining) === null || _c === void 0 ? void 0 : _c.setAttribute('hidden', '');
        (_d = this.inPool) === null || _d === void 0 ? void 0 : _d.setAttribute('hidden', '');
        (_e = this.joinedStatus) === null || _e === void 0 ? void 0 : _e.setAttribute('hidden', '');
        (_f = this.leftStatus) === null || _f === void 0 ? void 0 : _f.setAttribute('hidden', '');
        (_g = this.jobStatus) === null || _g === void 0 ? void 0 : _g.setAttribute('hidden', '');
        (_h = this.relieving) === null || _h === void 0 ? void 0 : _h.setAttribute('hidden', '');
    };
    JobStatusComponent.prototype.showJoined = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.getAllid();
        (_a = this.joinedStatus) === null || _a === void 0 ? void 0 : _a.removeAttribute('hidden');
        (_b = this.awaited) === null || _b === void 0 ? void 0 : _b.setAttribute('hidden', '');
        (_c = this.inTraining) === null || _c === void 0 ? void 0 : _c.setAttribute('hidden', '');
        (_d = this.trainingCompleted) === null || _d === void 0 ? void 0 : _d.setAttribute('hidden', '');
        (_e = this.inPool) === null || _e === void 0 ? void 0 : _e.setAttribute('hidden', '');
        (_f = this.leftStatus) === null || _f === void 0 ? void 0 : _f.setAttribute('hidden', '');
        (_g = this.jobStatus) === null || _g === void 0 ? void 0 : _g.setAttribute('hidden', '');
        (_h = this.relieving) === null || _h === void 0 ? void 0 : _h.setAttribute('hidden', '');
    };
    JobStatusComponent.prototype.showLeft = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.getAllid();
        (_a = this.leftStatus) === null || _a === void 0 ? void 0 : _a.removeAttribute('hidden');
        (_b = this.awaited) === null || _b === void 0 ? void 0 : _b.setAttribute('hidden', '');
        (_c = this.inTraining) === null || _c === void 0 ? void 0 : _c.setAttribute('hidden', '');
        (_d = this.trainingCompleted) === null || _d === void 0 ? void 0 : _d.setAttribute('hidden', '');
        (_e = this.joinedStatus) === null || _e === void 0 ? void 0 : _e.setAttribute('hidden', '');
        (_f = this.inPool) === null || _f === void 0 ? void 0 : _f.setAttribute('hidden', '');
        (_g = this.jobStatus) === null || _g === void 0 ? void 0 : _g.setAttribute('hidden', '');
        (_h = this.relieving) === null || _h === void 0 ? void 0 : _h.setAttribute('hidden', '');
    };
    JobStatusComponent.prototype.showRelieving = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.getAllid();
        (_a = this.relieving) === null || _a === void 0 ? void 0 : _a.removeAttribute('hidden');
        (_b = this.leftStatus) === null || _b === void 0 ? void 0 : _b.setAttribute('hidden', '');
        (_c = this.awaited) === null || _c === void 0 ? void 0 : _c.setAttribute('hidden', '');
        (_d = this.inTraining) === null || _d === void 0 ? void 0 : _d.setAttribute('hidden', '');
        (_e = this.trainingCompleted) === null || _e === void 0 ? void 0 : _e.setAttribute('hidden', '');
        (_f = this.joinedStatus) === null || _f === void 0 ? void 0 : _f.setAttribute('hidden', '');
        (_g = this.inPool) === null || _g === void 0 ? void 0 : _g.setAttribute('hidden', '');
        (_h = this.jobStatus) === null || _h === void 0 ? void 0 : _h.setAttribute('hidden', '');
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], JobStatusComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], JobStatusComponent.prototype, "sort");
    JobStatusComponent = __decorate([
        core_1.Component({
            selector: 'app-job-status',
            templateUrl: './job-status.component.html',
            styleUrls: ['./job-status.component.css']
        })
    ], JobStatusComponent);
    return JobStatusComponent;
}());
exports.JobStatusComponent = JobStatusComponent;
