import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-package-model',
  templateUrl: './package-model.component.html',
  styleUrls: ['./package-model.component.css']
})
export class PackageModelComponent implements OnInit{
packageForm!:FormGroup;
Submit='Add Package';
token:any;
createdBy:any;
errors:any; 
date:any;
constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<PackageModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:SettingService){}

ngOnInit(): void {
this.token=localStorage.getItem('token');
this.token=jwtDecode(this.token);
this.createdBy=this.token.username;


this.packageForm=this.formbuilder.group({
  package_name:['',Validators.required],
  stipend:['',Validators.required],
  training_days:['',Validators.required],
  basic:['',Validators.required],
  mobile_internet:['',Validators.required],
  project_allowance:['',Validators.required],
  other_allowance:['',Validators.required],
  incentives:['',Validators.required],
  special_all:['',Validators.required],
  esic:['',Validators.required],
  pf:['',Validators.required],
  admin:['',Validators.required],
  resources_development:['',Validators.required],
  variable_allowances:['',Validators.required],
  gross_deduction:['',Validators.required],
  ctcpm:['',Validators.required],
  ctcannual:['',Validators.required],
  net_pay:['',Validators.required],
  ctcafter:['',Validators.required],
  created_by:this.createdBy
})


if(this.editData){
this.Submit="Update Package",
this.packageForm.controls['package_name'].setValue(this.editData.package_name);
this.packageForm.controls['stipend'].setValue(this.editData.stipend);
this.packageForm.controls['training_days'].setValue(this.editData.training_days);
this.packageForm.controls['basic'].setValue(this.editData.basic);
this.packageForm.controls['mobile_internet'].setValue(this.editData.mobile_internet);
this.packageForm.controls['project_allowance'].setValue(this.editData.project_allowance);
this.packageForm.controls['other_allowance'].setValue(this.editData.other_allowance);
this.packageForm.controls['incentives'].setValue(this.editData.incentives);
this.packageForm.controls['special_all'].setValue(this.editData.special_all);
this.packageForm.controls['esic'].setValue(this.editData.esic);
this.packageForm.controls['pf'].setValue(this.editData.pf);
this.packageForm.controls['admin'].setValue(this.editData.admin);
this.packageForm.controls['resources_development'].setValue(this.editData.resources_development);
this.packageForm.controls['variable_allowances'].setValue(this.editData.variable_allowances);
this.packageForm.controls['gross_deduction'].setValue(this.editData.gross_deduction);
this.packageForm.controls['ctcpm'].setValue(this.editData.ctcpm);
this.packageForm.controls['ctcannual'].setValue(this.editData.ctcannual);
this.packageForm.controls['net_pay'].setValue(this.editData.net_pay);
this.packageForm.controls['ctcafter'].setValue(this.editData.ctcafter);
}
}
addPackage(){
  console.log(this.packageForm.value)
  if(!this.editData){
    if(this.packageForm.value.package_name=='' ||this.packageForm.value.stipend=='' ||this.packageForm.value.training_days==''){
      console.log('Fill All the fields')
    }
    else{
      this.api.addPackage(this.packageForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          // if(res.name=='ValidationError'){
          //   this.errors=res.errors    
          //   console.log(res)
          //   //  this.errors=res.errors;
          //   // this.errors.sort((x:any)=>{
          //   //   console.log(x.message);
          //   // })
          // }
          Swal.fire(
            'Good job!',
            'Package Added Successfully',
            'success'
          )
          this.packageForm.reset();
          this.dialog.close("Add");
        },
        error:(err)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: err
          })
        }
       })
    }
  }
else{
this.updatePackage()
}
 
}

updatePackage(){
  this.api.updatePackage(this.editData._id,this.packageForm.value).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'Package Updated Successfully',
        'success'
      )
      this.packageForm.reset();
      this.dialog.close("Update");
    },
    error:(err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: err
      })
    }
  })
}
}

