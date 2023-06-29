"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AssignComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var jwt_decode_1 = require("jwt-decode");
var change_state_model_component_1 = require("src/app/Model/change-state-model/change-state-model.component");
var sweetalert2_1 = require("sweetalert2");
var AssignComponent = /** @class */ (function () {
    function AssignComponent(dialog, api) {
        this.dialog = dialog;
        this.api = api;
        this.displayedColumns = ['id', 'tsk_id', 'ast_id', 'prt_id_name', 'clt_id_name', 'assign_to_dep', 'team_manager', 'task_description', 'task_expiry_date', 'assign_by', 'page_name', 'remarks', 'status'];
        this.data = [];
        this.finalData = [];
    }
    AssignComponent.prototype.ngOnInit = function () {
        this.getAllAssignedTask();
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.rpt_id = this.token.rpt_id;
    };
    AssignComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    AssignComponent.prototype.getAllAssignedTask = function () {
        var _this = this;
        this.api.getAllAssignedtask().subscribe({
            next: function (res) {
                _this.data = res.filter(function (x) {
                    if (x.status == 1 || x.status == 2 || x.status == 3 || x.status == 4) {
                        return x;
                    }
                });
                _this.data.map(function (x) {
                    if (x.status == 1) {
                        x.status = 'Assigned';
                    }
                    else if (x.status == 2) {
                        x.status = 'Performing';
                    }
                    else if (x.status == 3) {
                        x.status = 'Re-Assigned';
                    }
                    else if (x.status == 4) {
                        x.status = 'Applied For Check';
                    }
                    // else if(x.status==5){
                    //   x.status='Completed'
                    // }
                    // else if(x.status==6){
                    //   x.status='Failed'
                    // }
                    var val = x.task_assign_to.split(",");
                    var id = val[1];
                    var name = val[0];
                    x.task_assign_to = id + ' (' + name + ')';
                    x['rpt'] = id;
                });
                _this.finalData = [];
                _this.data.filter(function (y) {
                    if (y.rpt == _this.rpt_id) {
                        _this.finalData.push(y);
                    }
                });
                _this.dataSource = new table_1.MatTableDataSource(_this.finalData);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
                _this.changeDropdown(res.status);
            },
            error: function (err) {
                console.log(err);
                sweetalert2_1["default"].fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: err
                });
            }
        });
    };
    AssignComponent.prototype.changeDropdown = function (id) {
        var x = id;
        var assign = document.getElementById('1');
        var perform = document.getElementById('2');
        var reasign = document.getElementById('3');
        var applied = document.getElementById('4');
        var completed = document.getElementById('5');
        var failed = document.getElementById('6');
        if (x == 'Assigned') {
            assign === null || assign === void 0 ? void 0 : assign.setAttribute('hidden', '');
        }
        else if (x == 'Performing') {
            perform === null || perform === void 0 ? void 0 : perform.setAttribute('hidden', '');
        }
        else if (x == 'Re-Assigned') {
            reasign === null || reasign === void 0 ? void 0 : reasign.setAttribute('hidden', '');
        }
        else if (x == 'Applied For Check') {
            applied === null || applied === void 0 ? void 0 : applied.setAttribute('hidden', '');
        }
        else if (x == 'Completed') {
            completed === null || completed === void 0 ? void 0 : completed.setAttribute('hidden', '');
        }
        else if (x == 'Failed') {
            failed === null || failed === void 0 ? void 0 : failed.setAttribute('hidden', '');
        }
    };
    AssignComponent.prototype.changestate = function (event, data) {
        var _this = this;
        var Value = event.target.value;
        this.dialog.open(change_state_model_component_1.ChangeStateModelComponent, {
            width: '60%',
            data: { add: data, Status: Value }
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllAssignedTask();
            }
        });
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], AssignComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], AssignComponent.prototype, "sort");
    AssignComponent = __decorate([
        core_1.Component({
            selector: 'app-assign',
            templateUrl: './assign.component.html',
            styleUrls: ['./assign.component.css']
        })
    ], AssignComponent);
    return AssignComponent;
}());
exports.AssignComponent = AssignComponent;
