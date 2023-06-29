import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-trainers-model',
  templateUrl: './trainers-model.component.html',
  styleUrls: ['./trainers-model.component.css']
})
export class TrainersModelComponent implements OnInit{
  trainerForm!:FormGroup;


  Submit='Add Trainer';
  token:any;
  createdBy:any;
  constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<TrainersModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:SettingService){}

  ngOnInit(): void {
this.token=localStorage.getItem('token');
this.token=jwtDecode(this.token);
this.createdBy=this.token.username;

  this.trainerForm=this.formbuilder.group({
    name:['',Validators.required],
    created_by:this.createdBy
  })


if(this.editData){
  this.Submit="Update Trainer",
  this.trainerForm.controls['name'].setValue(this.editData.name);
  }
  }
  addTrainer(){
    if(!this.editData){
      if(this.trainerForm.value.name==''){
        console.log('Fill All the fields')
      }
      else{
        this.api.addTrainer(this.trainerForm.value).subscribe({
          next:(res)=>{
            console.log(res)
            Swal.fire(
              'Good job!',
              'Trainer Added Successfully',
              'success'
            )
            this.trainerForm.reset();
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
  this.updateTrainer()
}
   
  }

  updateTrainer(){
    this.api.updateTrainer(this.editData._id,this.trainerForm.value).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'Trainer Updated Successfully',
          'success'
        )
        this.trainerForm.reset();
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