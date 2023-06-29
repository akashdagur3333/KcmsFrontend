import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ledgers-model',
  templateUrl: './ledgers-model.component.html',
  styleUrls: ['./ledgers-model.component.css']
})
export class LedgersModelComponent implements OnInit{
ledgerForm!:FormGroup;  
 Submit='Add Ledger';
token:any;
createdBy:any;
errors:any; 
date:any;
constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<LedgersModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:SettingService){}

ngOnInit(): void {
this.token=localStorage.getItem('token');
this.token=jwtDecode(this.token);
this.createdBy=this.token.username;

this.ledgerForm=this.formbuilder.group({
  ledger_name:['',Validators.required],
  created_by:this.createdBy
})


if(this.editData){
this.Submit="Update Ledger",
this.ledgerForm.controls['ledger_name'].setValue(this.editData.ledger_name);
}
}
addLedger(){
  if(!this.editData){
    if(this.ledgerForm.value.ledger_name==''){
      console.log('Fill All the fields')
    }
    else{
      this.api.addLedger(this.ledgerForm.value).subscribe({
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
            'Ledger Added Successfully',
            'success'
          )
          this.ledgerForm.reset();
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
this.updateLedger()
}
 
}

updateLedger(){
  this.api.updateLedger(this.editData._id,this.ledgerForm.value).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'Ledger Updated Successfully',
        'success'
      )
      this.ledgerForm.reset();
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
