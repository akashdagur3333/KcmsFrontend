import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subdepartment-model',
  templateUrl: './subdepartment-model.component.html',
  styleUrls: ['./subdepartment-model.component.css']
})
export class SubdepartmentModelComponent implements OnInit{
  subDepartmentForm!:FormGroup;
    Submit='Add Sub Department';
    token:any;
    createdBy:any;
    errors:any; 
    date:any;
    allDepartment:any;
    constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<SubdepartmentModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:SettingService){}
  
    ngOnInit(): void {
      this.getAlldepartment()
  this.token=localStorage.getItem('token');
  this.token=jwtDecode(this.token);
  this.createdBy=this.token.username;
  
    this.subDepartmentForm=this.formbuilder.group({
      head_department:['',Validators.required],
      Sub_department:['',Validators.required],
      created_by:this.createdBy
    })
  
  
  if(this.editData){
    this.Submit="Update Sub Department",
    this.subDepartmentForm.controls['head_department'].setValue(this.editData.head_department);
    this.subDepartmentForm.controls['Sub_department'].setValue(this.editData.Sub_department);
    }
    }
    addSubdepartment(){
      if(!this.editData){
        if(this.subDepartmentForm.value.head_department=='' || this.subDepartmentForm.value.Sub_department==''){
          console.log('Fill All the fields')
        }
        else{
          this.api.addSubDepartment(this.subDepartmentForm.value).subscribe({
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
                'Sub Department Added Successfully',
                'success'
              )
              this.subDepartmentForm.reset();
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
    this.updateSubDepartment()
  }
     
    }
  
getAlldepartment()
{
  this.api.getAllDepartment().subscribe({
    next:(res)=>{
      this.allDepartment=res;
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
    updateSubDepartment(){
      this.api.updateSubdepartment(this.editData._id,this.subDepartmentForm.value).subscribe({
        next:(res)=>{
          Swal.fire(
            'Good job!',
            'Sub Department Updated Successfully',
            'success'
          )
          this.subDepartmentForm.reset();
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