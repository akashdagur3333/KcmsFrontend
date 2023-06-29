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
exports.AddNormalUserModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var AddNormalUserModelComponent = /** @class */ (function () {
    function AddNormalUserModelComponent(formbuilder, api, dialog, editData, api1, api2) {
        this.formbuilder = formbuilder;
        this.api = api;
        this.dialog = dialog;
        this.editData = editData;
        this.api1 = api1;
        this.api2 = api2;
        this.Submit = 'Add User';
        this.submitted = false;
        this.validate = [];
        this.data = [];
        this.Departments = [];
        this.Designations = [];
        this.SubDepartments = [];
        this.shifts = [];
        this.locations = [];
        this.SubDepartment = [];
        this.designationSelect = [];
    }
    AddNormalUserModelComponent.prototype.ngOnInit = function () {
        this.getAllEmployee();
        this.AllDepartment();
        this.AllDesignation();
        this.AllLocation();
        this.AllShift();
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        var role = this.token.role;
        this.UserForm = this.formbuilder.group({
            user_name: ['', forms_1.Validators.required],
            rpt_id: ['', forms_1.Validators.required],
            email: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            confirm_password: ['', forms_1.Validators.required],
            roles: ['', forms_1.Validators.required],
            role: role,
            phone_no: ['', forms_1.Validators.required],
            shift: ['', forms_1.Validators.required],
            department: ['', forms_1.Validators.required],
            designation: ['', forms_1.Validators.required],
            sub_department: ['', forms_1.Validators.required],
            office_location: ['', forms_1.Validators.required],
            status: ['', forms_1.Validators.required]
        });
        if (this.editData) {
            // this.Submit='Update User';
            this.UserForm.controls['rpt_id'].setValue(this.editData._id);
            this.UserForm.controls['user_name'].setValue(this.editData.employee_name);
            this.UserForm.controls['email'].setValue(this.editData.email);
            this.UserForm.controls['phone_no'].setValue(this.editData.contact_no1);
            this.UserForm.controls['department'].setValue(this.editData.department);
            this.UserForm.controls['designation'].setValue(this.editData.designation);
            this.UserForm.controls['subDepartment'].setValue(this.editData.subDepartment);
        }
    };
    AddNormalUserModelComponent.prototype.addUser = function () {
        var _this = this;
        var shift = this.UserForm.value.shift;
        var office_location = this.UserForm.value.office_location;
        var data = this.shifts.find(function (x) {
            if (x._id == shift) {
                _this.UserForm.controls['shift'].setValue(x);
            }
        });
        var data1 = this.locations.find(function (x) {
            if (x._id == office_location) {
                _this.UserForm.controls['office_location'].setValue(x);
            }
        });
        if (!this.editData.update) {
            this.submitted = true;
            if (this.UserForm.value.user_name == '' || this.UserForm.value.email == '' || this.UserForm.value.password == '' || this.UserForm.value.roles == '' || this.UserForm.value.confirm_password == '' || this.UserForm.value.phone_no == '') {
                console.log('fill the all field');
            }
            else {
                if (this.UserForm.value.password == this.UserForm.value.confirm_password) {
                    this.api.adduserData(this.UserForm.value).subscribe({
                        next: function (res) {
                            console.log(res);
                            if (res.message == 'user already registered') {
                                sweetalert2_1["default"].fire('Good job!', 'User Already registered', 'success');
                            }
                            else if (res.message == 'You dont have permission') {
                                sweetalert2_1["default"].fire('Not Authorised!', 'You are not Super Admin', 'error');
                            }
                            else {
                                sweetalert2_1["default"].fire('Good job!', 'User Added Successfully', 'success');
                                _this.UserForm.reset();
                                _this.dialog.close("Add");
                            }
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
                else {
                    sweetalert2_1["default"].fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Confirm Password is not match!'
                    });
                }
            }
        }
        else {
            this.updateUser();
        }
    };
    AddNormalUserModelComponent.prototype.getAllEmployee = function () {
        var _this = this;
        this.api1.getAllReporting().subscribe({
            next: function (res) {
                _this.AllEmployee = res.filter(function (x) {
                    if (x.status == 4) {
                        return x;
                    }
                });
            }, error: function (err) {
                console.log(err);
            }
        });
    };
    AddNormalUserModelComponent.prototype.DepartmentChange = function (event) {
        var val = event.target.value;
        this.SubDepartment = this.SubDepartments.filter(function (x) {
            return x.head_department == val;
        });
        this.designationSelect = this.Designations.filter(function (y) {
            return y.head_department == val;
        });
    };
    AddNormalUserModelComponent.prototype.AllDepartment = function () {
        var _this = this;
        this.api2.getAllDepartment().subscribe({
            next: function (res) {
                _this.Departments = res;
                console.log(_this.Departments);
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    AddNormalUserModelComponent.prototype.AllDesignation = function () {
        var _this = this;
        this.api2.getAllDesignation().subscribe({
            next: function (res) {
                _this.Designations = res;
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    AddNormalUserModelComponent.prototype.AllSubDeparment = function () {
        var _this = this;
        this.api2.getAllSubdepartment().subscribe({
            next: function (res) {
                _this.SubDepartments = res;
                console.log(_this.SubDepartments);
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    AddNormalUserModelComponent.prototype.AllShift = function () {
        var _this = this;
        this.api2.getAllShift().subscribe({
            next: function (res) {
                _this.shifts = res;
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    AddNormalUserModelComponent.prototype.AllLocation = function () {
        var _this = this;
        this.api2.getAllLocation().subscribe({
            next: function (res) {
                _this.locations = res;
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    AddNormalUserModelComponent.prototype.updateUser = function () {
        var _this = this;
        if (!this.UserForm.value.password) {
            this.api.updateUser(this.editData._id, this.UserForm.value).subscribe({
                next: function (res) {
                    sweetalert2_1["default"].fire('Good job!', 'User Updated Successfully', 'success');
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
        }
        else {
            if (this.UserForm.value.password == this.UserForm.value.confirm_password) {
                this.api.updateUser(this.editData._id, this.UserForm.value).subscribe({
                    next: function (res) {
                        sweetalert2_1["default"].fire('Good job!', 'User & Password Updated Successfully', 'success');
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
            }
            else {
                sweetalert2_1["default"].fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Confirm Password is not match!'
                });
            }
        }
    };
    AddNormalUserModelComponent = __decorate([
        core_1.Component({
            selector: 'app-add-normal-user-model',
            templateUrl: './add-normal-user-model.component.html',
            styleUrls: ['./add-normal-user-model.component.css']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AddNormalUserModelComponent);
    return AddNormalUserModelComponent;
}());
exports.AddNormalUserModelComponent = AddNormalUserModelComponent;
