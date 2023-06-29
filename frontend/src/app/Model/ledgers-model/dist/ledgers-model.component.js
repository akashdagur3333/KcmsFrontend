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
exports.LedgersModelComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var jwt_decode_1 = require("jwt-decode");
var sweetalert2_1 = require("sweetalert2");
var LedgersModelComponent = /** @class */ (function () {
    function LedgersModelComponent(formbuilder, dialog, editData, api) {
        this.formbuilder = formbuilder;
        this.dialog = dialog;
        this.editData = editData;
        this.api = api;
        this.Submit = 'Add Ledger';
    }
    LedgersModelComponent.prototype.ngOnInit = function () {
        this.token = localStorage.getItem('token');
        this.token = jwt_decode_1["default"](this.token);
        this.createdBy = this.token.username;
        this.ledgerForm = this.formbuilder.group({
            ledger_name: ['', forms_1.Validators.required],
            created_by: this.createdBy
        });
        if (this.editData) {
            this.Submit = "Update Ledger",
                this.ledgerForm.controls['ledger_name'].setValue(this.editData.ledger_name);
        }
    };
    LedgersModelComponent.prototype.addLedger = function () {
        var _this = this;
        if (!this.editData) {
            if (this.ledgerForm.value.ledger_name == '') {
                console.log('Fill All the fields');
            }
            else {
                this.api.addLedger(this.ledgerForm.value).subscribe({
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
                        sweetalert2_1["default"].fire('Good job!', 'Ledger Added Successfully', 'success');
                        _this.ledgerForm.reset();
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
            this.updateLedger();
        }
    };
    LedgersModelComponent.prototype.updateLedger = function () {
        var _this = this;
        this.api.updateLedger(this.editData._id, this.ledgerForm.value).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Ledger Updated Successfully', 'success');
                _this.ledgerForm.reset();
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
    LedgersModelComponent = __decorate([
        core_1.Component({
            selector: 'app-ledgers-model',
            templateUrl: './ledgers-model.component.html',
            styleUrls: ['./ledgers-model.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], LedgersModelComponent);
    return LedgersModelComponent;
}());
exports.LedgersModelComponent = LedgersModelComponent;
