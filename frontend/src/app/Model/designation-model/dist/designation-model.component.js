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
exports.DesignationModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var DesignationModelComponent = /** @class */ (function () {
    function DesignationModelComponent(formbuilder, dialog, editData, api) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.Submit = 'Add Designation';
    }
    DesignationModelComponent.prototype.ngOnInit = function () {
        this.getAlldepartment();
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.designationForm = this.formbuilder.group({
            head_department: ['', forms_1.Validators.required],
            designation: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        if (this.editData) {
            this.Submit = "Update Designation",
                this.designationForm.controls['head_department'].setValue(this.editData.head_department);
            this.designationForm.controls['designation'].setValue(this.editData.designation);
        }
    };
    DesignationModelComponent.prototype.addDesignation = function () {
        var _this = this;
        if (!this.editData) {
            if (this.designationForm.value.head_department == '' || this.designationForm.value.designation == '') {
                console.log('Fill All the fields');
            }
            else {
                this.api.addDesignation(this.designationForm.value).subscribe({
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
                        sweetalert2_1["default"].fire('Good job!', 'Designation Added Successfully', 'success');
                        _this.designationForm.reset();
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
            this.updateDesignation();
        }
    };
    DesignationModelComponent.prototype.getAlldepartment = function () {
        var _this = this;
        this.api.getAllDepartment().subscribe({
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
    DesignationModelComponent.prototype.updateDesignation = function () {
        var _this = this;
        this.api.updateDesignation(this.editData._id, this.designationForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Designation Updated Successfully', 'success');
                _this.designationForm.reset();
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
    DesignationModelComponent = __decorate([
        core_1.Component({
            selector: 'app-designation-model',
            templateUrl: './designation-model.component.html',
            styleUrls: ['./designation-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DesignationModelComponent);
    return DesignationModelComponent;
}());
exports.DesignationModelComponent = DesignationModelComponent;
