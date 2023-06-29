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
exports.HrMeetingModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var HrMeetingModelComponent = /** @class */ (function () {
    function HrMeetingModelComponent(formbuilder, dialog, editData, api, api2, api1) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.api2 = api2;
        this.api1 = api1;
        this.Submit = 'Add HR Meeting';
        this.data = [];
    }
    HrMeetingModelComponent.prototype.ngOnInit = function () {
        this.getAllShift();
        this.getAllLocation();
        this.getAlldepartment();
        this.getAllReporting();
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.hrMeetingForm = this.formbuilder.group({
            assign_to: ['', forms_1.Validators.required],
            invite_to: ['', forms_1.Validators.required],
            meeting_date: ['', forms_1.Validators.required],
            shift: ['', forms_1.Validators.required],
            meeting_start: ['', forms_1.Validators.required],
            meeting_end: ['', forms_1.Validators.required],
            meeting_location: ['', forms_1.Validators.required],
            meeting_name: ['', forms_1.Validators.required],
            meeting_description: ['', forms_1.Validators.required],
            meeting_remarks: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        if (this.editData) {
            this.Submit = "Update HR Meeting",
                this.hrMeetingForm.controls['assign_to'].setValue(this.editData.assign_to);
            this.hrMeetingForm.controls['invite_to'].setValue(this.editData.invite_to);
            this.hrMeetingForm.controls['meeting_date'].setValue(this.editData.meeting_date);
            this.hrMeetingForm.controls['shift'].setValue(this.editData.shift);
            this.hrMeetingForm.controls['meeting_start'].setValue(this.editData.meeting_start);
            this.hrMeetingForm.controls['meeting_end'].setValue(this.editData.meeting_end);
            this.hrMeetingForm.controls['meeting_location'].setValue(this.editData.meeting_location);
            this.hrMeetingForm.controls['meeting_name'].setValue(this.editData.meeting_name);
            this.hrMeetingForm.controls['meeting_description'].setValue(this.editData.meeting_description);
            this.hrMeetingForm.controls['meeting_remarks'].setValue(this.editData.meeting_remarks);
        }
    };
    HrMeetingModelComponent.prototype.addHrMeeting = function () {
        var _this = this;
        console.log(this.hrMeetingForm.value);
        if (!this.editData) {
            if (this.hrMeetingForm.value.assign_to == '' || this.hrMeetingForm.value.invite_to == '') {
                console.log('Fill All the fields');
            }
            else {
                this.api1.addHrMeeting(this.hrMeetingForm.value).subscribe({
                    next: function (res) {
                        // if(res.name=='ValidationError'){
                        //   this.errors=res.errors    
                        //   console.log(res)
                        //   //  this.errors=res.errors;
                        //   // this.errors.sort((x:any)=>{
                        //   //   console.log(x.message);
                        //   // })
                        // }
                        sweetalert2_1["default"].fire('Good job!', 'HR Meeting Added Successfully', 'success');
                        _this.hrMeetingForm.reset();
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
            this.updateHrMeeting();
        }
    };
    HrMeetingModelComponent.prototype.getAlldepartment = function () {
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
    HrMeetingModelComponent.prototype.updateHrMeeting = function () {
        var _this = this;
        this.api1.updateHrMeeting(this.editData._id, this.hrMeetingForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'HR Meeting Updated Successfully', 'success');
                _this.hrMeetingForm.reset();
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
    HrMeetingModelComponent.prototype.getrptId = function () {
        var value = this.hrMeetingForm.value.assign_to;
        var data = this.data.filter(function (x) {
            if (x.designation == value) {
                return x._id;
            }
        });
        this.value = data;
        var d = this.value.map(function (x) { return x._id; });
        this.hrMeetingForm.controls['invite_to'].setValue(d);
    };
    HrMeetingModelComponent.prototype.getAllReporting = function () {
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
    HrMeetingModelComponent.prototype.getAllLocation = function () {
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
    HrMeetingModelComponent.prototype.getAllShift = function () {
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
    HrMeetingModelComponent = __decorate([
        core_1.Component({
            selector: 'app-hr-meeting-model',
            templateUrl: './hr-meeting-model.component.html',
            styleUrls: ['./hr-meeting-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], HrMeetingModelComponent);
    return HrMeetingModelComponent;
}());
exports.HrMeetingModelComponent = HrMeetingModelComponent;
