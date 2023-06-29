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
exports.QuestionModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var ClassicEditorBuild = require("@ckeditor/ckeditor5-build-classic");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var QuestionModelComponent = /** @class */ (function () {
    function QuestionModelComponent(formbuilder, dialog, editData, api) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.title = 'angular-template-ckeditor5-classic';
        this.Editor = ClassicEditorBuild;
        this.Submit = 'Add Question';
    }
    QuestionModelComponent.prototype.onReady = function (editor) {
        console.log("CKEditor5 Angular Component is ready to use!", editor);
    };
    QuestionModelComponent.prototype.onChange = function (_a) {
        var editor = _a.editor;
        var data = editor.data.get();
        this.questionForm.controls['question'].setValue(data);
        console.log(data);
    };
    QuestionModelComponent.prototype.ngOnInit = function () {
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.questionForm = this.formbuilder.group({
            questionType: ['', forms_1.Validators.required],
            name: ['', forms_1.Validators.required],
            question: ['', forms_1.Validators.required],
            opt1: ['', forms_1.Validators.required],
            opt2: ['', forms_1.Validators.required],
            opt3: ['', forms_1.Validators.required],
            opt4: ['', forms_1.Validators.required],
            answere: ['', forms_1.Validators.required],
            status: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        if (this.editData) {
            this.Submit = "Update Sub Department",
                this.questionForm.controls['head_department'].setValue(this.editData.head_department);
            this.questionForm.controls['Sub_department'].setValue(this.editData.Sub_department);
        }
    };
    QuestionModelComponent.prototype.addQuestion = function () {
        var _this = this;
        console.log(this.questionForm.value);
        if (!this.editData) {
            if (this.questionForm.value.head_department == '' || this.questionForm.value.Sub_department == '') {
                console.log('Fill All the fields');
            }
            else {
                this.api.addQuestion(this.questionForm.value).subscribe({
                    next: function (res) {
                        console.log(res);
                        // if(res.name=='ValidationError'){
                        //   this.errors=res.errors    
                        //   console.log(res)
                        //   //  this.errors=res.errors;
                        //   // this.errors.sort((x:any)=>{
                        //   //   console.log(x.message);
                        //   // })
                        // }
                        sweetalert2_1["default"].fire('Good job!', 'Question Added Successfully', 'success');
                        _this.questionForm.reset();
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
    };
    QuestionModelComponent = __decorate([
        core_1.Component({
            selector: 'app-question-model',
            templateUrl: './question-model.component.html',
            styleUrls: ['./question-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], QuestionModelComponent);
    return QuestionModelComponent;
}());
exports.QuestionModelComponent = QuestionModelComponent;
