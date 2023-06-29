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
exports.AddAssignTaskModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var AddAssignTaskModelComponent = /** @class */ (function () {
    function AddAssignTaskModelComponent(formbuilder, dialog, editData, api, api1) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.api1 = api1;
        this.Submit = 'Add Project';
        this.teamLead = [];
        this.AllTeam = [];
        this.AllDep = [];
    }
    AddAssignTaskModelComponent.prototype.ngOnInit = function () {
        this.getAllTeam();
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.AssignedTaskForm = this.formbuilder.group({
            tsk_id: ['', forms_1.Validators.required],
            ast_id: ['', forms_1.Validators.required],
            clt_id: ['', forms_1.Validators.required],
            prt_id: ['', forms_1.Validators.required],
            project_name: ['', forms_1.Validators.required],
            client_name: ['', forms_1.Validators.required],
            assign_to_department: ['', forms_1.Validators.required],
            assign_by: ['', forms_1.Validators.required],
            rpt_team_lead: ['', forms_1.Validators.required],
            page_name: ['', forms_1.Validators.required],
            task_description: ['', forms_1.Validators.required],
            task_assign_to: ['', forms_1.Validators.required],
            task_expiry_date: ['', forms_1.Validators.required],
            remarks: ['', forms_1.Validators.required],
            status: 1,
            created_by: this.createdBy
        });
        if (this.editData.add) {
            this.allData = this.editData.add;
            var teamData = this.editData.add.team_lead.split(" ");
            var team_lead_name = teamData[1];
            this.Submit = "Add Total Task";
            this.AssignedTaskForm.controls['tsk_id'].setValue(this.editData.add._id);
            this.AssignedTaskForm.controls['ast_id'].setValue(this.editData.add.ast_id);
            this.AssignedTaskForm.controls['clt_id'].setValue(this.editData.add.clt_id);
            this.AssignedTaskForm.controls['prt_id'].setValue(this.editData.add.prt_id);
            this.AssignedTaskForm.controls['project_name'].setValue(this.editData.add.project_name);
            this.AssignedTaskForm.controls['client_name'].setValue(this.editData.add.client_name);
            this.AssignedTaskForm.controls['page_name'].setValue(this.editData.add.page_name);
            this.AssignedTaskForm.controls['task_description'].setValue(this.editData.add.task_description);
            this.AssignedTaskForm.controls['assign_to_department'].setValue(this.editData.add.assign_to_department);
            this.AssignedTaskForm.controls['rpt_team_lead'].setValue(teamData[0]);
            this.AssignedTaskForm.controls['assign_by'].setValue(teamData[0]);
            this.getAllDepartment(this.AssignedTaskForm.value.rpt_team_lead);
            this.rpt_team_lead = this.AssignedTaskForm.value.rpt_team_lead;
        }
        else if (this.editData.edit) {
            var value = document.getElementById('hidden');
            var value2 = document.getElementById('hidden2');
            var value3 = document.getElementById('hidden3');
            value === null || value === void 0 ? void 0 : value.setAttribute('hidden', '');
            value2 === null || value2 === void 0 ? void 0 : value2.setAttribute('hidden', '');
            value3 === null || value3 === void 0 ? void 0 : value3.setAttribute('hidden', '');
            this.allData = this.editData.edit;
            this.Submit = "Update Total Task";
            this.AssignedTaskForm.controls['page_name'].setValue(this.editData.edit.page_name);
            this.AssignedTaskForm.controls['task_description'].setValue(this.editData.edit.task_description);
            this.AssignedTaskForm.controls['remarks'].setValue(this.editData.edit.remarks);
        }
    };
    AddAssignTaskModelComponent.prototype.leadChange = function () {
        var id = this.AssignedTaskForm.value.assign_by;
        this.AssignedTaskForm.controls['rpt_team_lead'].setValue(id);
        this.rpt_team_lead = this.AssignedTaskForm.value.rpt_team_lead;
        this.getAllDepartment(id);
    };
    AddAssignTaskModelComponent.prototype.addAssignedTask = function () {
        var _this = this;
        if (!this.editData.edit) {
            if (this.AssignedTaskForm.value.client_name == '' || this.AssignedTaskForm.value.project_name == '') {
                console.log('Fill All the fields');
            }
            else {
                this.api.addAssignedtask(this.AssignedTaskForm.value).subscribe({
                    next: function (res) {
                        sweetalert2_1["default"].fire('Good job!', 'Assigned Added Successfully', 'success');
                        _this.AssignedTaskForm.reset();
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
            this.updateTotalTask();
        }
    };
    AddAssignTaskModelComponent.prototype.updateTotalTask = function () {
        var _this = this;
        this.api.updateTotaltask(this.editData.edit._id, this.AssignedTaskForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Task Updated Successfully', 'success');
                _this.AssignedTaskForm.reset();
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
    AddAssignTaskModelComponent.prototype.getAllTeam = function () {
        var _this = this;
        this.api.getAllTeam().subscribe({
            next: function (res) {
                res.map(function (x) {
                    if (x.team_lead[0].team_lead_department == _this.AssignedTaskForm.value.assign_to_department) {
                        _this.teamLead.push({ name: x.team_lead[0].team_lead_name, rpt: x.team_lead[0].team_lead_rpt_id });
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
    AddAssignTaskModelComponent.prototype.getAllDepartment = function (id) {
        var _this = this;
        this.AllDep = [];
        this.api1.getAllReporting().subscribe({
            next: function (res) {
                res.filter(function (x) {
                    if (x.subDepartment == _this.AssignedTaskForm.value.assign_to_department && x.status == 4 && x._id != id) {
                        _this.AllDep.push({ name: x.employee_name, rpt_id: x._id });
                    }
                });
                console.log(_this.AllDep);
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
    AddAssignTaskModelComponent = __decorate([
        core_1.Component({
            selector: 'app-add-assign-task-model',
            templateUrl: './add-assign-task-model.component.html',
            styleUrls: ['./add-assign-task-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AddAssignTaskModelComponent);
    return AddAssignTaskModelComponent;
}());
exports.AddAssignTaskModelComponent = AddAssignTaskModelComponent;
