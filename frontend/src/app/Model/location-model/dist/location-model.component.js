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
exports.LocationModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var LocationModelComponent = /** @class */ (function () {
    function LocationModelComponent(formbuilder, dialog, editData, api) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.Submit = 'Add Location';
    }
    LocationModelComponent.prototype.ngOnInit = function () {
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.locationForm = this.formbuilder.group({
            office_code: ['', forms_1.Validators.required],
            location: ['', forms_1.Validators.required],
            address: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        if (this.editData) {
            this.Submit = "Update Location",
                this.locationForm.controls['office_code'].setValue(this.editData.office_code);
            this.locationForm.controls['location'].setValue(this.editData.location);
            this.locationForm.controls['address'].setValue(this.editData.address);
        }
    };
    LocationModelComponent.prototype.addLocations = function () {
        var _this = this;
        console.log(this.locationForm.value);
        if (!this.editData) {
            if (this.locationForm.value.office_code == '' || this.locationForm.value.location == '' || this.locationForm.value.address == '') {
                console.log('Fill All the fields');
            }
            else {
                this.api.addLocation(this.locationForm.value).subscribe({
                    next: function (res) {
                        console.log(res);
                        // if(res.name=='ValidationError'){
                        //   this.errors=res.errors    
                        //   console.log(res)
                        //   //  this.errors=res.errors;
                        //   // this.errors.sort((x:any)=>{
                        //   //   console.log(x.message);
                        //   // })
                        // }
                        sweetalert2_1["default"].fire('Good job!', 'Location Added Successfully', 'success');
                        _this.locationForm.reset();
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
            this.updateLocations();
        }
    };
    LocationModelComponent.prototype.updateLocations = function () {
        var _this = this;
        this.api.updateLocation(this.editData._id, this.locationForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Location Updated Successfully', 'success');
                _this.locationForm.reset();
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
    LocationModelComponent = __decorate([
        core_1.Component({
            selector: 'app-location-model',
            templateUrl: './location-model.component.html',
            styleUrls: ['./location-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], LocationModelComponent);
    return LocationModelComponent;
}());
exports.LocationModelComponent = LocationModelComponent;
