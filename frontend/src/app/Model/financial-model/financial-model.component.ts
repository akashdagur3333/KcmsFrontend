import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-financial-model',
  templateUrl: './financial-model.component.html',
  styleUrls: ['./financial-model.component.css']
})
export class FinancialModelComponent {
  financialForm!:FormGroup;

    Submit='Add Financial';
    token:any;
    createdBy:any;
    errors:any; 
    date:any;
    constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<FinancialModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:SettingService){}
  
    ngOnInit(): void {
  this.token=localStorage.getItem('token');
  this.token=jwtDecode(this.token);
  this.createdBy=this.token.username;
  
    this.financialForm=this.formbuilder.group({
      year_financial:['',Validators.required],
      status:['',Validators.required],
      created_by:this.createdBy
    })
  
  
  if(this.editData){
    this.Submit="Update Financial",
    this.financialForm.controls['year_financial'].setValue(this.editData.year_financial);
    this.financialForm.controls['status'].setValue(this.editData.status);
    }
    }
    addFinancial(){
      if(!this.editData){
        if(this.financialForm.value.financial_year=='' ||this.financialForm.value.status==''){
          console.log('Fill All the fields')
        }
        else{
          this.api.addFinancial(this.financialForm.value).subscribe({
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
                'Financial Added Successfully',
                'success'
              )
              this.financialForm.reset();
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
    this.updateFinancial()
  }
     
    }
  
    updateFinancial(){
      this.api.updateFinancial(this.editData._id,this.financialForm.value).subscribe({
        next:(res)=>{
          Swal.fire(
            'Good job!',
            'Financial Updated Successfully',
            'success'
          )
          this.financialForm.reset();
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
  

