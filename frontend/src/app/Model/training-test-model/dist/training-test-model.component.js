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
exports.TrainingTestModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var add_question_model_component_1 = require("../add-question-model/add-question-model.component");
var add_user_model_component_1 = require("../add-user-model/add-user-model.component");
var TrainingTestModelComponent = /** @class */ (function () {
    function TrainingTestModelComponent(formbuilder, dialog1, dialog, editData, api) {
        this.formbuilder = formbuilder;
        this.dialog1 = dialog1;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.Submit = 'Add Test';
    }
    TrainingTestModelComponent.prototype.ngOnInit = function () {
        // localStorage.removeItem('addQuestion');
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.testForm = this.formbuilder.group({
            test_name: ['', forms_1.Validators.required],
            test_date: ['', forms_1.Validators.required],
            test_start: ['', forms_1.Validators.required],
            test_timing: ['', forms_1.Validators.required],
            test_status: ['', forms_1.Validators.required],
            question: [],
            user: [],
            created_by: this.createdBy
        });
        if (this.editData) {
            // var date=this.editData.data.test_date;
            // date=moment.utc(date).format('DD/MM/YYYY')
            this.Submit = "Update Test",
                this.allQuestion = this.editData.data.question;
            this.res = this.editData.data.user;
            this.testForm.controls['test_name'].setValue(this.editData.data.test_name);
            this.testForm.controls['test_date'].setValue(this.editData.data.test_date);
            this.testForm.controls['test_start'].setValue(this.editData.data.test_start);
            this.testForm.controls['test_timing'].setValue(this.editData.data.test_timing);
            this.testForm.controls['test_status'].setValue(this.editData.data.test_status);
            this.testForm.controls['question'].setValue(this.allQuestion);
            this.testForm.controls['user'].setValue(this.res);
        }
    };
    TrainingTestModelComponent.prototype.addTest = function () {
        var _this = this;
        this.testForm.controls['question'].setValue(this.allQuestion);
        this.testForm.controls['user'].setValue(this.res);
        // console.log(this.testForm.value)
        if (!this.editData) {
            if (this.testForm.value.test_name == '' || this.testForm.value.test_date == '') {
                console.log('Fill All the fields');
            }
            else {
                this.api.addTest(this.testForm.value).subscribe({
                    next: function (res) {
                        sweetalert2_1["default"].fire('Good job!', 'Test Added Successfully', 'success');
                        _this.testForm.reset();
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
            this.updatetrainingTest();
        }
    };
    TrainingTestModelComponent.prototype.updatetrainingTest = function () {
        var _this = this;
        this.api.updateTest(this.editData.data._id, this.testForm.value).subscribe({
            next: function (res) {
                console.log(res);
                sweetalert2_1["default"].fire('Good job!', 'Test Updated Successfully', 'success');
                _this.testForm.reset();
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
    TrainingTestModelComponent.prototype.openAddQuestion = function () {
        var _this = this;
        this.dialog1.open(add_question_model_component_1.AddQuestionModelComponent, {
            width: '60%'
        }).afterClosed().subscribe(function (res) {
            _this.allQuestion = res;
        });
    };
    TrainingTestModelComponent.prototype.openAddUser = function () {
        var _this = this;
        this.dialog1.open(add_user_model_component_1.AddUserModelComponent, {
            width: '60%'
        }).afterClosed().subscribe(function (res) {
            _this.res = res;
        });
    };
    TrainingTestModelComponent.prototype.deleteQuestion = function (id) {
        var index = this.allQuestion.findIndex(function (x) { return x._id == id; });
        if (index > -1) {
            this.allQuestion.splice(index, 1);
        }
        console.log(this.allQuestion);
    };
    TrainingTestModelComponent.prototype.deleteUser = function (id) {
        var index = this.res.findIndex(function (x) { return x._id == id; });
        if (index > -1) {
            this.res.splice(index, 1);
        }
        console.log(this.res);
    };
    TrainingTestModelComponent = __decorate([
        core_1.Component({
            selector: 'app-training-test-model',
            templateUrl: './training-test-model.component.html',
            styleUrls: ['./training-test-model.component.css']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], TrainingTestModelComponent);
    return TrainingTestModelComponent;
}());
exports.TrainingTestModelComponent = TrainingTestModelComponent;
