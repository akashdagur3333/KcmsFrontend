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
exports.VSRWaiverModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var VSRWaiverModelComponent = /** @class */ (function () {
    function VSRWaiverModelComponent(formbuilder, dialog, editData, api) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
    }
    VSRWaiverModelComponent.prototype.ngOnInit = function () {
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.vsrWaiverForm = this.formbuilder.group({
            rpt_id: ['', forms_1.Validators.required],
            name: ['', forms_1.Validators.required],
            father_name: ['', forms_1.Validators.required],
            amount: ['', forms_1.Validators.required],
            vsrWaiver: ['', forms_1.Validators.required],
            total_vsr: ['', forms_1.Validators.required],
            vsr_paid: ['', forms_1.Validators.required],
            vsr_waived: ['', forms_1.Validators.required],
            vsr_pending: ['', forms_1.Validators.required],
            remarks: ['', forms_1.Validators.required],
            gst_amount: ['', forms_1.Validators.required],
            waived_by: ['', forms_1.Validators.required],
            pending_value: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        if (this.editData.VSR_waiver) {
            this.detail = this.editData.VSR_waiver.employee_name + ' S/O ' + this.editData.VSR_waiver.father_name;
            var total = this.editData.VSR_waiver.total_vsr;
            var paidvsr = this.editData.VSR_waiver.paid_vsr;
            var vsrWaiver = this.editData.VSR_waiver.vsrWaiver;
            var cal = total - paidvsr - vsrWaiver;
            this.vsrWaiverForm.controls['vsr_pending'].setValue(cal);
            this.vsrWaiverForm.controls['rpt_id'].setValue('RPT' + this.editData.VSR_waiver._id);
            this.vsrWaiverForm.controls['pending_value'].setValue(this.editData.VSR_waiver.pending_value);
            this.vsrWaiverForm.controls['name'].setValue(this.editData.VSR_waiver.employee_name);
            this.vsrWaiverForm.controls['father_name'].setValue(this.editData.VSR_waiver.father_name);
            this.vsrWaiverForm.controls['total_vsr'].setValue(this.editData.VSR_waiver.total_vsr);
            this.vsrWaiverForm.controls['vsr_paid'].setValue(this.editData.VSR_waiver.paid_vsr);
            this.vsrWaiverForm.controls['vsr_waived'].setValue(this.editData.VSR_waiver.vsrWaiver);
        }
    };
    VSRWaiverModelComponent.prototype.addVsrWaiver = function () {
        var _this = this;
        var amount = Number(this.vsrWaiverForm.value.amount);
        var pending = Number(this.vsrWaiverForm.value.pending_value);
        var total = pending - amount;
        this.vsrWaiverForm.controls['pending_value'].setValue(total);
        var waiveVsr = Number(this.editData.VSR_waiver.vsrWaiver);
        var cal = waiveVsr + amount;
        this.vsrWaiverForm.controls['vsrWaiver'].setValue(cal);
        this.api.addVSRWaiver(this.vsrWaiverForm.value).subscribe({
            next: function (res) {
                console.log('great VSRwaiver added');
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
        this.api.updatePendingValue(this.editData.VSR_waiver._id, this.vsrWaiverForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'VSRwaiver Added Successfully', 'success');
                _this.vsrWaiverForm.reset();
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
    VSRWaiverModelComponent.prototype.gst_value = function (event) {
        var fineamount = event.target.value;
        var total = Number(fineamount);
        var result = this.api.calGST(total);
        this.vsrWaiverForm.controls['gst_amount'].setValue(result);
    };
    VSRWaiverModelComponent = __decorate([
        core_1.Component({
            selector: 'app-vsrwaiver-model',
            templateUrl: './vsrwaiver-model.component.html',
            styleUrls: ['./vsrwaiver-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], VSRWaiverModelComponent);
    return VSRWaiverModelComponent;
}());
exports.VSRWaiverModelComponent = VSRWaiverModelComponent;
