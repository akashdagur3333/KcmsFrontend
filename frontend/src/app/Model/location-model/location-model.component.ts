import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-location-model',
  templateUrl: './location-model.component.html',
  styleUrls: ['./location-model.component.css']
})
export class LocationModelComponent implements OnInit{
  locationForm!:FormGroup;

  Submit='Add Location';
  token:any;
  createdBy:any;
  errors:any; 
  date:any;
  constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<LocationModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:SettingService){}

  ngOnInit(): void {
this.token=localStorage.getItem('token');
this.token=jwtDecode(this.token);
this.createdBy=this.token.username;


  this.locationForm=this.formbuilder.group({
    office_code:['',Validators.required],
    location:['',Validators.required],
    address:['',Validators.required],
    created_by:this.createdBy
  })


if(this.editData){
  this.Submit="Update Location",
  this.locationForm.controls['office_code'].setValue(this.editData.office_code);
  this.locationForm.controls['location'].setValue(this.editData.location);
  this.locationForm.controls['address'].setValue(this.editData.address);
  }
  }
  addLocations(){
    console.log(this.locationForm.value)
    if(!this.editData){
      if(this.locationForm.value.office_code=='' ||this.locationForm.value.location=='' ||this.locationForm.value.address==''){
        console.log('Fill All the fields')
      }
      else{
        this.api.addLocation(this.locationForm.value).subscribe({
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
              'Location Added Successfully',
              'success'
            )
            this.locationForm.reset();
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
  this.updateLocations()
}
   
  }

  updateLocations(){
    this.api.updateLocation(this.editData._id,this.locationForm.value).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'Location Updated Successfully',
          'success'
        )
        this.locationForm.reset();
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
