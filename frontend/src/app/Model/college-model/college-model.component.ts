import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { CollegesService } from 'src/app/services/colleges.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-college-model',
  templateUrl: './college-model.component.html',
  styleUrls: ['./college-model.component.css']
})
export class CollegeModelComponent {
  collegeForm!:FormGroup;
  Submit='Add Colleges';
  token:any;
  createdBy:any;
  errors:any; 
  date:any;
  constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<CollegeModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:CollegesService){}

  ngOnInit(): void {
this.token=localStorage.getItem('token');
this.token=jwtDecode(this.token);
this.createdBy=this.token.username;

    this.collegeForm=this.formbuilder.group({
      college_name:['',Validators.required],
      college_city:['',Validators.required],
      college_state:['',Validators.required],
      college_pin_code:['',Validators.required],
      college_type:['',Validators.required],
      tnp_head_name:['',Validators.required],
      tnp_head_contact:['',Validators.required],
      tnp_head_email:['',Validators.required],
      created_by:this.createdBy
    })

    if(this.editData){
      this.Submit="Update College",
      this.date=this.editData.batch_starting_date;
      this.date=moment(this.editData.batch_starting_date).utc().format('YYYY-MM-DD');
      this.collegeForm.controls['college_name'].setValue(this.editData.college_name);
      this.collegeForm.controls['college_city'].setValue(this.editData.college_city);
      this.collegeForm.controls['college_state'].setValue(this.editData.college_state);
      this.collegeForm.controls['college_pin_code'].setValue(this.editData.college_pin_code);
      this.collegeForm.controls['college_type'].setValue(this.editData.college_type);
      this.collegeForm.controls['tnp_head_name'].setValue(this.editData.tnp_head_name);
      this.collegeForm.controls['tnp_head_contact'].setValue(this.editData.tnp_head_contact);
      this.collegeForm.controls['tnp_head_email'].setValue(this.editData.tnp_head_email);
      this.collegeForm.controls['created_by'].setValue(this.createdBy);
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
  addColleges(){
    if(!this.editData){
      if(this.collegeForm.value.college_name=='' ||this.collegeForm.value.college_city=='' ||this.collegeForm.value.college_state=='' ||this.collegeForm.value.college_pin_code=='' ||this.collegeForm.value.college_type==''){
        console.log('Fill All the fields')
      }
      else{
        this.api.addColleges(this.collegeForm.value).subscribe({
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
              'College Added Successfully',
              'success'
            )
            this.collegeForm.reset();
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
  this.addPanel()
}
   
  }

  updateColleges(){
    this.api.updateColleges(this.editData._id,this.collegeForm.value).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'College Updated Successfully',
          'success'
        )
        this.collegeForm.reset();
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

  addPanel(){
 if(this.collegeForm.value.tnp_head_email=='' || this.collegeForm.value.tnp_head_contact=='' || this.collegeForm.value.tnp_head_name==''){
 this.updateColleges();

 }
  else{
this.updateStatus()
  }
 }

 updateStatus(){
  this.api.updateStatus(this.editData._id,this.collegeForm.value).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'College Add To Panel Successfully',
        'success'
      )
      this.collegeForm.reset();
      this.dialog.close("Panel");
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


