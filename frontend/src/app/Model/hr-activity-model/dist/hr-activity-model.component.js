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
exports.HrActivityModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var HrActivityModelComponent = /** @class */ (function () {
    function HrActivityModelComponent(formbuilder, dialog, editData, api, api2, api1) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.api2 = api2;
        this.api1 = api1;
        this.Submit = 'Add HR Activity';
        this.data = [];
    }
    HrActivityModelComponent.prototype.ngOnInit = function () {
        this.getAllShift();
        this.getAllLocation();
        this.getAlldepartment();
        this.getAllReporting();
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.hrActivityForm = this.formbuilder.group({
            assign_to: ['', forms_1.Validators.required],
            invite_to: ['', forms_1.Validators.required],
            assign_date: ['', forms_1.Validators.required],
            shift: ['', forms_1.Validators.required],
            activity_start: ['', forms_1.Validators.required],
            activity_end: ['', forms_1.Validators.required],
            activity_location: ['', forms_1.Validators.required],
            activity_name: ['', forms_1.Validators.required],
            activity_description: ['', forms_1.Validators.required],
            hr_remarks: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        if (this.editData) {
            this.Submit = "Update HR Activity",
                this.hrActivityForm.controls['assign_to'].setValue(this.editData.assign_to);
            this.hrActivityForm.controls['invite_to'].setValue(this.editData.invite_to);
            this.hrActivityForm.controls['assign_date'].setValue(this.editData.assign_date);
            this.hrActivityForm.controls['shift'].setValue(this.editData.shift);
            this.hrActivityForm.controls['activity_start'].setValue(this.editData.activity_start);
            this.hrActivityForm.controls['activity_end'].setValue(this.editData.activity_end);
            this.hrActivityForm.controls['activity_location'].setValue(this.editData.activity_location);
            this.hrActivityForm.controls['activity_name'].setValue(this.editData.activity_name);
            this.hrActivityForm.controls['activity_description'].setValue(this.editData.activity_description);
            this.hrActivityForm.controls['hr_remarks'].setValue(this.editData.hr_remarks);
        }
    };
    HrActivityModelComponent.prototype.addHrActivity = function () {
        var _this = this;
        console.log(this.hrActivityForm.value);
        if (!this.editData) {
            if (this.hrActivityForm.value.assign_to == '' || this.hrActivityForm.value.invite_to == '') {
                console.log('Fill All the fields');
            }
            else {
                this.api1.addHrActivity(this.hrActivityForm.value).subscribe({
                    next: function (res) {
                        // if(res.name=='ValidationError'){
                        //   this.errors=res.errors    
                        //   console.log(res)
                        //   //  this.errors=res.errors;
                        //   // this.errors.sort((x:any)=>{
                        //   //   console.log(x.message);
                        //   // })
                        // }
                        sweetalert2_1["default"].fire('Good job!', 'HR Activity Added Successfully', 'success');
                        _this.hrActivityForm.reset();
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
            this.updateHrActivity();
        }
    };
    HrActivityModelComponent.prototype.getAlldepartment = function () {
        var _this = this;
        this.api.getAllDesignation().subscribe({
            next: function (res) {
                _this.allDepartment = res;
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
    HrActivityModelComponent.prototype.updateHrActivity = function () {
        var _this = this;
        this.api1.updateHrActivity(this.editData._id, this.hrActivityForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'HR Activity Updated Successfully', 'success');
                _this.hrActivityForm.reset();
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
    HrActivityModelComponent.prototype.getrptId = function () {
        var value = this.hrActivityForm.value.assign_to;
        var data = this.data.filter(function (x) {
            if (x.designation == value) {
                return x._id;
            }
        });
        this.value = data;
        var d = this.value.map(function (x) { return x._id; });
        this.hrActivityForm.controls['invite_to'].setValue(d);
    };
    HrActivityModelComponent.prototype.getAllReporting = function () {
        var _this = this;
        this.api2.getAllReporting().subscribe({
            next: function (res) {
                _this.data = res;
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    HrActivityModelComponent.prototype.getAllLocation = function () {
        var _this = this;
        this.api.getAllLocation().subscribe({
            next: function (res) {
                _this.allLocation = res;
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    HrActivityModelComponent.prototype.getAllShift = function () {
        var _this = this;
        this.api.getAllShift().subscribe({
            next: function (res) {
                _this.allShift = res;
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    HrActivityModelComponent = __decorate([
        core_1.Component({
            selector: 'app-hr-activity-model',
            templateUrl: './hr-activity-model.component.html',
            styleUrls: ['./hr-activity-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], HrActivityModelComponent);
    return HrActivityModelComponent;
}());
exports.HrActivityModelComponent = HrActivityModelComponent;
