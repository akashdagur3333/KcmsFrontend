"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DriveComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var drive_model_component_1 = require("src/app/Model/drive-model/drive-model.component");
var student_model_component_1 = require("src/app/Model/student-model/student-model.component");
var sweetalert2_1 = require("sweetalert2");
var DriveComponent = /** @class */ (function () {
    function DriveComponent(dialog, api, route) {
        this.dialog = dialog;
        this.api = api;
        this.route = route;
        this.displayedColumns = ['id', 'drive_id', 'clg_id', 'college_name', 'drive_type', 'team_lead', 'hr_name', 'technical_person', 'mode_of_travel', 'travel_type', 'submit_by', 'add', 'action'];
    }
    DriveComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    DriveComponent.prototype.ngOnInit = function () {
        this.Activate();
        this.getallDrives();
    };
    // openDrive(data:any){
    //   console.log(data)
    //   this.dialog.open(DriveModelComponent,{
    //     width:'30%',
    //     data:{data}
    //   })
    // }
    DriveComponent.prototype.getallDrives = function () {
        var _this = this;
        this.api.getAllDrives().subscribe({
            next: function (res) {
                res.reverse();
                _this.dataSource = new table_1.MatTableDataSource(res);
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
    DriveComponent.prototype.editDrive = function (data) {
        var _this = this;
        this.dialog.open(drive_model_component_1.DriveModelComponent, {
            width: '30%',
            data: { data: data }
        }).afterClosed().subscribe(function (val) {
            if (val == 'Update') {
                _this.getallDrives();
            }
        });
    };
    DriveComponent.prototype.deleteDrive = function (id) {
        var _this = this;
        this.api.deleteDrives(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Drive Deleted Successfully', 'success');
                _this.getallDrives();
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
    DriveComponent.prototype.addStudent = function (add) {
        this.dialog.open(student_model_component_1.StudentModelComponent, {
            width: '50%',
            data: {
                add: add
            }
        });
    };
    DriveComponent.prototype.Activate = function () {
        var hrm = document.getElementById('hrm');
        var hrm1 = document.getElementById('hrm1');
        hrm === null || hrm === void 0 ? void 0 : hrm.classList.add("active");
        hrm1 === null || hrm1 === void 0 ? void 0 : hrm1.classList.add("active");
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], DriveComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], DriveComponent.prototype, "sort");
    DriveComponent = __decorate([
        core_1.Component({
            selector: 'app-drive',
            templateUrl: './drive.component.html',
            styleUrls: ['./drive.component.css']
        })
    ], DriveComponent);
    return DriveComponent;
}());
exports.DriveComponent = DriveComponent;
