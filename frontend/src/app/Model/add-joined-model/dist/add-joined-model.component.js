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
exports.AddJoinedModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var AddJoinedModelComponent = /** @class */ (function () {
    function AddJoinedModelComponent(formbuilder, dialog, editData, api) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.Submit = 'Add Joined';
    }
    AddJoinedModelComponent.prototype.ngOnInit = function () {
        this.data = this.editData;
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.joinedForm = this.formbuilder.group({
            message: 'joined',
            status: 4,
            // failStatus,
            batch_start: ['', forms_1.Validators.required],
            training_start: ['', forms_1.Validators.required],
            training_complete: ['', forms_1.Validators.required],
            joining_date: ['', forms_1.Validators.required],
            hr_remarks: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        this.joinedForm.controls['batch_start'].setValue(this.data.inTraining[0].batch_start);
        this.joinedForm.controls['training_start'].setValue(this.data.inTraining[0].training_start);
        this.joinedForm.controls['training_complete'].setValue(this.data.completeTraining[0].training_complete);
        this.joinedForm.controls['hr_remarks'].setValue(this.data.completeTraining[0].hr_remarks);
    };
    AddJoinedModelComponent.prototype.addIntraining = function () {
        var _this = this;
        this.api.updateJobStatus(this.data._id, this.joinedForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Joined Successfully', 'success');
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
    AddJoinedModelComponent = __decorate([
        core_1.Component({
            selector: 'app-add-joined-model',
            templateUrl: './add-joined-model.component.html',
            styleUrls: ['./add-joined-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AddJoinedModelComponent);
    return AddJoinedModelComponent;
}());
exports.AddJoinedModelComponent = AddJoinedModelComponent;
