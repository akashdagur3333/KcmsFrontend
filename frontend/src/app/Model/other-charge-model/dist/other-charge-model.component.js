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
exports.OtherChargeModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var OtherChargeModelComponent = /** @class */ (function () {
    function OtherChargeModelComponent(formbuilder, dialog, editData, api, api2) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.api2 = api2;
    }
    OtherChargeModelComponent.prototype.ngOnInit = function () {
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.otherForm = this.formbuilder.group({
            rpt_id: ['', forms_1.Validators.required],
            name: ['', forms_1.Validators.required],
            father_name: ['', forms_1.Validators.required],
            amount: ['', forms_1.Validators.required],
            other: ['', forms_1.Validators.required],
            imposed_by: ['', forms_1.Validators.required],
            remarks: ['', forms_1.Validators.required],
            gst_amount: ['', forms_1.Validators.required],
            pending_value: ['', forms_1.Validators.required],
            total_value: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        if (this.editData.other) {
            console.log(this.editData.other);
            this.detail = this.editData.other.employee_name + ' S/O ' + this.editData.other.father_name;
            this.total_vsr = this.editData.other.pending_value;
            this.otherForm.controls['rpt_id'].setValue('RPT' + this.editData.other._id);
            this.otherForm.controls['pending_value'].setValue(this.total_vsr);
            this.otherForm.controls['name'].setValue(this.editData.other.employee_name);
            this.otherForm.controls['father_name'].setValue(this.editData.other.father_name);
        }
    };
    OtherChargeModelComponent.prototype.gst_value = function (event) {
        var otheramount = event.target.value;
        var total = Number(otheramount);
        var result = this.api2.calGST(total);
        this.otherForm.controls['gst_amount'].setValue(result);
    };
    OtherChargeModelComponent.prototype.addOther = function () {
        var _this = this;
        var amount = this.otherForm.value.amount;
        var pending = this.otherForm.value.pending_value;
        var total = pending + amount;
        this.otherForm.controls['pending_value'].setValue(total);
        var total_value = this.editData.other.total_value;
        var add = total_value + amount;
        this.otherForm.controls['total_value'].setValue(add);
        var pre_other = this.editData.other.other;
        var cal = pre_other + amount;
        this.otherForm.controls['other'].setValue(cal);
        this.api2.addOther(this.otherForm.value).subscribe({
            next: function (res) {
                console.log('great other added');
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
        this.api2.updatePendingValue(this.editData.other._id, this.otherForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'other Added Successfully', 'success');
                _this.otherForm.reset();
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
    OtherChargeModelComponent = __decorate([
        core_1.Component({
            selector: 'app-other-charge-model',
            templateUrl: './other-charge-model.component.html',
            styleUrls: ['./other-charge-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], OtherChargeModelComponent);
    return OtherChargeModelComponent;
}());
exports.OtherChargeModelComponent = OtherChargeModelComponent;
