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
exports.ReportingModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var ReportingModelComponent = /** @class */ (function () {
    function ReportingModelComponent(formbuilder, api3, dialog, editData, api, api2) {
        this.formbuilder = formbuilder;
        this.api3 = api3;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.api2 = api2;
        this.Submit = 'Add Reporting';
        this.SubDepartment = [];
        this.designationSelect = [];
        this.AllSubDepartment = [];
        this.AllDepartment = [];
    }
    ReportingModelComponent.prototype.ngOnInit = function () {
        this.getAllBatches();
        this.getAllVSR();
        this.getallDepartment();
        this.getallSubDepartment();
        this.getAllDesignation();
        this.getAllFinancial();
        this.getAllLocation();
        this.getAllQualification();
        this.getAllStream();
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.reportingForm = this.formbuilder.group({
            aadhar_number: ['', forms_1.Validators.required],
            college_name: ['', forms_1.Validators.required],
            employee_type: ['', forms_1.Validators.required],
            total_vsr: ['', forms_1.Validators.required],
            paid_vsr: ['', forms_1.Validators.required],
            fine: ['', forms_1.Validators.required],
            paid_fine: ['', forms_1.Validators.required],
            paid_other: ['', forms_1.Validators.required],
            fineWaiver: ['', forms_1.Validators.required],
            otherWaiver: ['', forms_1.Validators.required],
            select_batch: [],
            other: ['', forms_1.Validators.required],
            vsrWaiver: ['', forms_1.Validators.required],
            pending_value: ['', forms_1.Validators.required],
            selection_type: ['', forms_1.Validators.required],
            reported_at: ['', forms_1.Validators.required],
            batch_starting_date: ['', forms_1.Validators.required],
            employee_name: ['', forms_1.Validators.required],
            father_name: ['', forms_1.Validators.required],
            mother_name: ['', forms_1.Validators.required],
            package: ['', forms_1.Validators.required],
            gender: ['', forms_1.Validators.required],
            blood_group: ['', forms_1.Validators.required],
            contact_no1: ['', forms_1.Validators.required],
            contact_no2: ['', forms_1.Validators.required],
            dob: ['', forms_1.Validators.required],
            address: ['', forms_1.Validators.required],
            email: ['', forms_1.Validators.required],
            identity_mark: ['', forms_1.Validators.required],
            maritial_status: ['', forms_1.Validators.required],
            designation: ['', forms_1.Validators.required],
            department: ['', forms_1.Validators.required],
            subDepartment: ['', forms_1.Validators.required],
            nationality: ['', forms_1.Validators.required],
            religion: ['', forms_1.Validators.required],
            college_city: ['', forms_1.Validators.required],
            college_state: ['', forms_1.Validators.required],
            qualification: ['', forms_1.Validators.required],
            stream: ['', forms_1.Validators.required],
            financial_year: ['', forms_1.Validators.required],
            offer_letter_account: ['', forms_1.Validators.required],
            band: ['', forms_1.Validators.required],
            offer_letter_date: ['', forms_1.Validators.required],
            reported_by: ['', forms_1.Validators.required],
            status: 1,
            created_by: this.createdBy
        });
        if (this.editData) {
            console.log(this.editData);
            var hide = document.getElementById('hidden');
            hide === null || hide === void 0 ? void 0 : hide.setAttribute('hidden', '');
            var report = document.getElementById('report');
            report === null || report === void 0 ? void 0 : report.removeAttribute('hidden');
            var btn1 = document.getElementById('btn1');
            var btn2 = document.getElementById('btn2');
            btn1 === null || btn1 === void 0 ? void 0 : btn1.removeAttribute('hidden');
            btn2 === null || btn2 === void 0 ? void 0 : btn2.removeAttribute('hidden');
            this.Submit = "Update Reporting";
            this.reportingForm.controls['aadhar_number'].setValue(this.editData.aadhar_number);
            this.reportingForm.controls['employee_type'].setValue(this.editData.employee_type);
            this.reportingForm.controls['total_vsr'].setValue(this.editData.total_vsr);
            this.reportingForm.controls['selection_type'].setValue(this.editData.selection_type);
            this.reportingForm.controls['reported_at'].setValue(this.editData.reported_at);
            this.reportingForm.controls['batch_starting_date'].setValue(this.editData.batch_starting_date);
            this.reportingForm.controls['employee_name'].setValue(this.editData.employee_name);
            this.reportingForm.controls['father_name'].setValue(this.editData.father_name);
            this.reportingForm.controls['mother_name'].setValue(this.editData.mother_name);
            this.reportingForm.controls['gender'].setValue(this.editData.gender);
            this.reportingForm.controls['blood_group'].setValue(this.editData.blood_group);
            this.reportingForm.controls['contact_no1'].setValue(this.editData.contact_no1);
            this.reportingForm.controls['contact_no2'].setValue(this.editData.contact_no2);
            this.reportingForm.controls['dob'].setValue(this.editData.dob);
            this.reportingForm.controls['address'].setValue(this.editData.address);
            this.reportingForm.controls['email'].setValue(this.editData.email);
            this.reportingForm.controls['identity_mark'].setValue(this.editData.identity_mark);
            this.reportingForm.controls['maritial_status'].setValue(this.editData.maritial_status);
            this.reportingForm.controls['designation'].setValue(this.editData.designation);
            this.reportingForm.controls['department'].setValue(this.editData.department);
            this.reportingForm.controls['subDepartment'].setValue(this.editData.subDepartment);
            this.reportingForm.controls['nationality'].setValue(this.editData.nationality);
            this.reportingForm.controls['religion'].setValue(this.editData.religion);
            this.reportingForm.controls['college_name'].setValue(this.editData.college_name);
            this.reportingForm.controls['college_city'].setValue(this.editData.college_city);
            this.reportingForm.controls['college_state'].setValue(this.editData.college_state);
            this.reportingForm.controls['qualification'].setValue(this.editData.qualification);
            this.reportingForm.controls['stream'].setValue(this.editData.stream);
            this.reportingForm.controls['financial_year'].setValue(this.editData.financial_year);
            this.reportingForm.controls['offer_letter_account'].setValue(this.editData.offer_letter_account);
            this.reportingForm.controls['band'].setValue(this.editData.band);
            this.reportingForm.controls['offer_letter_date'].setValue(this.editData.offer_letter_date);
            this.reportingForm.controls['reported_by'].setValue(this.editData.reported_by);
            this.reportingForm.controls['select_batch'].setValue(this.editData.select_batch[0]._id);
        }
    };
    ReportingModelComponent.prototype.batch = function () {
        var _this = this;
        var id = this.reportingForm.value.select_batch;
        this.AllBatches.find(function (x) {
            if (x._id == id) {
                _this.findBatch = x;
            }
        });
        this.reportingForm.controls['select_batch'].setValue(this.findBatch);
    };
    ReportingModelComponent.prototype.getAllVSR = function () {
        var _this = this;
        this.api2.getAllVsrValue().subscribe({
            next: function (res) {
                _this.AllVSR = res;
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
    ReportingModelComponent.prototype.getAllBatches = function () {
        var _this = this;
        this.api3.getAllBateches().subscribe({
            next: function (res) {
                _this.AllBatches = res;
            },
            error: function (err) {
                sweetalert2_1["default"].fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Oops Something Went Wrong!'
                });
            }
        });
    };
    ReportingModelComponent.prototype.validate = function () {
        var _this = this;
        var adhar = this.reportingForm.value;
        this.api.validate(adhar).subscribe({
            next: function (res) {
                if (res.message == "Student Not Found") {
                    sweetalert2_1["default"].fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Student Not Found!'
                    });
                }
                else {
                    _this.data = res;
                    sweetalert2_1["default"].fire(_this.data.name + '!', 'Student Found Successfully', 'success');
                    var hide = document.getElementById('hidden');
                    hide === null || hide === void 0 ? void 0 : hide.setAttribute('hidden', '');
                    var report = document.getElementById('report');
                    report === null || report === void 0 ? void 0 : report.removeAttribute('hidden');
                    var button1 = document.getElementById('btn1');
                    button1 === null || button1 === void 0 ? void 0 : button1.removeAttribute('hidden');
                    var button2 = document.getElementById('btn2');
                    button2 === null || button2 === void 0 ? void 0 : button2.removeAttribute('hidden');
                    _this.reportingForm.controls['employee_type'].setValue(_this.data.type);
                    _this.reportingForm.controls['aadhar_number'].setValue(_this.data.aadhar_number);
                    _this.reportingForm.controls['college_name'].setValue(_this.data.college_name);
                    _this.reportingForm.controls['college_city'].setValue(_this.data.college_city);
                    _this.reportingForm.controls['college_state'].setValue(_this.data.college_state);
                    _this.reportingForm.controls['package'].setValue(_this.data.package);
                    _this.reportingForm.controls['gender'].setValue(_this.data.sex);
                    _this.reportingForm.controls['employee_name'].setValue(_this.data.name);
                    _this.reportingForm.controls['contact_no1'].setValue(_this.data.contact_no1);
                    _this.reportingForm.controls['contact_no2'].setValue(_this.data.contact_no2);
                    _this.reportingForm.controls['qualification'].setValue(_this.data.qualification);
                    _this.reportingForm.controls['stream'].setValue(_this.data.stream);
                    _this.reportingForm.controls['selection_type'].setValue(_this.data.category);
                    _this.reportingForm.controls['paid_vsr'].setValue(0);
                    _this.reportingForm.controls['fine'].setValue(0);
                    _this.reportingForm.controls['paid_fine'].setValue(0);
                    _this.reportingForm.controls['paid_other'].setValue(0);
                    _this.reportingForm.controls['fineWaiver'].setValue(0);
                    _this.reportingForm.controls['vsrWaiver'].setValue(0);
                    _this.reportingForm.controls['other'].setValue(0);
                    _this.reportingForm.controls['otherWaiver'].setValue(0);
                    var total_vsr = document.getElementById('total_vsr');
                    var batch = document.getElementById('batch');
                    if (_this.reportingForm.value.employee_type != 'vsr') {
                        total_vsr === null || total_vsr === void 0 ? void 0 : total_vsr.setAttribute('hidden', '');
                        batch === null || batch === void 0 ? void 0 : batch.setAttribute('hidden', '');
                    }
                }
                // }
            },
            error: function (err) {
                console.log(err);
            }
        });
        this.ngOnInit();
    };
    ReportingModelComponent.prototype.type = function () {
        var total_vsr = document.getElementById('total_vsr');
        var batch = document.getElementById('batch');
        if (this.reportingForm.value.employee_type == 'exp') {
            total_vsr === null || total_vsr === void 0 ? void 0 : total_vsr.setAttribute('hidden', '');
            batch === null || batch === void 0 ? void 0 : batch.setAttribute('hidden', '');
        }
        else {
            total_vsr === null || total_vsr === void 0 ? void 0 : total_vsr.removeAttribute('hidden');
            batch === null || batch === void 0 ? void 0 : batch.removeAttribute('hidden');
        }
    };
    ReportingModelComponent.prototype.getAllLocation = function () {
        var _this = this;
        this.api2.getAllLocation().subscribe({
            next: function (res) {
                _this.AllLocation = res;
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
    ReportingModelComponent.prototype.getAllDesignation = function () {
        var _this = this;
        this.api2.getAllDesignation().subscribe({
            next: function (res) {
                _this.AllDesignation = res;
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
    ReportingModelComponent.prototype.DepartmentChange = function (event) {
        var val = event.target.value;
        this.SubDepartment = this.AllSubDepartment.filter(function (x) {
            return x.head_department == val;
        });
        this.designationSelect = this.AllDesignation.filter(function (y) {
            return y.head_department == val;
        });
    };
    ReportingModelComponent.prototype.getallSubDepartment = function () {
        var _this = this;
        this.api2.getAllSubdepartment().subscribe({
            next: function (res) {
                _this.AllSubDepartment = res;
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
    ReportingModelComponent.prototype.getallDepartment = function () {
        var _this = this;
        this.api2.getAllDepartment().subscribe({
            next: function (res) {
                _this.AllDepartment = res;
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
    ReportingModelComponent.prototype.getAllQualification = function () {
        var _this = this;
        this.api2.getAllQualification().subscribe({
            next: function (res) {
                _this.AllQualification = res;
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
    ReportingModelComponent.prototype.getAllStream = function () {
        var _this = this;
        this.api2.getAllStream().subscribe({
            next: function (res) {
                _this.AllStream = res;
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
    ReportingModelComponent.prototype.getAllFinancial = function () {
        var _this = this;
        this.api2.getAllFinancial().subscribe({
            next: function (res) {
                _this.AllFinancialYear = res;
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
    ReportingModelComponent.prototype.addReporting = function () {
        var _this = this;
        console.log(this.reportingForm.value);
        if (!this.editData) {
            this.api.addReporting(this.reportingForm.value).subscribe({
                next: function (res) {
                    if (res.message == 'Reporting Exist') {
                        sweetalert2_1["default"].fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Reporting Exist!'
                        });
                    }
                    sweetalert2_1["default"].fire('Good job!', 'Reporting Added Successfully', 'success');
                    _this.reportingForm.reset();
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
        else {
            this.updateReporting();
        }
    };
    ReportingModelComponent.prototype.updateReporting = function () {
        var _this = this;
        this.api.updateReporting(this.editData._id, this.reportingForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Reporting Updated Successfully', 'success');
                _this.reportingForm.reset();
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
    ReportingModelComponent = __decorate([
        core_1.Component({
            selector: 'app-reporting-model',
            templateUrl: './reporting-model.component.html',
            styleUrls: ['./reporting-model.component.css']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ReportingModelComponent);
    return ReportingModelComponent;
}());
exports.ReportingModelComponent = ReportingModelComponent;
