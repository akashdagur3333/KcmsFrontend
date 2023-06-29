"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TestQuestionsComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var question_model_component_1 = require("src/app/Model/question-model/question-model.component");
var sweetalert2_1 = require("sweetalert2");
var TestQuestionsComponent = /** @class */ (function () {
    function TestQuestionsComponent(dialog, api) {
        this.dialog = dialog;
        this.api = api;
        this.displayedColumns = ['id', 'qst_id', 'name', 'title', 'type', 'ques1', 'ques2', 'ques3', 'ques4', 'ans', 'status', 'action'];
    }
    TestQuestionsComponent.prototype.ngOnInit = function () {
        this.getAllQuestion();
    };
    TestQuestionsComponent.prototype.OpenModel = function () {
        var _this = this;
        this.dialog.open(question_model_component_1.QuestionModelComponent, {
            width: '60%',
            height: '80%'
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllQuestion();
            }
        });
    };
    TestQuestionsComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    TestQuestionsComponent.prototype.getAllQuestion = function () {
        var _this = this;
        this.api.getAllQuestion().subscribe({
            next: function (res) {
                res.map(function (x) {
                    var question = x.question.split("\n");
                    x.question = question;
                });
                _this.res = res;
                _this.dataSource = new table_1.MatTableDataSource(res);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
                console.log(res);
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
    TestQuestionsComponent.prototype.deleteQuestion = function (id) {
        var _this = this;
        this.api.deleteQuestion(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Reporting Deleted Successfully', 'success');
                _this.getAllQuestion();
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
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], TestQuestionsComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], TestQuestionsComponent.prototype, "sort");
    TestQuestionsComponent = __decorate([
        core_1.Component({
            selector: 'app-test-questions',
            templateUrl: './test-questions.component.html',
            styleUrls: ['./test-questions.component.css']
        })
    ], TestQuestionsComponent);
    return TestQuestionsComponent;
}());
exports.TestQuestionsComponent = TestQuestionsComponent;
