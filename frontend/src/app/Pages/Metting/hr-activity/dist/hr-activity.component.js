"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HrActivityComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var hr_activity_model_component_1 = require("src/app/Model/hr-activity-model/hr-activity-model.component");
var sweetalert2_1 = require("sweetalert2");
var HrActivityComponent = /** @class */ (function () {
    function HrActivityComponent(dialog, api) {
        this.dialog = dialog;
        this.api = api;
        this.displayedColumns = ['id', 'hra_id', 'assign_to', 'invite_to', 'shift', 'start_time', 'end_time', 'location', 'name', 'description', 'hr_remarks', 'submit_by', 'action'];
    }
    HrActivityComponent.prototype.ngOnInit = function () {
        this.getAllHrActivity();
    };
    HrActivityComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    HrActivityComponent.prototype.getAllHrActivity = function () {
        var _this = this;
        this.api.getAllHrActivity().subscribe({
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
    // fromPool(event:Event,data:any){
    //   var value= (event.target as HTMLInputElement).value;
    //   console.log(value,data)
    //   if(value=='2'){
    //   this.dialog.open(AddIntrainingModelComponent,{
    //   width:'60%',
    //   height:'70%',
    //   data:data
    //   }).afterClosed().subscribe(val=>{
    //     if(val=='Update'){
    //       this.getInPool();
    //     }
    //   })
    //   }
    //   else if(value=='5'){
    //     this.dialog.open(AddLeftModelComponent,{
    //       width:'60%',
    //       height:'60%',
    //       data:{inpool:data}
    //       }).afterClosed().subscribe(val=>{
    //         if(val=='Update'){
    //           this.getInPool();
    //         }
    //       })
    //   }
    // } 
    HrActivityComponent.prototype.OpenModel = function () {
        var _this = this;
        this.dialog.open(hr_activity_model_component_1.HrActivityModelComponent, {
            width: '50%'
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllHrActivity();
            }
        });
    };
    HrActivityComponent.prototype.editActivity = function (data) {
        var _this = this;
        this.dialog.open(hr_activity_model_component_1.HrActivityModelComponent, {
            width: '30%',
            data: data
        }).afterClosed().subscribe(function (val) {
            if (val == 'Update') {
                _this.getAllHrActivity();
            }
        });
    };
    HrActivityComponent.prototype.deleteActivity = function (id) {
        var _this = this;
        this.api.deleteHrActivity(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'HR Activity Deleted Successfully', 'success');
                _this.getAllHrActivity();
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
    ], HrActivityComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], HrActivityComponent.prototype, "sort");
    HrActivityComponent = __decorate([
        core_1.Component({
            selector: 'app-hr-activity',
            templateUrl: './hr-activity.component.html',
            styleUrls: ['./hr-activity.component.css']
        })
    ], HrActivityComponent);
    return HrActivityComponent;
}());
exports.HrActivityComponent = HrActivityComponent;
