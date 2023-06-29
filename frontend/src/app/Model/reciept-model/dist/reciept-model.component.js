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
exports.RecieptModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var RecieptModelComponent = /** @class */ (function () {
    function RecieptModelComponent(formbuilder, dialog, editData, api, api2) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.api2 = api2;
    }
    RecieptModelComponent.prototype.ngOnInit = function () {
        this.getAllFinancial();
        this.getAllLocation();
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.recieptForm = this.formbuilder.group({
            rpt_id: ['', forms_1.Validators.required],
            reciept_serial: ['', forms_1.Validators.required],
            ol_serial: ['', forms_1.Validators.required],
            name: ['', forms_1.Validators.required],
            father_name: ['', forms_1.Validators.required],
            financial_year: ['', forms_1.Validators.required],
            ledger: ['', forms_1.Validators.required],
            type: ['', forms_1.Validators.required],
            paid_vsr: ['', forms_1.Validators.required],
            paid_fine: ['', forms_1.Validators.required],
            amount: ['', forms_1.Validators.required],
            txn_id: ['', forms_1.Validators.required],
            submited_at: ['', forms_1.Validators.required],
            gst_amount: ['', forms_1.Validators.required],
            pending_value: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        if (this.editData.reciept) {
            this.detail = this.editData.reciept.employee_name + ' S/O ' + this.editData.reciept.father_name;
            console.log(this.editData.reciept);
            this.total_vsr = this.editData.reciept.pending_value;
            this.recieptForm.controls['rpt_id'].setValue('RPT' + this.editData.reciept._id);
            this.recieptForm.controls['pending_value'].setValue(this.total_vsr);
            this.recieptForm.controls['name'].setValue(this.editData.reciept.employee_name);
            this.recieptForm.controls['father_name'].setValue(this.editData.reciept.father_name);
        }
    };
    RecieptModelComponent.prototype.gst_value = function (event) {
        var Recieptamount = event.target.value;
        var total = Number(Recieptamount);
        // const cal=(total/118)*100;
        // this.roundUp(total-cal,1);
        var result = this.api2.calGST(total);
        this.recieptForm.controls['gst_amount'].setValue(result);
    };
    RecieptModelComponent.prototype.addReciept = function () {
        var _this = this;
        var amount = this.recieptForm.value.amount;
        var pending = this.recieptForm.value.pending_value;
        var total = this.api2.Total(pending, amount);
        this.recieptForm.controls['pending_value'].setValue(total);
        if (this.recieptForm.value.type == 'fine') {
            var fine = this.editData.reciept.paid_fine;
            var total2 = amount + fine;
            this.recieptForm.controls['paid_fine'].setValue(total2);
            if (this.editData.reciept.paid_vsr == 0) {
                this.recieptForm.controls['paid_vsr'].setValue(0);
            }
            else {
                this.recieptForm.controls['paid_vsr'].setValue(this.editData.reciept.paid_vsr);
            }
        }
        else {
            console.log('vsr');
            console.log(this.recieptForm.value);
            var paidvsr = this.editData.reciept.paid_vsr;
            var total1 = amount + paidvsr;
            this.recieptForm.controls['paid_vsr'].setValue(total1);
            if (this.editData.reciept.paid_fine == 0) {
                this.recieptForm.controls['paid_fine'].setValue(0);
            }
            else {
                console.log(this.recieptForm.value.paid_fine);
                this.recieptForm.controls['paid_fine'].setValue(this.editData.reciept.paid_fine);
            }
        }
        this.api2.addReciept(this.recieptForm.value).subscribe({
            next: function (res) {
                console.log('great reciept added');
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
        this.api2.updatePendingValue(this.editData.reciept._id, this.recieptForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Reciept Added Successfully', 'success');
                _this.recieptForm.reset();
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
    };
    RecieptModelComponent.prototype.getAllFinancial = function () {
        var _this = this;
        this.api.getAllFinancial().subscribe({
            next: function (res) {
                _this.AllFinancial = res;
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
    RecieptModelComponent.prototype.getAllLocation = function () {
        var _this = this;
        this.api.getAllLocation().subscribe({
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
    RecieptModelComponent = __decorate([
        core_1.Component({
            selector: 'app-reciept-model',
            templateUrl: './reciept-model.component.html',
            styleUrls: ['./reciept-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], RecieptModelComponent);
    return RecieptModelComponent;
}());
exports.RecieptModelComponent = RecieptModelComponent;
function roundUp(arg0) {
    throw new Error('Function not implemented.');
}
