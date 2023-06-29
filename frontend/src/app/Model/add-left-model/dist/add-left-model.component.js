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
exports.AddLeftModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var moment = require("moment");
var sweetalert2_1 = require("sweetalert2");
var AddLeftModelComponent = /** @class */ (function () {
    function AddLeftModelComponent(formbuilder, dialog, editData, api) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.Submit = 'Add Left';
    }
    AddLeftModelComponent.prototype.ngOnInit = function () {
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.joinedForm = this.formbuilder.group({
            message: 'left',
            status: 5,
            failStatus: ['', forms_1.Validators.required],
            batch_start: ['', forms_1.Validators.required],
            training_start: ['', forms_1.Validators.required],
            training_complete: ['', forms_1.Validators.required],
            joining_date: ['', forms_1.Validators.required],
            seperation_date: ['', forms_1.Validators.required],
            seperation_type: ['', forms_1.Validators.required],
            rejoining_possible: ['', forms_1.Validators.required],
            hr_remarks: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        console.log(this.editData);
        if (this.editData.awaited) {
            this.data = this.editData.awaited;
            this.getId();
            this.joinedForm.controls['failStatus'].setValue(1);
            // this.joinedForm.controls['batch_start'].setValue(this.data.inTraining[0].batch_start);
            // this.joinedForm.controls['training_start'].setValue(this.data.inTraining[0].training_start);
            // this.joinedForm.controls['training_complete'].setValue(this.data.completeTraining[0].training_complete);
            // this.joinedForm.controls['hr_remarks'].setValue(this.data.completeTraining[0].hr_remarks);
        }
        else if (this.editData.inpool) {
            this.data = this.editData.inpool;
            this.getId();
            this.joinedForm.controls['failStatus'].setValue(2);
        }
        else if (this.editData.intraining) {
            this.data = this.editData.intraining;
            this.joinedForm.controls['failStatus'].setValue(3);
            this.joinedForm.controls['batch_start'].setValue(this.data.inTraining[0].batch_start);
            this.joinedForm.controls['training_start'].setValue(this.data.inTraining[0].training_start);
        }
        else if (this.editData.trainingComplete) {
            this.data = this.editData.trainingComplete;
            this.joinedForm.controls['failStatus'].setValue(4);
            this.joinedForm.controls['batch_start'].setValue(this.data.inTraining[0].batch_start);
            this.joinedForm.controls['training_start'].setValue(this.data.inTraining[0].training_start);
            this.joinedForm.controls['training_complete'].setValue(this.data.completeTraining[0].training_complete);
            this.joinedForm.controls['hr_remarks'].setValue(this.data.completeTraining[0].hr_remarks);
            var doj = document.getElementById('doj');
            var dateforma = moment(this.data.batch_starting_date).format('DD/MM/YYYY');
            doj === null || doj === void 0 ? void 0 : doj.setAttribute('value', dateforma);
        }
        else if (this.editData.Joined) {
            this.data = this.editData.Joined;
            this.joinedForm.controls['failStatus'].setValue(5);
            this.joinedForm.controls['batch_start'].setValue(this.data.inTraining[0].batch_start);
            this.joinedForm.controls['training_start'].setValue(this.data.inTraining[0].training_start);
            this.joinedForm.controls['training_complete'].setValue(this.data.completeTraining[0].training_complete);
            this.joinedForm.controls['hr_remarks'].setValue(this.data.completeTraining[0].hr_remarks);
            var doj = document.getElementById('doj');
            var dateforma = moment(this.data.batch_starting_date).format('DD/MM/YYYY');
            doj === null || doj === void 0 ? void 0 : doj.setAttribute('value', dateforma);
        }
    };
    AddLeftModelComponent.prototype.getId = function () {
        var _a, _b, _c, _d, _e;
        this.batch_start = document.getElementById('batch_start');
        this.training_start = document.getElementById('training_start');
        this.training_complete = document.getElementById('training_complete');
        this.joining_date = document.getElementById('joining_date');
        (_a = this.batch_start) === null || _a === void 0 ? void 0 : _a.setAttribute('hidden', '');
        (_b = this.training_start) === null || _b === void 0 ? void 0 : _b.setAttribute('hidden', '');
        (_c = this.training_complete) === null || _c === void 0 ? void 0 : _c.setAttribute('hidden', '');
        (_d = this.joining_date) === null || _d === void 0 ? void 0 : _d.setAttribute('hidden', '');
        (_e = this.joining_date) === null || _e === void 0 ? void 0 : _e.removeAttribute('value');
    };
    AddLeftModelComponent.prototype.addIntraining = function () {
        var _this = this;
        this.api.updateJobStatus(this.data._id, this.joinedForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Left Successfully', 'success');
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
    AddLeftModelComponent = __decorate([
        core_1.Component({
            selector: 'app-add-left-model',
            templateUrl: './add-left-model.component.html',
            styleUrls: ['./add-left-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AddLeftModelComponent);
    return AddLeftModelComponent;
}());
exports.AddLeftModelComponent = AddLeftModelComponent;
