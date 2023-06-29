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
exports.FineModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var FineModelComponent = /** @class */ (function () {
    function FineModelComponent(formbuilder, dialog, editData, api, api2) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.api2 = api2;
    }
    FineModelComponent.prototype.ngOnInit = function () {
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.fineForm = this.formbuilder.group({
            rpt_id: ['', forms_1.Validators.required],
            name: ['', forms_1.Validators.required],
            father_name: ['', forms_1.Validators.required],
            amount: ['', forms_1.Validators.required],
            fine: ['', forms_1.Validators.required],
            imposed_by: ['', forms_1.Validators.required],
            remarks: ['', forms_1.Validators.required],
            gst_amount: ['', forms_1.Validators.required],
            pending_value: ['', forms_1.Validators.required],
            total_value: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        if (this.editData.fine) {
            this.detail = this.editData.fine.employee_name + ' S/O ' + this.editData.fine.father_name;
            this.total_vsr = this.editData.fine.pending_value;
            this.fineForm.controls['rpt_id'].setValue('RPT' + this.editData.fine._id);
            this.fineForm.controls['pending_value'].setValue(this.total_vsr);
            this.fineForm.controls['name'].setValue(this.editData.fine.employee_name);
            this.fineForm.controls['father_name'].setValue(this.editData.fine.father_name);
        }
    };
    FineModelComponent.prototype.gst_value = function (event) {
        var fineamount = event.target.value;
        var total = Number(fineamount);
        var result = this.api2.calGST(total);
        this.fineForm.controls['gst_amount'].setValue(result);
    };
    FineModelComponent.prototype.addFine = function () {
        var _this = this;
        var amount = this.fineForm.value.amount;
        var pending = this.fineForm.value.pending_value;
        var total = pending + amount;
        this.fineForm.controls['pending_value'].setValue(total);
        var total_value = this.editData.fine.total_value;
        var add = total_value + amount;
        this.fineForm.controls['total_value'].setValue(add);
        var pre_fine = this.editData.fine.fine;
        var cal = pre_fine + amount;
        this.fineForm.controls['fine'].setValue(cal);
        this.api2.addFine(this.fineForm.value).subscribe({
            next: function (res) {
                console.log('great fine added');
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
        this.api2.updatePendingValue(this.editData.fine._id, this.fineForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Fine Added Successfully', 'success');
                _this.fineForm.reset();
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
    FineModelComponent = __decorate([
        core_1.Component({
            selector: 'app-fine-model',
            templateUrl: './fine-model.component.html',
            styleUrls: ['./fine-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], FineModelComponent);
    return FineModelComponent;
}());
exports.FineModelComponent = FineModelComponent;
