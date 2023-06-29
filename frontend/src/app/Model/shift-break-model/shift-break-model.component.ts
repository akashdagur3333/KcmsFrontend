import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shift-break-model',
  templateUrl: './shift-break-model.component.html',
  styleUrls: ['./shift-break-model.component.css']
})
export class ShiftBreakModelComponent {
shiftBreakForm!:FormGroup;
Submit='Add Shift';
token:any;
createdBy:any;
errors:any; 
date:any;
constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<ShiftBreakModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:SettingService){}

ngOnInit(): void {
this.token=localStorage.getItem('token');
this.token=jwtDecode(this.token);
this.createdBy=this.token.username;


this.shiftBreakForm=this.formbuilder.group({
  shift_name:['',Validators.required],
  shift_start:['',Validators.required],
  shift_end:['',Validators.required],
  shift_description:['',Validators.required],
  break1:['',Validators.required],
  break1_duration:['',Validators.required],
  break2:['',Validators.required],
  break2_duration:['',Validators.required],
  break3:['',Validators.required],
  break3_duration:['',Validators.required],
  status:['',Validators.required],
  created_by:this.createdBy
})


if(this.editData){
this.Submit="Update Shift"
var status=this.editData.status
if(status=='Active'){
   status=1
}
else{
  status=0
}
this.shiftBreakForm.controls['shift_name'].setValue(this.editData.shift_name);
this.shiftBreakForm.controls['shift_start'].setValue(this.editData.shift_start);
this.shiftBreakForm.controls['shift_end'].setValue(this.editData.shift_end);
this.shiftBreakForm.controls['shift_description'].setValue(this.editData.shift_description);
this.shiftBreakForm.controls['break1'].setValue(this.editData.break1);
this.shiftBreakForm.controls['break1_duration'].setValue(this.editData.break1_duration);
this.shiftBreakForm.controls['break2'].setValue(this.editData.break2);
this.shiftBreakForm.controls['break2_duration'].setValue(this.editData.break2_duration);
this.shiftBreakForm.controls['break3'].setValue(this.editData.break3);
this.shiftBreakForm.controls['break3_duration'].setValue(this.editData.break3_duration);
this.shiftBreakForm.controls['status'].setValue(status);
}
}
addShiftBreak(){
  if(!this.editData){
    if(this.shiftBreakForm.value.shift_name=='' ||this.shiftBreakForm.value.shift_start=='' ||this.shiftBreakForm.value.shift_end==''){
      console.log('Fill All the fields')
    }
    else{
      this.api.addShift(this.shiftBreakForm.value).subscribe({
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
            'Shift Added Successfully',
            'success'
          )
          this.shiftBreakForm.reset();
          this.dialog.close("Add");
        },
        error:(err)=>{
          console.log(err)
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: 'Something went wrong!',
          //   footer: err
          // })
        }
       })
    }
  }
else{
this.updateShift()
}
 
}

updateShift(){
  this.api.updateShift(this.editData._id,this.shiftBreakForm.value).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'Shift Updated Successfully',
        'success'
      )
      this.shiftBreakForm.reset();
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


