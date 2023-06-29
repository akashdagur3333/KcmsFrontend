"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FailComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var FailComponent = /** @class */ (function () {
    function FailComponent(dialog, api) {
        this.dialog = dialog;
        this.api = api;
        this.displayedColumns = ['id', 'tsk_id', 'ast_id', 'prt_id_name', 'clt_id_name', 'assign_to_dep', 'team_manager', 'task_description', 'task_expiry_date', 'assign_by', 'page_name', 'remarks', 'status'];
    }
    FailComponent.prototype.ngOnInit = function () {
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.rpt_id = this.token.rpt_id;
        this.getAllFailedTask();
    };
    FailComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    FailComponent.prototype.getAllFailedTask = function () {
        var _this = this;
        this.api.getAllAssignedtask().subscribe({
            next: function (res) {
                var data = res.filter(function (x) {
                    if (x.status == 6) {
                        x.status = 'Failed';
                        var val = x.task_assign_to.split(",");
                        var id = val[1];
                        var name = val[0];
                        if (id == _this.rpt_id) {
                            x.task_assign_to = id + ' (' + name + ')';
                            return x;
                        }
                    }
                });
                _this.dataSource = new table_1.MatTableDataSource(data);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
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
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], FailComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], FailComponent.prototype, "sort");
    FailComponent = __decorate([
        core_1.Component({
            selector: 'app-fail',
            templateUrl: './fail.component.html',
            styleUrls: ['./fail.component.css']
        })
    ], FailComponent);
    return FailComponent;
}());
exports.FailComponent = FailComponent;
