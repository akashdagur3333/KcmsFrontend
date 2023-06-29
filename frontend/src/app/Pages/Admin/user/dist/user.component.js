"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var jwt_decode_1 = require("jwt-decode");
var add_normal_user_model_component_1 = require("src/app/Model/add-normal-user-model/add-normal-user-model.component");
var add_normal_component_1 = require("src/app/Model/add-normal/add-normal.component");
var user_model_component_1 = require("src/app/Model/user-model/user-model.component");
var sweetalert2_1 = require("sweetalert2");
var UserComponent = /** @class */ (function () {
    function UserComponent(formbuilder, api, dialog, router) {
        this.formbuilder = formbuilder;
        this.api = api;
        this.dialog = dialog;
        this.router = router;
        this.displayedColumns = ['id', 'rpt_id', 'username', 'email', 'phone_no', 'role', 'status', 'action'];
        this.resData = [];
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.token = localStorage.getItem('token');
        var localToken = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.username = this.token.username;
        this.token = this.token.role;
        this.token = this.token.toString();
        // console.log(localToken)
        if (localToken == null) {
            this.router.navigate(['/login']);
        }
        else {
            this.api.checkToken().subscribe(function (response) {
                if (response.message == "true") {
                    if (_this.token == 'admin' || _this.token == 'nadmin') {
                        _this.router.navigate(['/user']);
                        _this.getAllUser();
                        _this.UserForm = _this.formbuilder.group({
                            user_name: ['', forms_1.Validators.required],
                            email: ['', forms_1.Validators.required],
                            password: ['', forms_1.Validators.required],
                            confirm_password: ['', forms_1.Validators.required],
                            roles: ['', forms_1.Validators.required],
                            phone_no: ['', forms_1.Validators.required]
                        });
                    }
                    else {
                        _this.router.navigate(['/user/home']);
                    }
                }
                else if (response.message == "Token Expired") {
                    sweetalert2_1["default"].fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Token Expired'
                    });
                    _this.router.navigate(['/login']);
                }
                else if (response.message = "Authentication failed") {
                    sweetalert2_1["default"].fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Authentication failed'
                    });
                    _this.router.navigate(['/login']);
                }
                // console.log(response);
                // console.log("chal gya ")
            });
        }
    };
    UserComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    UserComponent.prototype.addUser = function () {
        var _this = this;
        if (this.UserForm.value.password == this.UserForm.value.confirm_password) {
            this.api.adduserData(this.UserForm.value).subscribe({
                next: function (res) {
                    // console.log(res);
                    if (res.message == 'user already registered') {
                        sweetalert2_1["default"].fire('Good job!', 'User Already registered', 'success');
                    }
                    else {
                        sweetalert2_1["default"].fire('Good job!', 'User Added Successfully', 'success');
                        _this.getAllUser();
                        _this.UserForm.reset();
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
        else {
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Incorrect Password!'
            });
        }
    };
    UserComponent.prototype.getAllUser = function () {
        var _this = this;
        this.api.alluser().subscribe({
            next: function (res) {
                res.map(function (x) {
                    if (x.rpt_id) {
                        x.rpt_id = 'RPT' + x.rpt_id;
                    }
                    if (x.status == false) {
                        x.status = 'Active';
                    }
                });
                _this.resData = res;
                _this.resData.reverse();
                _this.dataSource = new table_1.MatTableDataSource(_this.resData);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
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
    UserComponent.prototype.OpenModel = function () {
        var _this = this;
        var person = prompt("Please Enter User type", "Admin/Normal");
        var data = person === null || person === void 0 ? void 0 : person.toLowerCase();
        if (data == 'admin') {
            this.dialog.open(user_model_component_1.UserModelComponent, {
                width: '50%'
            }).afterClosed().subscribe(function (val) {
                if (val == 'Add') {
                    _this.getAllUser();
                }
            });
        }
        else if (data == 'normal') {
            this.dialog.open(add_normal_component_1.AddNormalComponent, {
                width: '50%',
                height: '80%'
            }).afterClosed().subscribe(function (val) {
                if (val == 'Add') {
                    _this.getAllUser();
                }
            });
        }
        console.log(data);
    };
    UserComponent.prototype.editUser = function (user) {
        var _this = this;
        if (user.role == 'nadmin' || user.role == 'admin') {
            this.dialog.open(user_model_component_1.UserModelComponent, {
                width: '30%',
                data: user
            }).afterClosed().subscribe(function (val) {
                if (val == 'Update') {
                    _this.getAllUser();
                }
            });
        }
        else {
            this.dialog.open(add_normal_user_model_component_1.AddNormalUserModelComponent, {
                width: '50%',
                height: '70%',
                data: user
            }).afterClosed().subscribe(function (val) {
                if (val == 'Update') {
                    _this.getAllUser();
                }
            });
        }
    };
    UserComponent.prototype.deleteUser = function (id) {
        var _this = this;
        this.api.deleteUser(id, { role: this.token }).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'User Deleted Successfully', 'success');
                _this.getAllUser();
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
    ], UserComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], UserComponent.prototype, "sort");
    UserComponent = __decorate([
        core_1.Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.css']
        })
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
