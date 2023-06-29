"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.TeammemberModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var TeammemberModelComponent = /** @class */ (function () {
    function TeammemberModelComponent(formbuilder, dialog, api2, api, editData) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.api2 = api2;
        this.api = api;
        this.editData = editData;
        this.Allmember = [];
        this.member = [];
        this.saveTeamMember = [];
        this.displayedColumns = ['id', 'rpt_id', 'type', 'name', 'sex', 'trn_start', 'trn_end', 'doj', 'job_status', 'action'];
    }
    TeammemberModelComponent.prototype.ngOnInit = function () {
        this.allData = this.editData;
        this.getAllJoined();
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.teamForm = this.formbuilder.group({
            team_lead_rpt_id: ['', forms_1.Validators.required],
            team_lead_name: ['', forms_1.Validators.required],
            team_lead_department: ['', forms_1.Validators.required],
            team_member: [],
            created_by: this.createdBy
        });
        this.teamForm.controls['team_lead_rpt_id'].setValue(this.editData._id);
        this.teamForm.controls['team_lead_name'].setValue(this.editData.employee_name);
        this.teamForm.controls['team_lead_department'].setValue(this.editData.subDepartment);
    };
    TeammemberModelComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    TeammemberModelComponent.prototype.applyFilter1 = function (event) {
        var filterValue = event.target.value;
        this.dataSource1.filter = filterValue.trim().toLowerCase();
        if (this.dataSource1.paginator) {
            this.dataSource1.paginator.firstPage();
        }
    };
    TeammemberModelComponent.prototype.getAllJoined = function () {
        var _this = this;
        this.api.getAllReporting().subscribe({
            next: function (res) {
                var data = res.filter(function (x) {
                    if (x.pending_value == 0 && x.status == 4 && x._id != _this.editData._id) {
                        x.status = 'Joined';
                        return x;
                    }
                });
                _this.Allmember = data;
                _this.dataSource = new table_1.MatTableDataSource(_this.Allmember);
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
    TeammemberModelComponent.prototype.AddMember = function (data) {
        var index = this.Allmember.findIndex(function (x) { return x._id == data._id; });
        if (index > -1) {
            this.Allmember.splice(index, 1);
            this.dataSource = new table_1.MatTableDataSource(this.Allmember);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
        this.member.push(data);
        this.dataSource1 = new table_1.MatTableDataSource(this.member);
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort;
    };
    TeammemberModelComponent.prototype.removeMember = function (data) {
        var index = this.member.findIndex(function (x) { return x._id == data._id; });
        if (index > -1) {
            this.member.splice(index, 1);
            this.dataSource1 = new table_1.MatTableDataSource(this.member);
            this.dataSource1.paginator = this.paginator;
            this.dataSource1.sort = this.sort;
        }
        this.Allmember.push(data);
        this.dataSource = new table_1.MatTableDataSource(this.Allmember);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    TeammemberModelComponent.prototype.addTeam = function () {
        var _this = this;
        this.member.map(function (x) {
            _this.saveTeamMember.push({ _id: x._id, name: x.employee_name, department: x.designation });
            _this.teamForm.controls['team_member'].setValue(_this.saveTeamMember);
        });
        this.api2.addTeam(this.teamForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Team Added Successfully', 'success');
                _this.teamForm.reset();
                _this.dialog.close('Add');
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
    ], TeammemberModelComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], TeammemberModelComponent.prototype, "sort");
    TeammemberModelComponent = __decorate([
        core_1.Component({
            selector: 'app-teammember-model',
            templateUrl: './teammember-model.component.html',
            styleUrls: ['./teammember-model.component.css']
        }),
        __param(4, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], TeammemberModelComponent);
    return TeammemberModelComponent;
}());
exports.TeammemberModelComponent = TeammemberModelComponent;
