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
exports.DriveModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var DriveModelComponent = /** @class */ (function () {
    function DriveModelComponent(formbuilder, dialog, editData, api) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.Submit = 'Add Drive';
    }
    DriveModelComponent.prototype.ngOnInit = function () {
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        console.log(this.editData.college);
        this.driveForm = this.formbuilder.group({
            clg_id: 'CLG' + this.editData.id1,
            clg_name: this.editData.college.college_name,
            college_city: this.editData.college.college_city,
            college_state: this.editData.college.college_state,
            college_pin_code: this.editData.college.college_pin_code,
            college_type: this.editData.college.college_type,
            drive_type: ['', forms_1.Validators.required],
            drive_date: ['', forms_1.Validators.required],
            team_lead: ['', forms_1.Validators.required],
            hr_name: ['', forms_1.Validators.required],
            technical_person: ['', forms_1.Validators.required],
            mode_of_travel: ['', forms_1.Validators.required],
            travel_type: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        if (this.editData.data) {
            this.Submit = "Update Drive",
                this.driveForm.controls['clg_id'].setValue('CLG' + this.editData.data._id);
            this.driveForm.controls['drive_type'].setValue(this.editData.data.drive_type);
            this.driveForm.controls['drive_date'].setValue(this.editData.data.drive_date);
            this.driveForm.controls['team_lead'].setValue(this.editData.data.team_lead);
            this.driveForm.controls['hr_name'].setValue(this.editData.data.hr_name);
            this.driveForm.controls['technical_person'].setValue(this.editData.data.technical_person);
            this.driveForm.controls['mode_of_travel'].setValue(this.editData.data.mode_of_travel);
            this.driveForm.controls['travel_type'].setValue(this.editData.data.travel_type);
            this.driveForm.controls['submit_by'].setValue(this.editData.data.submit_by);
        }
        // var start=8;
        // var end =20;
        // for(var i=start;i>=end;i++){
        //   if(i%2==0){
        //     // this.batch_size.push(i)
        //     console.log(i)
        //   }
        // }
        // console.log('hey')
    };
    DriveModelComponent.prototype.addDrives = function () {
        var _this = this;
        if (!this.editData.data) {
            if (this.driveForm.value.drive_type == '' || this.driveForm.value.drive_date == '' || this.driveForm.value.team_lead == '' || this.driveForm.value.hr_name == '' || this.driveForm.value.technical_person == '') {
                console.log('Fill All the fields');
            }
            else {
                this.api.addDrives(this.driveForm.value).subscribe({
                    next: function (res) {
                        if (res.name == 'ValidationError') {
                            _this.errors = res.errors;
                            console.log(res.errors);
                            //  this.errors=res.errors;
                            // this.errors.sort((x:any)=>{
                            //   console.log(x.message);
                            // })
                        }
                        sweetalert2_1["default"].fire('Good job!', 'Drive Added Successfully', 'success');
                        _this.driveForm.reset();
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
            this.updateColleges();
        }
    };
    DriveModelComponent.prototype.updateColleges = function () {
        var _this = this;
        console.log(this.editData.data._id, this.driveForm.value);
        this.api.updateDrives(this.editData.data._id, this.driveForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Drive Updated Successfully', 'success');
                _this.driveForm.reset();
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
    DriveModelComponent.prototype.drive_type = function () {
        var data = this.driveForm.value.drive_type;
        var mode_of_travel = document.getElementById('mode_of_travel');
        var travel_type = document.getElementById('travel_type');
        if (data == 'Virtual Placement') {
            mode_of_travel === null || mode_of_travel === void 0 ? void 0 : mode_of_travel.setAttribute('hidden', '');
            travel_type === null || travel_type === void 0 ? void 0 : travel_type.setAttribute('hidden', '');
        }
        else {
            mode_of_travel === null || mode_of_travel === void 0 ? void 0 : mode_of_travel.removeAttribute('hidden');
            travel_type === null || travel_type === void 0 ? void 0 : travel_type.removeAttribute('hidden');
        }
    };
    DriveModelComponent = __decorate([
        core_1.Component({
            selector: 'app-drive-model',
            templateUrl: './drive-model.component.html',
            styleUrls: ['./drive-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DriveModelComponent);
    return DriveModelComponent;
}());
exports.DriveModelComponent = DriveModelComponent;
