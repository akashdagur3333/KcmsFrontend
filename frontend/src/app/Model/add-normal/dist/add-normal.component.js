"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddNormalComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var sweetalert2_1 = require("sweetalert2");
var add_normal_user_model_component_1 = require("../add-normal-user-model/add-normal-user-model.component");
var AddNormalComponent = /** @class */ (function () {
    function AddNormalComponent(dialog, api, dialog1) {
        this.dialog = dialog;
        this.api = api;
        this.dialog1 = dialog1;
        this.displayedColumns = ['id', 'rpt_id', 'type', 'name', 'sex', 'trn_start', 'trn_end', 'doj', 'job_status', 'action'];
    }
    AddNormalComponent.prototype.ngOnInit = function () {
        this.getAllJoined();
    };
    AddNormalComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    AddNormalComponent.prototype.getAllJoined = function () {
        var _this = this;
        this.api.getAllReporting().subscribe({
            next: function (res) {
                var data = res.filter(function (x) {
                    if (x.pending_value == 0 && x.status == 4) {
                        x.status = 'Joined';
                        return x;
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
    AddNormalComponent.prototype.AddUser = function (data) {
        var _this = this;
        this.dialog.open(add_normal_user_model_component_1.AddNormalUserModelComponent, {
            width: '50%',
            height: '80%',
            data: data
        })
            .afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.dialog1.close('Add');
            }
        });
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], AddNormalComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], AddNormalComponent.prototype, "sort");
    AddNormalComponent = __decorate([
        core_1.Component({
            selector: 'app-add-normal',
            templateUrl: './add-normal.component.html',
            styleUrls: ['./add-normal.component.css']
        })
    ], AddNormalComponent);
    return AddNormalComponent;
}());
exports.AddNormalComponent = AddNormalComponent;
