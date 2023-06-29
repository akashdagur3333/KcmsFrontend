import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-batch-size-model',
  templateUrl: './batch-size-model.component.html',
  styleUrls: ['./batch-size-model.component.css']
})
export class BatchSizeModelComponent implements OnInit{
  batchSizeForm!:FormGroup;


  Submit='Add Batch Size';
  token:any;
  createdBy:any;
  errors:any; 
  date:any;
  constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<BatchSizeModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:SettingService){}

  ngOnInit(): void {
this.token=localStorage.getItem('token');
this.token=jwtDecode(this.token);
this.createdBy=this.token.username;

  this.batchSizeForm=this.formbuilder.group({
    batchSize:['',Validators.required],
    created_by:this.createdBy
  })


if(this.editData){
  this.Submit="Update Batch Size",
  this.batchSizeForm.controls['batchSize'].setValue(this.editData.batchSize);
  }
  }
  addBatchSize(){
    if(!this.editData){
      if(this.batchSizeForm.value.batchSize==''){
        console.log('Fill All the fields')
      }
      else{
        this.api.addBatchSize(this.batchSizeForm.value).subscribe({
          next:(res)=>{
            console.log(res)
            Swal.fire(
              'Good job!',
              'Batch Size Added Successfully',
              'success'
            )
            this.batchSizeForm.reset();
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
  this.updateBatchSize()
}
   
  }

  updateBatchSize(){
    this.api.updateBatchSize(this.editData._id,this.batchSizeForm.value).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'Batch Size Updated Successfully',
          'success'
        )
        this.batchSizeForm.reset();
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