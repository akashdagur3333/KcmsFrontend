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
exports.StudentModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var StudentModelComponent = /** @class */ (function () {
    function StudentModelComponent(formbuilder, dialog, editData, api, api2, api3) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.api2 = api2;
        this.api3 = api3;
        this.submit = 'Add Student';
    }
    StudentModelComponent.prototype.ngOnInit = function () {
        this.getAllPackage();
        this.getAllColleges();
        this.getQualification();
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.studentForm = this.formbuilder.group({
            category: ['', forms_1.Validators.required],
            type: ['', forms_1.Validators.required],
            aadhar_number: ['', forms_1.Validators.required],
            name: ['', forms_1.Validators.required],
            sex: ['', forms_1.Validators.required],
            qualification: ['', forms_1.Validators.required],
            stream: ['', forms_1.Validators.required],
            package: ['', forms_1.Validators.required],
            contact_no1: ['', forms_1.Validators.required],
            contact_no2: ['', forms_1.Validators.required],
            refrence_name: ['', forms_1.Validators.required],
            refrence_contact: ['', forms_1.Validators.required],
            status: ['', forms_1.Validators.required],
            hr_remarks: ['', forms_1.Validators.required],
            college: ['', forms_1.Validators.required],
            college_name: ['', forms_1.Validators.required],
            college_city: ['', forms_1.Validators.required],
            college_state: ['', forms_1.Validators.required],
            college_pin_code: ['', forms_1.Validators.required],
            college_type: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        if (this.editData.add) {
            this.studentForm = this.formbuilder.group({
                drv_id: 'DRV' + this.editData.add._id,
                clg_id: this.editData.add.clg_id,
                college_name: this.editData.add.clg_name,
                college_city: this.editData.add.college_city,
                college_state: this.editData.add.college_state,
                college_pin_code: this.editData.add.college_pin_code,
                college_type: this.editData.add.college_type,
                drive_type: this.editData.add.drive_type,
                aadhar_number: ['', forms_1.Validators.required],
                name: ['', forms_1.Validators.required],
                sex: ['', forms_1.Validators.required],
                qualification: ['', forms_1.Validators.required],
                stream: ['', forms_1.Validators.required],
                package: [],
                contact_no1: ['', forms_1.Validators.required],
                contact_no2: ['', forms_1.Validators.required],
                status: ['', forms_1.Validators.required],
                hr_remarks: ['', forms_1.Validators.required],
                college: ['', forms_1.Validators.required],
                type: 'vsr',
                category: 'Drive',
                created_by: this.createdBy
            });
        }
        if (this.editData.data) {
            var category = document.getElementById('category');
            var type = document.getElementById('type');
            category === null || category === void 0 ? void 0 : category.removeAttribute('hidden');
            type === null || type === void 0 ? void 0 : type.removeAttribute('hidden');
            this.targetValue = this.editData.data.qualification;
            this.getAllStream();
            console.log(this.editData.data.package, this.editData.data.category);
            this.submit = 'Update Student';
            this.studentForm.controls['category'].setValue(this.editData.data.category);
            this.studentForm.controls['type'].setValue(this.editData.data.type);
            this.studentForm.controls['aadhar_number'].setValue(this.editData.data.aadhar_number);
            this.studentForm.controls['name'].setValue(this.editData.data.name);
            this.studentForm.controls['sex'].setValue(this.editData.data.sex);
            this.studentForm.controls['qualification'].setValue(this.editData.data.qualification);
            this.studentForm.controls['stream'].setValue(this.editData.data.stream);
            this.studentForm.controls['package'].setValue(this.editData.data.package[0]._id);
            this.studentForm.controls['contact_no1'].setValue(this.editData.data.contact_no1);
            this.studentForm.controls['contact_no2'].setValue(this.editData.data.contact_no2);
            this.studentForm.controls['status'].setValue(this.editData.data.status);
            this.studentForm.controls['hr_remarks'].setValue(this.editData.data.hr_remarks);
            this.studentForm.controls['college_type'].setValue(this.editData.data.college_type);
        }
        if (this.editData.message) {
            var category = document.getElementById('category');
            var type = document.getElementById('type');
            var college = document.getElementById('college');
            var college_name = document.getElementById('college_name');
            var college_city = document.getElementById('college_city');
            var college_state = document.getElementById('college_state');
            var college_pin_code = document.getElementById('college_pin_code');
            var college_type = document.getElementById('college_type');
            category === null || category === void 0 ? void 0 : category.removeAttribute('hidden');
            type === null || type === void 0 ? void 0 : type.removeAttribute('hidden');
            college === null || college === void 0 ? void 0 : college.removeAttribute('hidden');
            college_name === null || college_name === void 0 ? void 0 : college_name.removeAttribute('hidden');
            college_city === null || college_city === void 0 ? void 0 : college_city.removeAttribute('hidden');
            college_state === null || college_state === void 0 ? void 0 : college_state.removeAttribute('hidden');
            college_pin_code === null || college_pin_code === void 0 ? void 0 : college_pin_code.removeAttribute('hidden');
            college_type === null || college_type === void 0 ? void 0 : college_type.removeAttribute('hidden');
        }
    };
    StudentModelComponent.prototype.changeCategory = function () {
        var refrence_name = document.getElementById('refrence_name');
        var refrence_contact = document.getElementById('refrence_contact');
        if (this.studentForm.value.category == 'reference') {
            refrence_name === null || refrence_name === void 0 ? void 0 : refrence_name.removeAttribute('hidden');
            refrence_contact === null || refrence_contact === void 0 ? void 0 : refrence_contact.removeAttribute('hidden');
        }
        else {
            refrence_name === null || refrence_name === void 0 ? void 0 : refrence_name.setAttribute('hidden', '');
            refrence_contact === null || refrence_contact === void 0 ? void 0 : refrence_contact.setAttribute('hidden', '');
        }
    };
    StudentModelComponent.prototype.Packagedata = function () {
        var _this = this;
        var id = this.studentForm.value.package;
        this.allPackage.find(function (x) {
            if (x._id == id) {
                _this.packageData = x;
            }
        });
        this.studentForm.controls['package'].setValue(this.packageData);
    };
    StudentModelComponent.prototype.collegeData = function () {
        var _this = this;
        if (this.studentForm.value.college == 'other') {
            this.studentForm.controls['college_name'].reset();
            this.studentForm.controls['college_city'].reset();
            this.studentForm.controls['college_state'].reset();
            this.studentForm.controls['college_pin_code'].reset();
            this.studentForm.controls['college_type'].reset();
        }
        else {
            var filter = this.AllColleges.filter(function (x) {
                return x._id == _this.studentForm.value.college;
            });
            this.filterData = filter;
            this.studentForm.controls['college_name'].setValue(this.filterData[0].college_name);
            this.studentForm.controls['college_city'].setValue(this.filterData[0].college_city);
            this.studentForm.controls['college_state'].setValue(this.filterData[0].college_state);
            this.studentForm.controls['college_pin_code'].setValue(this.filterData[0].college_pin_code_code);
            this.studentForm.controls['college_type'].setValue(this.filterData[0].college_type);
        }
    };
    StudentModelComponent.prototype.target = function (data) {
        // this.targetValue=(event.target as HTMLInputElement).value;
        // console.log(data)
        this.targetValue = this.studentForm.value.qualification;
        console.log(this.targetValue);
        this.getAllStream();
    };
    StudentModelComponent.prototype.getAllColleges = function () {
        var _this = this;
        this.api3.getAllColleges().subscribe({
            next: function (res) {
                _this.AllColleges = res;
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
    StudentModelComponent.prototype.addStudents = function () {
        var _this = this;
        if (this.editData.message) {
            this.api.addStudents(this.studentForm.value).subscribe({
                next: function (res) {
                    sweetalert2_1["default"].fire('Good job!', 'Student Added Successfully', 'success');
                    _this.studentForm.reset();
                    _this.dialog.close("Add");
                },
                error: function (err) {
                    sweetalert2_1["default"].fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something Went Wrong!',
                        footer: err
                    });
                }
            });
            if (this.studentForm.value.college == 'other') {
                this.api3.addColleges(this.studentForm.value).subscribe({
                    next: function (res) {
                        console.log(res);
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            }
        }
        else if (this.editData.data) {
            this.updateColleges();
        }
        else {
            if (this.studentForm.value.aadhar_number == '' || this.studentForm.value.name == '' || this.studentForm.value.sex == '' || this.studentForm.value.stream == '') {
                console.log('Fill All the fields');
            }
            else {
                this.api.addStudents(this.studentForm.value).subscribe({
                    next: function (res) {
                        if (res.name == 'ValidationError') {
                            _this.errors = res.errors;
                            console.log(res.errors);
                            //  this.errors=res.errors;
                            // this.errors.sort((x:any)=>{
                            //   console.log(x.message);
                            // })
                        }
                        console.log(res);
                        if (res.message == 'Student already Saved') {
                            sweetalert2_1["default"].fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Student Already Exist!'
                            });
                        }
                        else {
                            sweetalert2_1["default"].fire('Good job!', 'Student Added Successfully', 'success');
                        }
                        _this.studentForm.reset();
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
    };
    StudentModelComponent.prototype.updateColleges = function () {
        var _this = this;
        this.api.updateStudents(this.editData.data._id, this.studentForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Student Updated Successfully', 'success');
                _this.studentForm.reset();
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
    StudentModelComponent.prototype.getQualification = function () {
        var _this = this;
        this.api2.getAllQualification().subscribe({
            next: function (res) {
                _this.qualification = res;
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
    StudentModelComponent.prototype.getAllStream = function () {
        var _this = this;
        this.api2.getAllStream().subscribe({
            next: function (res) {
                var data = res.filter(function (x) {
                    return x.qualification_name == _this.targetValue;
                });
                _this.stream = data;
                console.log(_this.stream);
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
    StudentModelComponent.prototype.getAllPackage = function () {
        var _this = this;
        this.api2.getAllPackage().subscribe({
            next: function (res) {
                _this.allPackage = res;
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    StudentModelComponent = __decorate([
        core_1.Component({
            selector: 'app-student-model',
            templateUrl: './student-model.component.html',
            styleUrls: ['./student-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], StudentModelComponent);
    return StudentModelComponent;
}());
exports.StudentModelComponent = StudentModelComponent;
