"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddQuestionModelComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var AddQuestionModelComponent = /** @class */ (function () {
    function AddQuestionModelComponent(api, dialog1) {
        this.api = api;
        this.dialog1 = dialog1;
        this.question = [];
    }
    AddQuestionModelComponent.prototype.ngOnInit = function () {
        this.getAllQuestion();
        // localStorage.removeItem('addQuestion');
    };
    AddQuestionModelComponent.prototype.getAllQuestion = function () {
        var _this = this;
        this.api.getAllQuestion().subscribe({
            next: function (res) {
                res.map(function (x) {
                    var question = x.question.split("\n");
                    x.question = question;
                });
                _this.res = res;
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
    // dialog(){
    //   this.dialog1.close("question");
    // }
    // addquestion(data:{},id:any){
    //   if(this.question==''){
    //     this.question.push(data)
    //     localStorage.setItem('addQuestion',JSON.stringify(this.question));
    //   }
    //   else{
    //    this.question.find((x:any)=>{
    //       if(x._id==id){
    //       alert('already exist')
    //       }
    //       else{
    //         this.question.push(data)
    //         localStorage.setItem('addQuestion',JSON.stringify(this.question));
    //       }
    //         });
    //   // if(!this.x){
    //   //       this.question.push(data)
    //   //       console.log(this.question)
    //   //       }
    //   }
    //    console.log(this.question)
    // }
    AddQuestionModelComponent.prototype.questionChange = function ($event, data1, id) {
        var data = data1;
        var isChecked = $event.target.checked;
        // console.log(data,isChecked)
        if (isChecked == true) {
            this.question.push(data);
            console.log(this.question);
        }
        else {
            var index = this.question.findIndex(function (x) { return x._id == id; });
            if (index > -1) {
                this.question.splice(index, 1);
            }
            console.log(this.question);
            return this.question;
        }
    };
    AddQuestionModelComponent.prototype.addQuestion = function () {
        var data = this.question;
        this.dialog1.close(data);
    };
    AddQuestionModelComponent = __decorate([
        core_1.Component({
            selector: 'app-add-question-model',
            templateUrl: './add-question-model.component.html',
            styleUrls: ['./add-question-model.component.css']
        })
    ], AddQuestionModelComponent);
    return AddQuestionModelComponent;
}());
exports.AddQuestionModelComponent = AddQuestionModelComponent;
//         this.question.findIndex((x:any)=>{
//                 if(x._id==id){
// console.log(x)
//                 }
//                   });      }
// console.log(this.question)
// }
