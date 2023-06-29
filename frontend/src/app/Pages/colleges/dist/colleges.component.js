"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CollegesComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var college_model_component_1 = require("src/app/Model/college-model/college-model.component");
var drive_model_component_1 = require("src/app/Model/drive-model/drive-model.component");
var sweetalert2_1 = require("sweetalert2");
var CollegesComponent = /** @class */ (function () {
    function CollegesComponent(dialog, api) {
        this.dialog = dialog;
        this.api = api;
        // displayedColumns: string[] = ['id','college_id','college_name','city','state','pin_code','type','tnp_head','date','add','action'];
        // dataSource!: MatTableDataSource<any>;
        // displayedColumns1: string[] = ['id','college_id','college_name','city','state','pin_code','type','tnp_head','date','add','action'];
        // dataSource1!: MatTableDataSource<any>;
        this.displayedColumns2 = ['id', 'category', 'college_id', 'college_name', 'city', 'state', 'pin_code', 'type', 'tnp_head', 'date', 'add', 'action'];
    }
    // applyFilter(event: Event) {
    //   const filterValue = (event.target as HTMLInputElement).value;
    //   this.dataSource.filter = filterValue.trim().toLowerCase();
    //   if (this.dataSource.paginator) {
    //     this.dataSource.paginator.firstPage();
    //   }
    // }
    // applyFilter1(event: Event) {
    //   const filterValue = (event.target as HTMLInputElement).value;
    //   this.dataSource1.filter = filterValue.trim().toLowerCase();
    //   if (this.dataSource1.paginator) {
    //     this.dataSource1.paginator.firstPage();
    //   }
    // }
    CollegesComponent.prototype.applyFilter2 = function (event) {
        var filterValue = event.target.value;
        this.dataSource2.filter = filterValue.trim().toLowerCase();
        if (this.dataSource2.paginator) {
            this.dataSource2.paginator.firstPage();
        }
    };
    CollegesComponent.prototype.ngOnInit = function () {
        this.getallColleges();
    };
    CollegesComponent.prototype.OpenModel = function () {
        var _this = this;
        this.dialog.open(college_model_component_1.CollegeModelComponent, {
            width: '50%'
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getallColleges();
            }
        });
    };
    // addPanel(data:any){
    //   this.dialog.open(CollegeModelComponent,{
    //     width:'30%',
    //     data:data
    //   }).afterClosed().subscribe(val=>{
    //     if(val=='Panel'){
    //       this.getallColleges();
    //     }
    //   })
    // }
    CollegesComponent.prototype.openDrive = function (id) {
        var id1 = id._id;
        this.dialog.open(drive_model_component_1.DriveModelComponent, {
            width: '30%',
            data: { id1: id1, college: id }
        });
    };
    CollegesComponent.prototype.getallColleges = function () {
        var _this = this;
        this.api.getAllColleges().subscribe({
            next: function (res) {
                _this.allColleges = res;
                _this.proposedCollege = res.filter(function (X) {
                    return X.status === 1;
                });
                _this.panelCollege = res.filter(function (X) {
                    return X.status === 2;
                });
                _this.panelCollege.reverse();
                // this.dataSource = new MatTableDataSource(this.panelCollege);
                // this.dataSource.paginator= this.paginator;
                // this.dataSource.sort =this.sort;
                // this.proposedCollege.reverse();
                // this.dataSource1 = new MatTableDataSource(this.proposedCollege);
                // this.dataSource1.paginator= this.paginator1;
                // this.dataSource1.sort =this.sort1;
                _this.allColleges.reverse();
                _this.dataSource2 = new table_1.MatTableDataSource(_this.allColleges);
                _this.dataSource2.paginator = _this.paginator2;
                _this.dataSource2.sort = _this.sort2;
                res.filter(function (x) {
                    if (x.status == 1) {
                        x.status = "Perposed College";
                        // var id = document.getElementById('addDrive');
                        //  console.log(id)
                    }
                    else {
                        x.status = "Panel College";
                    }
                });
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
    CollegesComponent.prototype.editColleges = function (data) {
        var _this = this;
        this.dialog.open(college_model_component_1.CollegeModelComponent, {
            width: '30%',
            data: data
        }).afterClosed().subscribe(function (val) {
            if (val == 'Update') {
                _this.getallColleges();
            }
        });
    };
    CollegesComponent.prototype.deleteColleges = function (id) {
        var _this = this;
        this.api.deleteColleges(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'college Deleted Successfully', 'success');
                _this.getallColleges();
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
    ], CollegesComponent.prototype, "paginator2");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], CollegesComponent.prototype, "sort2");
    CollegesComponent = __decorate([
        core_1.Component({
            selector: 'app-colleges',
            templateUrl: './colleges.component.html',
            styleUrls: ['./colleges.component.css']
        })
    ], CollegesComponent);
    return CollegesComponent;
}());
exports.CollegesComponent = CollegesComponent;
