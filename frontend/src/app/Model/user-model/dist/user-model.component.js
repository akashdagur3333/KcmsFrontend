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
exports.UserModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var UserModelComponent = /** @class */ (function () {
    function UserModelComponent(formbuilder, api, dialog, editData, api1) {
        this.formbuilder = formbuilder;
        this.api = api;
        this.dialog = dialog;
        this.editData = editData;
        this.api1 = api1;
        this.Submit = 'Add Admin';
        this.submitted = false;
        // addData(event:Event,data:any) {
        //   const filterValue = (event.target as HTMLInputElement).value; 
        //   const username=document.getElementById('user_name');
        //   const email=document.getElementById('email');
        //   const password=document.getElementById('password');
        //   const roles=document.getElementById('roles');
        //   const confirm_password=document.getElementById('confirm_password');
        //   const phone_no=document.getElementById('phone_no');
        //   if(data=='username'){
        //     if(filterValue==''){
        //       username?.setAttribute('style','border-color:red')
        //     }
        //     else{
        //       username?.setAttribute('style','border-color:green')
        //     }
        //   }
        //   else if(data=='email'){
        //     if(filterValue==''){
        //       email?.setAttribute('style','border-color:red')
        //     }
        //     else{
        //       email?.setAttribute('style','border-color:green')
        //     }
        //   }
        //   else if(data=='password'){
        //     if(filterValue==''){
        //       password?.setAttribute('style','border-color:red')
        //     }
        //     else{
        //       password?.setAttribute('style','border-color:green')
        //     }
        //   }
        //   else if(data=='roles'){
        //     if(filterValue==''){
        //       roles?.setAttribute('style','border-color:red')
        //     }
        //     else{
        //       roles?.setAttribute('style','border-color:green')
        //     }
        //   }
        //   else if(data=='confirm_password'){
        //     if(filterValue==''){
        //       confirm_password?.setAttribute('style','border-color:red')
        //     }
        //     else{
        //       confirm_password?.setAttribute('style','border-color:green')
        //     }
        //   }
        //   else if(data=='phone_no'){
        //     if(filterValue==''){
        //       phone_no?.setAttribute('style','border-color:red')
        //     }
        //     else{
        //       phone_no?.setAttribute('style','border-color:green')
        //     }
        //   }
        //   // if(filterValue==''){
        //   //   password?.setAttribute('style','border-color:red')
        //   //   roles?.setAttribute('style','border-color:red')
        //   //   confirm_password?.setAttribute('style','border-color:red')
        //   //   phone_no?.setAttribute('style','border-color:red')
        //   // }
        //   // else{
        //   //   password?.setAttribute('style','border-color:green')
        //   //   roles?.setAttribute('style','border-color:green')
        //   //   confirm_password?.setAttribute('style','border-color:green')
        //   //   phone_no?.setAttribute('style','border-color:green')
        //   // }
        // }
        this.validate = [];
        this.data = [];
    }
    UserModelComponent.prototype.ngOnInit = function () {
        this.getAllEmployee();
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        var role = this.token.role;
        this.UserForm = this.formbuilder.group({
            user_name: ['', forms_1.Validators.required],
            // rpt_id:['',Validators.required],
            email: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            confirm_password: ['', forms_1.Validators.required],
            roles: ['', forms_1.Validators.required],
            role: role,
            phone_no: ['', forms_1.Validators.required]
        });
        if (this.editData) {
            this.Submit = 'Update Admin';
            this.UserForm.controls['user_name'].setValue(this.editData.username);
            this.UserForm.controls['email'].setValue(this.editData.email);
            this.UserForm.controls['roles'].setValue(this.editData.role);
            this.UserForm.controls['phone_no'].setValue(this.editData.phone_no);
        }
    };
    UserModelComponent.prototype.addUser = function () {
        var _this = this;
        if (!this.editData) {
            this.submitted = true;
            //  this.validate=Object.keys(this.UserForm.value)
            //   this.validate.forEach((element:any) => {
            //     this.data.push(element)
            //     // if(this.UserForm.value+'.'+element==''){
            //      })
            //      console.log(this.data)
            //      this.data.forEach((ele:any)=>{
            //       console.log(this.UserForm.value+'.'+ele)
            //      })
            // }
            if (this.UserForm.value.user_name == '' || this.UserForm.value.email == '' || this.UserForm.value.password == '' || this.UserForm.value.roles == '' || this.UserForm.value.confirm_password == '' || this.UserForm.value.phone_no == '') {
                console.log('fill the all field');
            }
            else {
                if (this.UserForm.value.password == this.UserForm.value.confirm_password) {
                    this.api.adduserData(this.UserForm.value).subscribe({
                        next: function (res) {
                            if (res.message == 'user already registered') {
                                sweetalert2_1["default"].fire('Good job!', 'User Already registered', 'success');
                            }
                            else if (res.message == 'You dont have permission') {
                                sweetalert2_1["default"].fire('Not Authorised!', 'You are not Super Admin', 'error');
                            }
                            else {
                                sweetalert2_1["default"].fire('Good job!', 'Admin Added Successfully', 'success');
                                _this.UserForm.reset();
                                _this.dialog.close("Add");
                            }
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
                else {
                    sweetalert2_1["default"].fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Confirm Password is not match!'
                    });
                }
            }
        }
        else {
            this.updateUser();
        }
    };
    UserModelComponent.prototype.getAllEmployee = function () {
        var _this = this;
        this.api1.getAllReporting().subscribe({
            next: function (res) {
                _this.AllEmployee = res.filter(function (x) {
                    if (x.status == 4) {
                        return x;
                    }
                });
            }, error: function (err) {
                console.log(err);
            }
        });
    };
    UserModelComponent.prototype.updateUser = function () {
        var _this = this;
        if (!this.UserForm.value.password) {
            this.api.updateUser(this.editData._id, this.UserForm.value).subscribe({
                next: function (res) {
                    sweetalert2_1["default"].fire('Good job!', 'User Updated Successfully', 'success');
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
        }
        else {
            if (this.UserForm.value.password == this.UserForm.value.confirm_password) {
                this.api.updateUser(this.editData._id, this.UserForm.value).subscribe({
                    next: function (res) {
                        sweetalert2_1["default"].fire('Good job!', 'User & Password Updated Successfully', 'success');
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
            }
            else {
                sweetalert2_1["default"].fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Confirm Password is not match!'
                });
            }
        }
    };
    UserModelComponent = __decorate([
        core_1.Component({
            selector: 'app-user-model',
            templateUrl: './user-model.component.html',
            styleUrls: ['./user-model.component.css']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], UserModelComponent);
    return UserModelComponent;
}());
exports.UserModelComponent = UserModelComponent;
