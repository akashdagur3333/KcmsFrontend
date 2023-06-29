import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vsr-value-model',
  templateUrl: './vsr-value-model.component.html',
  styleUrls: ['./vsr-value-model.component.css']
})
export class VsrValueModelComponent implements OnInit{
  vsrValueForm!:FormGroup;
   Submit='Add VSR Value';
  token:any;
  createdBy:any;
  errors:any; 
  date:any;
  constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<VsrValueModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:SettingService){}

  ngOnInit(): void {
this.token=localStorage.getItem('token');
this.token=jwtDecode(this.token);
this.createdBy=this.token.username;

  this.vsrValueForm=this.formbuilder.group({
    vsr_value:['',Validators.required],
    created_by:this.createdBy
  })


if(this.editData){
  this.Submit="Update VSR Value",
  this.vsrValueForm.controls['vsr_value'].setValue(this.editData.vsr_value);
  }
  }
  addVsr(){
    if(!this.editData){
      if(this.vsrValueForm.value.vsr_value==''){
        console.log('Fill All the fields')
      }
      else{
        this.api.addVsrvalue(this.vsrValueForm.value).subscribe({
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
              'VSR Value Added Successfully',
              'success'
            )
            this.vsrValueForm.reset();
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
  this.updateVsrValue()
}
   
  }

  updateVsrValue(){
    this.api.UpdateVsrValue(this.editData._id,this.vsrValueForm.value).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'VSR Value Updated Successfully',
          'success'
        )
        this.vsrValueForm.reset();
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