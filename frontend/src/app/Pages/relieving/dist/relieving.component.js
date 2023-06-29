"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RelievingComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var sweetalert2_1 = require("sweetalert2");
var RelievingComponent = /** @class */ (function () {
    function RelievingComponent(dialog, api) {
        this.dialog = dialog;
        this.api = api;
        this.displayedColumns = ['id', 'name', 'father_name', 'aadhar_number', 'trn_id', 'training_start', 'training_completed', 'doj', 'seperation_date', 'emp_type', 'left_hr_remarks', 'rejoining', 'vsr_status', 'final_hr_remarks', 'created_by', 'action'];
    }
    RelievingComponent.prototype.ngOnInit = function () {
        this.getInPool();
    };
    RelievingComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    RelievingComponent.prototype.getInPool = function () {
        var _this = this;
        this.api.getAllRelieving().subscribe({
            next: function (res) {
                _this.dataSource = new table_1.MatTableDataSource(res);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
            },
            error: function (err) {
                console.log(err);
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
    ], RelievingComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], RelievingComponent.prototype, "sort");
    RelievingComponent = __decorate([
        core_1.Component({
            selector: 'app-relieving',
            templateUrl: './relieving.component.html',
            styleUrls: ['./relieving.component.css']
        })
    ], RelievingComponent);
    return RelievingComponent;
}());
exports.RelievingComponent = RelievingComponent;
