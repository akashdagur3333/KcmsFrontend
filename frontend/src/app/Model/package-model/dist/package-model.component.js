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
exports.PackageModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var PackageModelComponent = /** @class */ (function () {
    function PackageModelComponent(formbuilder, dialog, editData, api) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.Submit = 'Add Package';
    }
    PackageModelComponent.prototype.ngOnInit = function () {
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.packageForm = this.formbuilder.group({
            package_name: ['', forms_1.Validators.required],
            stipend: ['', forms_1.Validators.required],
            training_days: ['', forms_1.Validators.required],
            basic: ['', forms_1.Validators.required],
            mobile_internet: ['', forms_1.Validators.required],
            project_allowance: ['', forms_1.Validators.required],
            other_allowance: ['', forms_1.Validators.required],
            incentives: ['', forms_1.Validators.required],
            special_all: ['', forms_1.Validators.required],
            esic: ['', forms_1.Validators.required],
            pf: ['', forms_1.Validators.required],
            admin: ['', forms_1.Validators.required],
            resources_development: ['', forms_1.Validators.required],
            variable_allowances: ['', forms_1.Validators.required],
            gross_deduction: ['', forms_1.Validators.required],
            ctcpm: ['', forms_1.Validators.required],
            ctcannual: ['', forms_1.Validators.required],
            net_pay: ['', forms_1.Validators.required],
            ctcafter: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        if (this.editData) {
            this.Submit = "Update Package",
                this.packageForm.controls['package_name'].setValue(this.editData.package_name);
            this.packageForm.controls['stipend'].setValue(this.editData.stipend);
            this.packageForm.controls['training_days'].setValue(this.editData.training_days);
            this.packageForm.controls['basic'].setValue(this.editData.basic);
            this.packageForm.controls['mobile_internet'].setValue(this.editData.mobile_internet);
            this.packageForm.controls['project_allowance'].setValue(this.editData.project_allowance);
            this.packageForm.controls['other_allowance'].setValue(this.editData.other_allowance);
            this.packageForm.controls['incentives'].setValue(this.editData.incentives);
            this.packageForm.controls['special_all'].setValue(this.editData.special_all);
            this.packageForm.controls['esic'].setValue(this.editData.esic);
            this.packageForm.controls['pf'].setValue(this.editData.pf);
            this.packageForm.controls['admin'].setValue(this.editData.admin);
            this.packageForm.controls['resources_development'].setValue(this.editData.resources_development);
            this.packageForm.controls['variable_allowances'].setValue(this.editData.variable_allowances);
            this.packageForm.controls['gross_deduction'].setValue(this.editData.gross_deduction);
            this.packageForm.controls['ctcpm'].setValue(this.editData.ctcpm);
            this.packageForm.controls['ctcannual'].setValue(this.editData.ctcannual);
            this.packageForm.controls['net_pay'].setValue(this.editData.net_pay);
            this.packageForm.controls['ctcafter'].setValue(this.editData.ctcafter);
        }
    };
    PackageModelComponent.prototype.addPackage = function () {
        var _this = this;
        console.log(this.packageForm.value);
        if (!this.editData) {
            if (this.packageForm.value.package_name == '' || this.packageForm.value.stipend == '' || this.packageForm.value.training_days == '') {
                console.log('Fill All the fields');
            }
            else {
                this.api.addPackage(this.packageForm.value).subscribe({
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
                        sweetalert2_1["default"].fire('Good job!', 'Package Added Successfully', 'success');
                        _this.packageForm.reset();
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
            this.updatePackage();
        }
    };
    PackageModelComponent.prototype.updatePackage = function () {
        var _this = this;
        this.api.updatePackage(this.editData._id, this.packageForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Package Updated Successfully', 'success');
                _this.packageForm.reset();
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
    PackageModelComponent = __decorate([
        core_1.Component({
            selector: 'app-package-model',
            templateUrl: './package-model.component.html',
            styleUrls: ['./package-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], PackageModelComponent);
    return PackageModelComponent;
}());
exports.PackageModelComponent = PackageModelComponent;
