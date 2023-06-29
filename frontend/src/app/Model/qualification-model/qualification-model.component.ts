import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-qualification-model',
  templateUrl: './qualification-model.component.html',
  styleUrls: ['./qualification-model.component.css']
})
export class QualificationModelComponent implements OnInit{
qualificationForm!:FormGroup;
 Submit='Add Qualification';
token:any;
createdBy:any;
errors:any; 
date:any;
constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<QualificationModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:SettingService){}

ngOnInit(): void {
this.token=localStorage.getItem('token');
this.token=jwtDecode(this.token);
this.createdBy=this.token.username;

this.qualificationForm=this.formbuilder.group({
  qualification_name:['',Validators.required],
  created_by:this.createdBy
})


if(this.editData){
this.Submit="Update Qualification",
this.qualificationForm.controls['qualification_name'].setValue(this.editData.qualification_name);
}
}
addQualification(){
  if(!this.editData){
    if(this.qualificationForm.value.qualification_name==''){
      console.log('Fill All the fields')
    }
    else{
      this.api.addQualification(this.qualificationForm.value).subscribe({
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
            'Qualification Added Successfully',
            'success'
          )
          this.qualificationForm.reset();
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
this.updateQualification()
}
 
}

updateQualification(){
  this.api.updateQualification(this.editData._id,this.qualificationForm.value).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'qualification Updated Successfully',
        'success'
      )
      this.qualificationForm.reset();
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
