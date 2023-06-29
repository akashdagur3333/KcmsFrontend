import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-designation-model',
  templateUrl: './designation-model.component.html',
  styleUrls: ['./designation-model.component.css']
})
export class DesignationModelComponent implements OnInit{
 designationForm!:FormGroup;
 allDepartment:any;

 Submit='Add Designation';
    token:any;
    createdBy:any;
    errors:any; 
    date:any;
    constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<DesignationModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:SettingService){}
  
    ngOnInit(): void {
      this.getAlldepartment()
  this.token=localStorage.getItem('token');
  this.token=jwtDecode(this.token);
  this.createdBy=this.token.username;
  
    this.designationForm=this.formbuilder.group({
      head_department:['',Validators.required],
      designation:['',Validators.required],
      created_by:this.createdBy
    })
  
  
  if(this.editData){
    this.Submit="Update Designation",
    this.designationForm.controls['head_department'].setValue(this.editData.head_department);
    this.designationForm.controls['designation'].setValue(this.editData.designation);
    }
    }
    addDesignation(){
      if(!this.editData){
        if(this.designationForm.value.head_department=='' || this.designationForm.value.designation==''){
          console.log('Fill All the fields')
        }
        else{
          this.api.addDesignation(this.designationForm.value).subscribe({
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
                'Designation Added Successfully',
                'success'
              )
              this.designationForm.reset();
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
    this.updateDesignation()
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
updateDesignation(){
      this.api.updateDesignation(this.editData._id,this.designationForm.value).subscribe({
        next:(res)=>{
          Swal.fire(
            'Good job!',
            'Designation Updated Successfully',
            'success'
          )
          this.designationForm.reset();
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