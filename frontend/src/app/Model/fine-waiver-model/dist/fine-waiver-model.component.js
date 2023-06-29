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
exports.FineWaiverModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var FineWaiverModelComponent = /** @class */ (function () {
    function FineWaiverModelComponent(formbuilder, dialog, editData, api) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
    }
    FineWaiverModelComponent.prototype.ngOnInit = function () {
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.fineWaiverForm = this.formbuilder.group({
            rpt_id: ['', forms_1.Validators.required],
            name: ['', forms_1.Validators.required],
            father_name: ['', forms_1.Validators.required],
            amount: ['', forms_1.Validators.required],
            fine: ['', forms_1.Validators.required],
            fine_paid: ['', forms_1.Validators.required],
            fineWaiver: ['', forms_1.Validators.required],
            finePending: ['', forms_1.Validators.required],
            remarks: ['', forms_1.Validators.required],
            gst_amount: ['', forms_1.Validators.required],
            waived_by: ['', forms_1.Validators.required],
            pending_value: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        if (this.editData.fineWaiver) {
            this.detail = this.editData.fineWaiver.employee_name + ' S/O ' + this.editData.fineWaiver.father_name;
            this.total_vsr = this.editData.fineWaiver.pending_value;
            var imposed = this.editData.fineWaiver.fine;
            imposed = Number(imposed);
            var finePaid = this.editData.fineWaiver.paid_fine;
            finePaid = Number(finePaid);
            var fineWaived = this.editData.fineWaiver.fineWaiver;
            fineWaived = Number(fineWaived);
            var finePending = imposed - finePaid - fineWaived;
            this.fineWaiverForm.controls['finePending'].setValue(finePending);
            this.fineWaiverForm.controls['rpt_id'].setValue('RPT' + this.editData.fineWaiver._id);
            this.fineWaiverForm.controls['pending_value'].setValue(this.total_vsr);
            this.fineWaiverForm.controls['name'].setValue(this.editData.fineWaiver.employee_name);
            this.fineWaiverForm.controls['father_name'].setValue(this.editData.fineWaiver.father_name);
            this.fineWaiverForm.controls['fine'].setValue(this.editData.fineWaiver.fine);
            this.fineWaiverForm.controls['fine_paid'].setValue(this.editData.fineWaiver.paid_fine);
            this.fineWaiverForm.controls['fineWaiver'].setValue(this.editData.fineWaiver.fineWaiver);
            this.fineWaiverForm.controls['fine_imposed'].setValue(this.editData.fineWaiver.fine_imposed);
        }
    };
    FineWaiverModelComponent.prototype.addFineWaiver = function () {
        var _this = this;
        var amount = Number(this.fineWaiverForm.value.amount);
        var pending = this.fineWaiverForm.value.pending_value;
        var total = pending - amount;
        this.fineWaiverForm.controls['pending_value'].setValue(total);
        var waiveFine = Number(this.editData.fineWaiver.fineWaiver);
        var cal = waiveFine + amount;
        this.fineWaiverForm.controls['fineWaiver'].setValue(cal);
        this.api.addFineWaiver(this.fineWaiverForm.value).subscribe({
            next: function (res) {
                console.log('great fineWaiver added');
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
        this.api.updatePendingValue(this.editData.fineWaiver._id, this.fineWaiverForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'FineWaiver Added Successfully', 'success');
                _this.fineWaiverForm.reset();
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
    FineWaiverModelComponent.prototype.gst_value = function (event) {
        var fineamount = event.target.value;
        var total = Number(fineamount);
        var result = this.api.calGST(total);
        this.fineWaiverForm.controls['gst_amount'].setValue(result);
    };
    FineWaiverModelComponent = __decorate([
        core_1.Component({
            selector: 'app-fine-waiver-model',
            templateUrl: './fine-waiver-model.component.html',
            styleUrls: ['./fine-waiver-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], FineWaiverModelComponent);
    return FineWaiverModelComponent;
}());
exports.FineWaiverModelComponent = FineWaiverModelComponent;
