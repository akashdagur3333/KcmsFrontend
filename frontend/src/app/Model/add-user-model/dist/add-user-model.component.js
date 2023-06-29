"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddUserModelComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var AddUserModelComponent = /** @class */ (function () {
    function AddUserModelComponent(api, dialog1) {
        this.api = api;
        this.dialog1 = dialog1;
        this.user = [];
    }
    AddUserModelComponent.prototype.ngOnInit = function () {
        this.getAllUser();
        // localStorage.removeItem('adduser');
    };
    AddUserModelComponent.prototype.getAllUser = function () {
        var _this = this;
        this.api.getAllReporting().subscribe({
            next: function (res) {
                _this.res = res;
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
    // dialog(){
    //   this.dialog1.close("user");
    // }
    // adduser(data:{},id:any){
    //   if(this.user==''){
    //     this.user.push(data)
    //     localStorage.setItem('adduser',JSON.stringify(this.user));
    //   }
    //   else{
    //    this.user.find((x:any)=>{
    //       if(x._id==id){
    //       alert('already exist')
    //       }
    //       else{
    //         this.user.push(data)
    //         localStorage.setItem('adduser',JSON.stringify(this.user));
    //       }
    //         });
    //   // if(!this.x){
    //   //       this.user.push(data)
    //   //       console.log(this.user)
    //   //       }
    //   }
    //    console.log(this.user)
    // }
    AddUserModelComponent.prototype.userChange = function ($event, data1, id) {
        var data = data1;
        var isChecked = $event.target.checked;
        // console.log(data,isChecked)
        if (isChecked == true) {
            this.user.push(data);
            console.log(this.user);
        }
        else {
            var index = this.user.findIndex(function (x) { return x._id == id; });
            if (index > -1) {
                this.user.splice(index, 1);
            }
            console.log(this.user);
            return this.user;
        }
    };
    AddUserModelComponent.prototype.addUser = function () {
        var data = this.user;
        this.dialog1.close(data);
    };
    AddUserModelComponent = __decorate([
        core_1.Component({
            selector: 'app-add-user-model',
            templateUrl: './add-user-model.component.html',
            styleUrls: ['./add-user-model.component.css']
        })
    ], AddUserModelComponent);
    return AddUserModelComponent;
}());
exports.AddUserModelComponent = AddUserModelComponent;
//         this.user.findIndex((x:any)=>{
//                 if(x._id==id){
// console.log(x)
//                 }
//                   });      }
// console.log(this.user)
// }
