import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stream-model',
  templateUrl: './stream-model.component.html',
  styleUrls: ['./stream-model.component.css']
})
export class StreamModelComponent {
streamForm!:FormGroup; 
Submit='Add Stream';
token:any;
createdBy:any;
errors:any; 
date:any;
Allqualification:any;
constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<StreamModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:SettingService){}

ngOnInit(): void {
  this.AllQualification()
this.token=localStorage.getItem('token');
this.token=jwtDecode(this.token);
this.createdBy=this.token.username;

this.streamForm=this.formbuilder.group({
  qualification_name:['',Validators.required],
  stream:['',Validators.required],
  created_by:this.createdBy
})


if(this.editData){
this.Submit="Update Stream",
this.streamForm.controls['qualification_name'].setValue(this.editData.qualification_name);
this.streamForm.controls['stream'].setValue(this.editData.stream);
}
}
addStream(){
  if(!this.editData){
    if(this.streamForm.value.qualification_name=='' || this.streamForm.value.stream==''){
      console.log('Fill All the fields')
    }
    else{
      this.api.addStream(this.streamForm.value).subscribe({
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
            'Stream Added Successfully',
            'success'
          )
          this.streamForm.reset();
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
this.updateStream()
}
 
}

AllQualification()
{
this.api.getAllQualification().subscribe({
next:(res)=>{
  this.Allqualification=res;
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
updateStream(){
  this.api.updateStream(this.editData._id,this.streamForm.value).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'Stream Updated Successfully',
        'success'
      )
      this.streamForm.reset();
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