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
exports.OtherWaiverModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var OtherWaiverModelComponent = /** @class */ (function () {
    function OtherWaiverModelComponent(formbuilder, dialog, editData, api) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
    }
    OtherWaiverModelComponent.prototype.ngOnInit = function () {
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.otherWaiverForm = this.formbuilder.group({
            rpt_id: ['', forms_1.Validators.required],
            name: ['', forms_1.Validators.required],
            father_name: ['', forms_1.Validators.required],
            amount: ['', forms_1.Validators.required],
            other: ['', forms_1.Validators.required],
            otherWaiver: ['', forms_1.Validators.required],
            otherPending: ['', forms_1.Validators.required],
            remarks: ['', forms_1.Validators.required],
            gst_amount: ['', forms_1.Validators.required],
            waived_by: ['', forms_1.Validators.required],
            pending_value: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        if (this.editData.otherWaiver) {
            this.detail = this.editData.otherWaiver.employee_name + ' S/O ' + this.editData.otherWaiver.father_name;
            this.total_vsr = this.editData.otherWaiver.pending_value;
            var imposed = this.editData.otherWaiver.other;
            imposed = Number(imposed);
            // var otherPaid=this.editData.otherWaiver.paid_fine;
            // finePaid=Number(finePaid);
            var otherWaived = this.editData.otherWaiver.otherWaiver;
            otherWaived = Number(otherWaived);
            var otherPending = imposed - otherWaived;
            this.otherWaiverForm.controls['otherPending'].setValue(otherPending);
            this.otherWaiverForm.controls['rpt_id'].setValue('RPT' + this.editData.otherWaiver._id);
            this.otherWaiverForm.controls['pending_value'].setValue(this.total_vsr);
            this.otherWaiverForm.controls['name'].setValue(this.editData.otherWaiver.employee_name);
            this.otherWaiverForm.controls['father_name'].setValue(this.editData.otherWaiver.father_name);
            this.otherWaiverForm.controls['other'].setValue(this.editData.otherWaiver.other);
            this.otherWaiverForm.controls['other_paid'].setValue(this.editData.otherWaiver.other_paid);
            this.otherWaiverForm.controls['otherWaiver'].setValue(this.editData.otherWaiver.otherWaiver);
            this.otherWaiverForm.controls['other_imposed'].setValue(this.editData.otherWaiver.other_imposed);
        }
    };
    OtherWaiverModelComponent.prototype.addOtherWaiver = function () {
        var _this = this;
        var amount = Number(this.otherWaiverForm.value.amount);
        var pending = this.otherWaiverForm.value.pending_value;
        var total = pending - amount;
        this.otherWaiverForm.controls['pending_value'].setValue(total);
        var waiveOther = Number(this.editData.otherWaiver.otherWaiver);
        var cal = waiveOther + amount;
        this.otherWaiverForm.controls['otherWaiver'].setValue(cal);
        this.api.addOtherWaiver(this.otherWaiverForm.value).subscribe({
            next: function (res) {
                console.log('great otherWaiver added');
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
        this.api.updatePendingValue(this.editData.otherWaiver._id, this.otherWaiverForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'otherWaiver Added Successfully', 'success');
                _this.otherWaiverForm.reset();
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
    OtherWaiverModelComponent.prototype.gst_value = function (event) {
        var otheramount = event.target.value;
        var total = Number(otheramount);
        var result = this.api.calGST(total);
        this.otherWaiverForm.controls['gst_amount'].setValue(result);
    };
    OtherWaiverModelComponent = __decorate([
        core_1.Component({
            selector: 'app-other-waiver-model',
            templateUrl: './other-waiver-model.component.html',
            styleUrls: ['./other-waiver-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], OtherWaiverModelComponent);
    return OtherWaiverModelComponent;
}());
exports.OtherWaiverModelComponent = OtherWaiverModelComponent;
