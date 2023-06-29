import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { DriveService } from 'src/app/services/drive.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-drive-model',
  templateUrl: './drive-model.component.html',
  styleUrls: ['./drive-model.component.css']
})
export class DriveModelComponent implements OnInit{
  driveForm!:FormGroup;
  Submit='Add Drive';
  token:any;
  createdBy:any;
  errors:any; 
  date:any;
  constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<DriveModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:DriveService){}

  ngOnInit(): void {
this.token=localStorage.getItem('token');
this.token=jwtDecode(this.token);
this.createdBy=this.token.username;
console.log(this.editData.college)
  this.driveForm=this.formbuilder.group({
    clg_id:'CLG'+this.editData.id1,
    clg_name:this.editData.college.college_name,
    college_city:this.editData.college.college_city,
    college_state:this.editData.college.college_state,
    college_pin_code:this.editData.college.college_pin_code,
    college_type:this.editData.college.college_type,
    drive_type:['',Validators.required],
    drive_date:['',Validators.required],
    team_lead:['',Validators.required],
    hr_name:['',Validators.required],
    technical_person:['',Validators.required],
    mode_of_travel:['',Validators.required],
    travel_type:['',Validators.required],
    created_by:this.createdBy
  })


if(this.editData.data){
  this.Submit="Update Drive",
  this.driveForm.controls['clg_id'].setValue('CLG'+this.editData.data._id);
  this.driveForm.controls['drive_type'].setValue(this.editData.data.drive_type);
  this.driveForm.controls['drive_date'].setValue(this.editData.data.drive_date);
  this.driveForm.controls['team_lead'].setValue(this.editData.data.team_lead);
  this.driveForm.controls['hr_name'].setValue(this.editData.data.hr_name);
  this.driveForm.controls['technical_person'].setValue(this.editData.data.technical_person);
  this.driveForm.controls['mode_of_travel'].setValue(this.editData.data.mode_of_travel);
  this.driveForm.controls['travel_type'].setValue(this.editData.data.travel_type);
  this.driveForm.controls['submit_by'].setValue(this.editData.data.submit_by);
  }

  

   
   
 
   
      // var start=8;
      // var end =20;
      // for(var i=start;i>=end;i++){
      //   if(i%2==0){
      //     // this.batch_size.push(i)
      //     console.log(i)
      //   }
      // }
    // console.log('hey')
   
  }
  addDrives(){
    if(!this.editData.data){
      if(this.driveForm.value.drive_type=='' ||this.driveForm.value.drive_date=='' ||this.driveForm.value.team_lead=='' ||this.driveForm.value.hr_name=='' ||this.driveForm.value.technical_person==''){
        console.log('Fill All the fields')
      }
      else{
        this.api.addDrives(this.driveForm.value).subscribe({
          next:(res)=>{
            if(res.name=='ValidationError'){
              this.errors=res.errors    
              console.log(res.errors)
              //  this.errors=res.errors;
              // this.errors.sort((x:any)=>{
              //   console.log(x.message);
              // })
            }
            Swal.fire(
              'Good job!',
              'Drive Added Successfully',
              'success'
            )
            this.driveForm.reset();
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
  this.updateColleges()
}
   
  }

  updateColleges(){
    console.log(this.editData.data._id,this.driveForm.value)
    this.api.updateDrives(this.editData.data._id,this.driveForm.value).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'Drive Updated Successfully',
          'success'
        )
        this.driveForm.reset();
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

  drive_type(){
   var data= this.driveForm.value.drive_type;
   var mode_of_travel=document.getElementById('mode_of_travel');
   var travel_type=document.getElementById('travel_type')
   if(data=='Virtual Placement'){
  mode_of_travel?.setAttribute('hidden','');
  travel_type?.setAttribute('hidden','');
   }
   else{
  mode_of_travel?.removeAttribute('hidden');
  travel_type?.removeAttribute('hidden');
   }
  }


}
