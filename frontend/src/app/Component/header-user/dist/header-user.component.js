"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderUserComponent = void 0;
var core_1 = require("@angular/core");
var jwt_decode_1 = require("jwt-decode");
var moment = require("moment");
var HeaderUserComponent = /** @class */ (function () {
    function HeaderUserComponent(router, api, formbuilder) {
        var _this = this;
        this.router = router;
        this.api = api;
        this.formbuilder = formbuilder;
        this.Start = 0;
        this.count = 1000;
        this.TotalActiveTime = [];
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.username = this.token.username;
        var local = localStorage.getItem('timer');
        this.time = setInterval(function () {
            _this.Start = Number(_this.Start) + 1;
            var y = _this.Start;
            localStorage.setItem('timer', _this.Start.toString());
            _this.Seconds = Math.floor(y % 60);
            _this.minutes = Math.floor((y / 60) % 60);
            _this.hours = Math.floor((y / (60 * 60)));
            //  if(y>=300){
            //   this.router.navigate(['/login']);
            //   localStorage.removeItem('timer');
            //   clearInterval(time)
            //  }
        }, 1000);
        if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
            var getpendingtime = Number(localStorage.getItem('timer'));
            this.Start = getpendingtime;
            // const second=Math.floor(this.Start % 60);
            // const minute= Math.floor((this.Start/60) % 60);
            // const hour=Math.floor((this.Start/(60*60)));
            this.Status = this.formbuilder.group({
                totalActive: this.Start
            });
            this.updateData(this.token.rpt_id, this.Status.value);
        }
    }
    HeaderUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        var date = new Date();
        var dateFormat = moment(date).format('YYYY/MM/DD');
        this.api.getTotalActive(this.token.rpt_id).subscribe({
            next: function (res) {
                _this.TotalActiveTime = res.find(function (x) {
                    if (x.date == dateFormat) {
                        _this.Start = x.totalActive;
                    }
                });
            },
            error: function (err) {
                console.log(err);
            }
        });
        var role = this.token.role;
        if (role == 'hr') {
            this.title = 'HR';
        }
        else if (role == 'technical') {
            this.title = 'TECHNICAL';
        }
    };
    HeaderUserComponent.prototype.updateData = function (id, value) {
        this.api.updateLoginStatus(id, value).subscribe({
            next: function (res) {
                console.log(res);
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    HeaderUserComponent.prototype.logout = function () {
        var _a;
        var currentDateTime = new Date();
        var dateUTC = currentDateTime.getTime();
        var dateIST = new Date(dateUTC);
        dateIST.setHours(dateIST.getHours() + 5);
        dateIST.setMinutes(dateIST.getMinutes() + 30);
        this.CurentTime = (_a = localStorage.getItem('timer')) === null || _a === void 0 ? void 0 : _a.toString();
        this.CurentTime = Number(this.CurentTime);
        // const second=Math.floor(this.CurentTime % 60);
        // const minute= Math.floor((this.CurentTime/60) % 60);
        // const hour=Math.floor((this.CurentTime/(60*60)));
        this.Status = this.formbuilder.group({
            logout: dateIST,
            totalActive: this.CurentTime
        });
        this.updateData(this.token.rpt_id, this.Status.value);
        this.router.navigate(['/']);
        localStorage.clear();
        clearInterval(this.time);
    };
    HeaderUserComponent = __decorate([
        core_1.Component({
            selector: 'app-header-user',
            templateUrl: './header-user.component.html',
            styleUrls: ['./header-user.component.css']
        })
    ], HeaderUserComponent);
    return HeaderUserComponent;
}());
exports.HeaderUserComponent = HeaderUserComponent;
