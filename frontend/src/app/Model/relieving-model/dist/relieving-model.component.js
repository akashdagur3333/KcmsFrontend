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
exports.RelievingModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var RelievingModelComponent = /** @class */ (function () {
    function RelievingModelComponent(formbuilder, dialog, editData, api) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.Submit = 'Add Relieving';
    }
    RelievingModelComponent.prototype.ngOnInit = function () {
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.relievingForm = this.formbuilder.group({
            name: ['', forms_1.Validators.required],
            father_name: ['', forms_1.Validators.required],
            aadhar_number: ['', forms_1.Validators.required],
            trn_id: ['', forms_1.Validators.required],
            training_start: ['', forms_1.Validators.required],
            training_completed: ['', forms_1.Validators.required],
            doj: ['', forms_1.Validators.required],
            seperation_date: ['', forms_1.Validators.required],
            emp_type: ['', forms_1.Validators.required],
            left_hr_remarks: ['', forms_1.Validators.required],
            rejoining: ['', forms_1.Validators.required],
            left_type: ['', forms_1.Validators.required],
            vsr_status: ['', forms_1.Validators.required],
            final_hr_remarks: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        if (this.editData.add) {
            console.log(this.editData.add.left[0].training_completed);
            if (this.editData.add.left[0].failStatus == 1) {
                this.failStatus = 'Awaited';
            }
            else if (this.editData.add.left[0].failStatus == 2) {
                this.failStatus = 'In Pool';
            }
            else if (this.editData.add.left[0].failStatus == 3) {
                this.failStatus = 'In Training';
            }
            else if (this.editData.add.left[0].failStatus == 4) {
                this.failStatus = 'Training Complete';
            }
            else if (this.editData.add.left[0].failStatus == 5) {
                this.failStatus = 'Joined';
            }
            this.allData = this.editData.add;
            this.relievingForm.controls['name'].setValue(this.editData.add.employee_name);
            this.relievingForm.controls['father_name'].setValue(this.editData.add.father_name);
            this.relievingForm.controls['aadhar_number'].setValue(this.editData.add.aadhar_number);
            this.relievingForm.controls['training_start'].setValue(this.editData.add.inTraining[0].training_start);
            this.relievingForm.controls['training_completed'].setValue(this.editData.add.completeTraining[0].training_completed);
            this.relievingForm.controls['doj'].setValue(this.editData.add.batch_starting_date);
            this.relievingForm.controls['seperation_date'].setValue(this.editData.add.left[0].seperation_date);
            this.relievingForm.controls['emp_type'].setValue(this.editData.add.employee_type);
            this.relievingForm.controls['left_hr_remarks'].setValue(this.editData.add.left[0].hr_remarks);
            this.relievingForm.controls['rejoining'].setValue(this.editData.add.left[0].rejoining_possible);
            this.relievingForm.controls['left_type'].setValue(this.editData.add.left[0].failStatus);
        }
        // else if(this.editData.edit){
        //    this.Submit="Update Relieving",
        //    this.relievingForm.controls['vsr_status'].setValue(this.editData.add.vsr_status);
        //    this.relievingForm.controls['final_hr_remarks'].setValue(this.editData.add.final_hr_remarks);
        //    }
    };
    RelievingModelComponent.prototype.addRelieving = function () {
        var _this = this;
        if (!this.editData.edit) {
            if (this.relievingForm.value.vsr_status == '' || this.relievingForm.value.final_hr_remarks == '') {
                console.log('Fill All the fields');
            }
            else {
                this.api.addRelieving(this.relievingForm.value).subscribe({
                    next: function (res) {
                        // if(res.name=='ValidationError'){
                        //   this.errors=res.errors    
                        //   console.log(res)
                        //   //  this.errors=res.errors;
                        //   // this.errors.sort((x:any)=>{
                        //   //   console.log(x.message);
                        //   // })
                        // }
                        sweetalert2_1["default"].fire('Good job!', 'Relieving Added Successfully', 'success');
                        _this.relievingForm.reset();
                        _this.dialog.close("Add");
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
        }
        else {
            this.updateRelieving();
        }
    };
    //  getAlldepartment()
    //  {
    //    this.api.getAllDepartment().subscribe({
    //      next:(res)=>{
    //        this.allDepartment=res;
    //      },
    //      error:(err)=>{
    //        Swal.fire({
    //          icon: 'error',
    //          title: 'Oops...',
    //          text: 'Something went wrong!',
    //          footer: err
    //        })
    //      }
    //    })
    //  }
    RelievingModelComponent.prototype.updateRelieving = function () {
        var _this = this;
        this.api.updateDesignation(this.editData.add._id, this.relievingForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Relieving Updated Successfully', 'success');
                _this.relievingForm.reset();
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
    };
    RelievingModelComponent = __decorate([
        core_1.Component({
            selector: 'app-relieving-model',
            templateUrl: './relieving-model.component.html',
            styleUrls: ['./relieving-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], RelievingModelComponent);
    return RelievingModelComponent;
}());
exports.RelievingModelComponent = RelievingModelComponent;
