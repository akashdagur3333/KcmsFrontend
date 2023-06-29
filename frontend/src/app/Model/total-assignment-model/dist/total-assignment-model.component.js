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
exports.TotalAssignmentModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var TotalAssignmentModelComponent = /** @class */ (function () {
    function TotalAssignmentModelComponent(formbuilder, dialog, editData, api, api1) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.api1 = api1;
        this.Submit = 'Add Project';
        this.teamLead = [];
        this.AllTeam = [];
    }
    TotalAssignmentModelComponent.prototype.ngOnInit = function () {
        this.getAllSubDepartment();
        this.getAllTeam();
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.AssignmentForm = this.formbuilder.group({
            clt_id: ['', forms_1.Validators.required],
            prt_id: ['', forms_1.Validators.required],
            project_name: ['', forms_1.Validators.required],
            client_name: ['', forms_1.Validators.required],
            assign_to_department: ['', forms_1.Validators.required],
            team_lead: ['', forms_1.Validators.required],
            assignment_date: ['', forms_1.Validators.required],
            delivery_date: ['', forms_1.Validators.required],
            remarks: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        if (this.editData.add) {
            this.allData = this.editData.add;
            this.Submit = "Add Total Assignment";
            this.AssignmentForm.controls['clt_id'].setValue(this.editData.add.clt_id);
            this.AssignmentForm.controls['prt_id'].setValue(this.editData.add._id);
            this.AssignmentForm.controls['project_name'].setValue(this.editData.add.project_name);
            this.AssignmentForm.controls['client_name'].setValue(this.editData.add.client_name);
        }
        else if (this.editData.edit) {
            this.loadTeamLead(this.editData.edit.assign_to_department);
            console.log(this.AllTeam);
            var value = document.getElementById('hidden');
            var value2 = document.getElementById('hidden2');
            value === null || value === void 0 ? void 0 : value.setAttribute('hidden', '');
            value2 === null || value2 === void 0 ? void 0 : value2.setAttribute('hidden', '');
            this.allData = this.editData.edit;
            this.Submit = "Update Total Assignment";
            console.log(this.editData.edit.team_lead);
            this.AssignmentForm.controls['assign_to_department'].setValue(this.editData.edit.assign_to_department);
            this.AssignmentForm.controls['team_lead'].setValue(this.editData.edit.team_lead);
            this.AssignmentForm.controls['assignment_date'].setValue(this.editData.edit.assignment_date);
            this.AssignmentForm.controls['delivery_date'].setValue(this.editData.edit.delivery_date);
            this.AssignmentForm.controls['remarks'].setValue(this.editData.edit.remarks);
        }
    };
    TotalAssignmentModelComponent.prototype.addAssignment = function () {
        var _this = this;
        if (!this.editData.edit) {
            if (this.AssignmentForm.value.client_name == '' || this.AssignmentForm.value.project_name == '') {
                console.log('Fill All the fields');
            }
            else {
                this.api.addTotalAssignment(this.AssignmentForm.value).subscribe({
                    next: function (res) {
                        console.log(res);
                        sweetalert2_1["default"].fire('Good job!', 'Assignment Added Successfully', 'success');
                        _this.AssignmentForm.reset();
                        _this.dialog.close("Add");
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
            }
        }
        else {
            this.updateAssignment();
        }
    };
    TotalAssignmentModelComponent.prototype.updateAssignment = function () {
        var _this = this;
        this.api.updateTotalAssignment(this.editData.edit._id, this.AssignmentForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Assignment Updated Successfully', 'success');
                _this.AssignmentForm.reset();
                _this.dialog.close("Update");
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
    TotalAssignmentModelComponent.prototype.getAllSubDepartment = function () {
        var _this = this;
        this.api1.getAllSubdepartment().subscribe({
            next: function (res) {
                _this.AllSubDepartment = res;
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
    TotalAssignmentModelComponent.prototype.getAllTeam = function () {
        var _this = this;
        this.api.getAllTeam().subscribe({
            next: function (res) {
                _this.teamLead = res;
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    TotalAssignmentModelComponent.prototype.loadTeamLead = function (value) {
        var _this = this;
        this.AllTeam = [];
        //  const value=this.AssignmentForm.value.assign_to_department;
        this.teamLead.find(function (x) {
            if (x.team_lead[0].team_lead_department == value) {
                _this.AllTeam.push({ name: x.team_lead[0].team_lead_name, rpt_id: x.team_lead[0].team_lead_rpt_id });
            }
        });
    };
    TotalAssignmentModelComponent.prototype.onemore = function () {
        var _this = this;
        this.AllTeam = [];
        var value = this.AssignmentForm.value.assign_to_department;
        this.teamLead.find(function (x) {
            if (x.team_lead[0].team_lead_department == value) {
                _this.AllTeam.push({ name: x.team_lead[0].team_lead_name, rpt_id: x.team_lead[0].team_lead_rpt_id });
            }
        });
        //  this.teamLead.find((x:any)=>{
        //   console.log(x)
        //  })
    };
    TotalAssignmentModelComponent = __decorate([
        core_1.Component({
            selector: 'app-total-assignment-model',
            templateUrl: './total-assignment-model.component.html',
            styleUrls: ['./total-assignment-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], TotalAssignmentModelComponent);
    return TotalAssignmentModelComponent;
}());
exports.TotalAssignmentModelComponent = TotalAssignmentModelComponent;
