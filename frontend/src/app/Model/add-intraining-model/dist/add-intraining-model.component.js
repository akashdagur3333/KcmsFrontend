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
exports.AddIntrainingModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var AddIntrainingModelComponent = /** @class */ (function () {
    function AddIntrainingModelComponent(formbuilder, dialog, editData, api) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.Submit = 'Add In-Training';
    }
    AddIntrainingModelComponent.prototype.ngOnInit = function () {
        this.data = this.editData;
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.inTrainingForm = this.formbuilder.group({
            message: 'inTraining',
            status: 2,
            batch_start: ['', forms_1.Validators.required],
            training_start: ['', forms_1.Validators.required],
            address: ['', forms_1.Validators.required],
            pan_card: ['', forms_1.Validators.required],
            name: ['', forms_1.Validators.required],
            contact_number: ['', forms_1.Validators.required],
            relation: ['', forms_1.Validators.required],
            bank_name: ['', forms_1.Validators.required],
            ac_name: ['', forms_1.Validators.required],
            ac_number: ['', forms_1.Validators.required],
            ac_type: ['', forms_1.Validators.required],
            ifsc_code: ['', forms_1.Validators.required],
            micr_code: ['', forms_1.Validators.required],
            esic_number: ['', forms_1.Validators.required],
            epfo_number: ['', forms_1.Validators.required],
            uan_number: ['', forms_1.Validators.required],
            hr_remarks: ['', forms_1.Validators.required],
            document_name: ['', forms_1.Validators.required],
            file: ['', forms_1.Validators.required],
            file_name: ['', forms_1.Validators.required],
            file_status: ['', forms_1.Validators.required],
            deadline: ['', forms_1.Validators.required],
            doc_hr_remarks: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
    };
    AddIntrainingModelComponent.prototype.addIntraining = function () {
        var _this = this;
        this.api.updateJobStatus(this.data._id, this.inTrainingForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'In Training Updated Successfully', 'success');
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
    AddIntrainingModelComponent = __decorate([
        core_1.Component({
            selector: 'app-add-intraining-model',
            templateUrl: './add-intraining-model.component.html',
            styleUrls: ['./add-intraining-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AddIntrainingModelComponent);
    return AddIntrainingModelComponent;
}());
exports.AddIntrainingModelComponent = AddIntrainingModelComponent;
