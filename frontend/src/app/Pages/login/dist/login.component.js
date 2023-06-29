"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(api, route) {
        this.api = api;
        this.route = route;
        this.login = {
            email: '',
            password: '',
            width: '',
            height: '',
            lat: '',
            lng: '',
            ipAddress: ''
        };
        this.hours = 0;
        this.minutes = 0;
        this.Seconds = 1;
        this.data = [];
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.getLocation();
        this.getipaddress();
        this.WindowWidth = window.innerWidth;
        this.WindowHeight = window.innerHeight;
        this.login.width = this.WindowWidth;
        this.login.height = this.WindowHeight;
        localStorage.removeItem('token');
    };
    LoginComponent.prototype.userLogin = function () {
        var _this = this;
        console.log(this.login.ipAddress);
        this.api.loginUser(this.login).subscribe({
            next: function (res) {
                var message = res.message;
                if (message == 'Login With Laptop') {
                    sweetalert2_1["default"].fire({
                        icon: 'error',
                        title: message,
                        text: 'Login With Laptop'
                    });
                }
                else if (message == 'user not found') {
                    sweetalert2_1["default"].fire({
                        icon: 'error',
                        title: message,
                        text: 'Create New Account'
                    }),
                        _this.route.navigate(['/login']);
                }
                else if (message == 'Password not match') {
                    sweetalert2_1["default"].fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: message
                    });
                }
                else if (message == 'User Inactive') {
                    sweetalert2_1["default"].fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: message
                    });
                }
                else if (message == 'Shift Over') {
                    sweetalert2_1["default"].fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: message
                    });
                }
                else if (message == 'login Successfully') {
                    sweetalert2_1["default"].fire('Good job!', 'Login Sucessfully', 'success');
                    localStorage.setItem('token', res.token);
                    var tokenData = jwt_decode_1["default"](res.token);
                    _this.token = tokenData;
                    var local = localStorage.getItem('timer');
                    if (local) {
                        localStorage.setItem('timer', local.toString());
                    }
                    tokenData = tokenData.role.toString();
                    if (tokenData == 'admin' || tokenData == 'nadmin') {
                        _this.route.navigate(['/Admin/user']);
                    }
                    else {
                        _this.route.navigate(['/User/index']);
                    }
                }
            },
            error: function (err) {
                sweetalert2_1["default"].fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please Live Backend'
                });
            }
        });
    };
    LoginComponent.prototype.getipaddress = function () {
        var _this = this;
        this.api.getIPAddress().subscribe({
            next: function (res) {
                _this.data = res;
                _this.login.ipAddress = _this.data.ip;
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    LoginComponent.prototype.getLocation = function () {
        var _this = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                if (position) {
                    _this.lat = position.coords.latitude;
                    _this.lng = position.coords.longitude;
                    _this.login.lat = _this.lat;
                    _this.login.lng = _this.lng;
                }
            }, function (error) { return console.log(error); });
        }
        else {
            alert("Geolocation is not supported by this browser.");
        }
    };
    LoginComponent.prototype.signin = function () {
        this.route.navigate(['/home']).then(function () {
            window.location.reload();
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
