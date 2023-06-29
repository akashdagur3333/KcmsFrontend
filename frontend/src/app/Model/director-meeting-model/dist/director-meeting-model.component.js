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
exports.DirectorMeetingModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var DirectorMeetingModelComponent = /** @class */ (function () {
    function DirectorMeetingModelComponent(formbuilder, dialog, editData, api, api2, api1) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.api2 = api2;
        this.api1 = api1;
        this.Submit = 'Add Director Meeting';
        this.data = [];
    }
    DirectorMeetingModelComponent.prototype.ngOnInit = function () {
        this.getAllShift();
        this.getAllLocation();
        this.getAlldepartment();
        this.getAllReporting();
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.directorMeetingForm = this.formbuilder.group({
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
            this.Submit = "Update Director Meeting",
                this.directorMeetingForm.controls['assign_to'].setValue(this.editData.assign_to);
            this.directorMeetingForm.controls['invite_to'].setValue(this.editData.invite_to);
            this.directorMeetingForm.controls['meeting_date'].setValue(this.editData.meeting_date);
            this.directorMeetingForm.controls['shift'].setValue(this.editData.shift);
            this.directorMeetingForm.controls['meeting_start'].setValue(this.editData.meeting_start);
            this.directorMeetingForm.controls['meeting_end'].setValue(this.editData.meeting_end);
            this.directorMeetingForm.controls['meeting_location'].setValue(this.editData.meeting_location);
            this.directorMeetingForm.controls['meeting_name'].setValue(this.editData.meeting_name);
            this.directorMeetingForm.controls['meeting_description'].setValue(this.editData.meeting_description);
            this.directorMeetingForm.controls['meeting_remarks'].setValue(this.editData.meeting_remarks);
        }
    };
    DirectorMeetingModelComponent.prototype.addHrMeeting = function () {
        var _this = this;
        console.log(this.directorMeetingForm.value);
        if (!this.editData) {
            if (this.directorMeetingForm.value.assign_to == '' || this.directorMeetingForm.value.invite_to == '') {
                console.log('Fill All the fields');
            }
            else {
                this.api1.addDirectorMeeting(this.directorMeetingForm.value).subscribe({
                    next: function (res) {
                        // if(res.name=='ValidationError'){
                        //   this.errors=res.errors    
                        //   console.log(res)
                        //   //  this.errors=res.errors;
                        //   // this.errors.sort((x:any)=>{
                        //   //   console.log(x.message);
                        //   // })
                        // }
                        sweetalert2_1["default"].fire('Good job!', 'Director Meeting Added Successfully', 'success');
                        _this.directorMeetingForm.reset();
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
            this.updateDirectorMeeting();
        }
    };
    DirectorMeetingModelComponent.prototype.getAlldepartment = function () {
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
    DirectorMeetingModelComponent.prototype.updateDirectorMeeting = function () {
        var _this = this;
        this.api1.updateDirectorMeeting(this.editData._id, this.directorMeetingForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Director Meeting Updated Successfully', 'success');
                _this.directorMeetingForm.reset();
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
    DirectorMeetingModelComponent.prototype.getrptId = function () {
        var value = this.directorMeetingForm.value.assign_to;
        var data = this.data.filter(function (x) {
            if (x.designation == value) {
                return x._id;
            }
        });
        this.value = data;
        var d = this.value.map(function (x) { return x._id; });
        this.directorMeetingForm.controls['invite_to'].setValue(d);
    };
    DirectorMeetingModelComponent.prototype.getAllReporting = function () {
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
    DirectorMeetingModelComponent.prototype.getAllLocation = function () {
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
    DirectorMeetingModelComponent.prototype.getAllShift = function () {
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
    DirectorMeetingModelComponent = __decorate([
        core_1.Component({
            selector: 'app-director-meeting-model',
            templateUrl: './director-meeting-model.component.html',
            styleUrls: ['./director-meeting-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DirectorMeetingModelComponent);
    return DirectorMeetingModelComponent;
}());
exports.DirectorMeetingModelComponent = DirectorMeetingModelComponent;
