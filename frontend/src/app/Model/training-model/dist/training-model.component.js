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
exports.TrainingModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var moment = require("moment");
var sweetalert2_1 = require("sweetalert2");
var TrainingModelComponent = /** @class */ (function () {
    function TrainingModelComponent(formbuilder, dialog, editData, api, api1) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.api1 = api1;
        this.Submit = 'Add Batches';
    }
    TrainingModelComponent.prototype.ngOnInit = function () {
        this.getAllTrainer();
        this.getAllBatchSize();
        this.getAllSubdepartment();
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.batchForm = this.formbuilder.group({
            batch_name: ['', forms_1.Validators.required],
            batch_location: ['', forms_1.Validators.required],
            batch_starting_date: ['', forms_1.Validators.required],
            batch_size: ['', forms_1.Validators.required],
            batch_type: ['', forms_1.Validators.required],
            batch_trainer: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        if (this.editData) {
            this.Submit = "Update Batch",
                this.date = this.editData.batch_starting_date;
            this.date = moment(this.editData.batch_starting_date).utc().format('YYYY-MM-DD');
            this.batchForm.controls['batch_name'].setValue(this.editData.batch_name);
            this.batchForm.controls['batch_location'].setValue(this.editData.batch_location);
            this.batchForm.controls['batch_starting_date'].setValue(this.date);
            this.batchForm.controls['batch_size'].setValue(this.editData.batch_size);
            this.batchForm.controls['batch_type'].setValue(this.editData.batch_type);
            this.batchForm.controls['batch_trainer'].setValue(this.editData.batch_trainer);
            this.batchForm.controls['created_by'].setValue(this.createdBy);
        }
    };
    TrainingModelComponent.prototype.addBatch = function () {
        var _this = this;
        if (!this.editData) {
            if (this.batchForm.value.batch_name == '' || this.batchForm.value.batch_location == '' || this.batchForm.value.batch_starting_date == '' || this.batchForm.value.batch_size == '' || this.batchForm.value.batch_type == '' || this.batchForm.value.batch_trainer == '') {
                console.log('Fill All the fields');
            }
            else {
                this.api.addBatches(this.batchForm.value).subscribe({
                    next: function (res) {
                        if (res.name == 'ValidationError') {
                            _this.errors = res.errors;
                            console.log(res.errors);
                            //  this.errors=res.errors;
                            // this.errors.sort((x:any)=>{
                            //   console.log(x.message);
                            // })
                        }
                        sweetalert2_1["default"].fire('Good job!', 'Batch Added Successfully', 'success');
                        _this.batchForm.reset();
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
        }
        else {
            this.updateBatches();
        }
    };
    TrainingModelComponent.prototype.updateBatches = function () {
        var _this = this;
        this.api.updateBatches(this.editData._id, this.batchForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Batch Updated Successfully', 'success');
                _this.batchForm.reset();
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
    TrainingModelComponent.prototype.getAllSubdepartment = function () {
        var _this = this;
        this.api1.getAllSubdepartment().subscribe({
            next: function (res) {
                _this.allSubdepartment = res;
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    TrainingModelComponent.prototype.getAllBatchSize = function () {
        var _this = this;
        this.api1.getAllBatchSize().subscribe({
            next: function (res) {
                _this.allBatchSize = res;
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    TrainingModelComponent.prototype.getAllTrainer = function () {
        var _this = this;
        this.api1.getAllTrainer().subscribe({
            next: function (res) {
                _this.allTrainer = res;
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    TrainingModelComponent = __decorate([
        core_1.Component({
            selector: 'app-training-model',
            templateUrl: './training-model.component.html',
            styleUrls: ['./training-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], TrainingModelComponent);
    return TrainingModelComponent;
}());
exports.TrainingModelComponent = TrainingModelComponent;
