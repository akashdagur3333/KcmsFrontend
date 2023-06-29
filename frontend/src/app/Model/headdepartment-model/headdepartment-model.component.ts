import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-headdepartment-model',
  templateUrl: './headdepartment-model.component.html',
  styleUrls: ['./headdepartment-model.component.css']
})
export class HeaddepartmentModelComponent implements OnInit{
  headdepartmentForm!:FormGroup;


  Submit='Add Head Department';
  token:any;
  createdBy:any;
  errors:any; 
  date:any;
  constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<HeaddepartmentModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:SettingService){}

  ngOnInit(): void {
this.token=localStorage.getItem('token');
this.token=jwtDecode(this.token);
this.createdBy=this.token.username;

  this.headdepartmentForm=this.formbuilder.group({
    name:['',Validators.required],
    created_by:this.createdBy
  })


if(this.editData){
  this.Submit="Update Head Department",
  this.headdepartmentForm.controls['name'].setValue(this.editData.name);
  }
  }
  addHeadDepartment(){
    if(!this.editData){
      if(this.headdepartmentForm.value.name==''){
        console.log('Fill All the fields')
      }
      else{
        this.api.addDepartment(this.headdepartmentForm.value).subscribe({
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
              'Head Department Added Successfully',
              'success'
            )
            this.headdepartmentForm.reset();
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
  this.updateDepartment()
}
   
  }

  updateDepartment(){
    this.api.updateDepartment(this.editData._id,this.headdepartmentForm.value).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'Head Department Updated Successfully',
          'success'
        )
        this.headdepartmentForm.reset();
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