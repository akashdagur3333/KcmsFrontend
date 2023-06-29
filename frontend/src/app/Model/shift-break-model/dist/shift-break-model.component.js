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
exports.ShiftBreakModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var ShiftBreakModelComponent = /** @class */ (function () {
    function ShiftBreakModelComponent(formbuilder, dialog, editData, api) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.Submit = 'Add Shift';
    }
    ShiftBreakModelComponent.prototype.ngOnInit = function () {
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.shiftBreakForm = this.formbuilder.group({
            shift_name: ['', forms_1.Validators.required],
            shift_start: ['', forms_1.Validators.required],
            shift_end: ['', forms_1.Validators.required],
            shift_description: ['', forms_1.Validators.required],
            break1: ['', forms_1.Validators.required],
            break1_duration: ['', forms_1.Validators.required],
            break2: ['', forms_1.Validators.required],
            break2_duration: ['', forms_1.Validators.required],
            break3: ['', forms_1.Validators.required],
            break3_duration: ['', forms_1.Validators.required],
            status: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        if (this.editData) {
            this.Submit = "Update Shift";
            var status = this.editData.status;
            if (status == 'Active') {
                status = 1;
            }
            else {
                status = 0;
            }
            this.shiftBreakForm.controls['shift_name'].setValue(this.editData.shift_name);
            this.shiftBreakForm.controls['shift_start'].setValue(this.editData.shift_start);
            this.shiftBreakForm.controls['shift_end'].setValue(this.editData.shift_end);
            this.shiftBreakForm.controls['shift_description'].setValue(this.editData.shift_description);
            this.shiftBreakForm.controls['break1'].setValue(this.editData.break1);
            this.shiftBreakForm.controls['break1_duration'].setValue(this.editData.break1_duration);
            this.shiftBreakForm.controls['break2'].setValue(this.editData.break2);
            this.shiftBreakForm.controls['break2_duration'].setValue(this.editData.break2_duration);
            this.shiftBreakForm.controls['break3'].setValue(this.editData.break3);
            this.shiftBreakForm.controls['break3_duration'].setValue(this.editData.break3_duration);
            this.shiftBreakForm.controls['status'].setValue(status);
        }
    };
    ShiftBreakModelComponent.prototype.addShiftBreak = function () {
        var _this = this;
        if (!this.editData) {
            if (this.shiftBreakForm.value.shift_name == '' || this.shiftBreakForm.value.shift_start == '' || this.shiftBreakForm.value.shift_end == '') {
                console.log('Fill All the fields');
            }
            else {
                this.api.addShift(this.shiftBreakForm.value).subscribe({
                    next: function (res) {
                        console.log(res);
                        // if(res.name=='ValidationError'){
                        //   this.errors=res.errors    
                        //   console.log(res)
                        //   //  this.errors=res.errors;
                        //   // this.errors.sort((x:any)=>{
                        //   //   console.log(x.message);
                        //   // })
                        // }
                        sweetalert2_1["default"].fire('Good job!', 'Shift Added Successfully', 'success');
                        _this.shiftBreakForm.reset();
                        _this.dialog.close("Add");
                    },
                    error: function (err) {
                        console.log(err);
                        // Swal.fire({
                        //   icon: 'error',
                        //   title: 'Oops...',
                        //   text: 'Something went wrong!',
                        //   footer: err
                        // })
                    }
                });
            }
        }
        else {
            this.updateShift();
        }
    };
    ShiftBreakModelComponent.prototype.updateShift = function () {
        var _this = this;
        this.api.updateShift(this.editData._id, this.shiftBreakForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Shift Updated Successfully', 'success');
                _this.shiftBreakForm.reset();
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
    ShiftBreakModelComponent = __decorate([
        core_1.Component({
            selector: 'app-shift-break-model',
            templateUrl: './shift-break-model.component.html',
            styleUrls: ['./shift-break-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ShiftBreakModelComponent);
    return ShiftBreakModelComponent;
}());
exports.ShiftBreakModelComponent = ShiftBreakModelComponent;
