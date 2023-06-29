import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { ReportingService } from 'src/app/services/reporting.service';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-refund2-model',
  templateUrl: './refund2-model.component.html',
  styleUrls: ['./refund2-model.component.css']
})
export class Refund2ModelComponent implements OnInit{
  refundForm!:FormGroup;
  allDepartment:any;
 
  Submit='Add Relieving';
     token:any;
     createdBy:any;
     errors:any; 
     date:any;
     allData:any;
     failStatus:any;
     constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<Refund2ModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:ReportingService){}
   
     ngOnInit(): void {
      this.allData=this.editData
   this.token=localStorage.getItem('token');
   this.token=jwtDecode(this.token);
   this.createdBy=this.token.username;
     this.refundForm=this.formbuilder.group({
      rpt_id:['',Validators.required],
      name:['',Validators.required],
      father_name:['',Validators.required],
      emp_type:['',Validators.required],
      offer_letter_id:['',Validators.required],
      aadhar_number:['',Validators.required],
      sex:['',Validators.required],
      reporting_date:['',Validators.required],
      total_value:['',Validators.required],
      paid_value:['',Validators.required],
      pending_value:['',Validators.required],
      refund_value:['',Validators.required],
      state_reason:['',Validators.required],
      which_policy:['',Validators.required],
       created_by:this.createdBy
     })
   if(this.editData){
  this.allData=this.editData
  const value1=this.editData.total_value;
  const value2=this.editData.pending_value;
  const cal=value1-value2;
    this.refundForm.controls['name'].setValue(this.editData.employee_name);
    this.refundForm.controls['rpt_id'].setValue(this.editData._id);
    this.refundForm.controls['father_name'].setValue(this.editData.father_name);
    this.refundForm.controls['aadhar_number'].setValue(this.editData.aadhar_number);
    this.refundForm.controls['offer_letter_id'].setValue(this.editData.offer_letter_account);
    this.refundForm.controls['sex'].setValue(this.editData.gender);
    this.refundForm.controls['reporting_date'].setValue(this.editData.created_at);
    this.refundForm.controls['total_value'].setValue(this.editData.total_value);
    this.refundForm.controls['paid_value'].setValue(cal);
    this.refundForm.controls['pending_value'].setValue(this.editData.pending_value);
    this.refundForm.controls['emp_type'].setValue(this.editData.employee_type);

  }
  // else if(this.editData.edit){
  //   // const value=document.getElementById('SectionHide');
  //   const rpt_id=document.getElementById('rpt_id');
  //   // const emp_type=document.getElementById('emp_type')
  //   // const name=document.getElementById('name')
  //   // const father_name=document.getElementById('father_name')
  //   // const aadhar_number=document.getElementById('aadhar_number')
  //   // const training_start=document.getElementById('training_start')
  //   // const training_complete=document.getElementById('training_complete')
  //   // const joining_date=document.getElementById('joining_date')
  //   // const seperation_date=document.getElementById('seperation_date')
  //   // const left_hr_remarks=document.getElementById('left_hr_remarks')
  //   // const left_type=document.getElementById('left_type')
  //   // const rejoining=document.getElementById('rejoining')

  //   // rpt_id?.removeAttribute('value');
  //   // emp_type?.removeAttribute('value');
  //   // name?.removeAttribute('value');
  //   // father_name?.removeAttribute('value');
  //   // aadhar_number?.removeAttribute('value');
  //   // training_start?.removeAttribute('value');
  //   // training_complete?.removeAttribute('value');
  //   // joining_date?.removeAttribute('value');
  //   // seperation_date?.removeAttribute('value');
  //   // left_hr_remarks?.removeAttribute('value');
  //   // left_type?.removeAttribute('value');
  //   // rejoining?.removeAttribute('value');


  //   // value?.setAttribute('hidden','')
  //   //  this.Submit="Update Relieving",
  //   //  this.refundForm.controls['vsr_status'].setValue(this.editData.edit.vsr_status);
  //   //  this.refundForm.controls['final_hr_remarks'].setValue(this.editData.edit.final_hr_remarks);
  //    }
     }
     addRefund(){
      console.log(this.refundForm.value)
       if(!this.editData.edit){
         if(this.refundForm.value.refund_value=='' || this.refundForm.value.state_reason==''){
           console.log('Fill All the fields')
         }
         else{
           this.api.addRefund(this.refundForm.value).subscribe({
             next:(res)=>{
               // if(res.name=='ValidationError'){
               //   this.errors=res.errors    
               //   console.log(res)
               //   //  this.errors=res.errors;
               //   // this.errors.sort((x:any)=>{
               //   //   console.log(x.message);
               //   // })
               // }
               console.log(res)
               Swal.fire(
                 'Good job!',
                 'Refund Added Successfully',
                 'success'
               )
               this.refundForm.reset();
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
     this.updateRefund()
   }
      
     }
   
//  getAlldepartment()
//  {
//    this.api.getAllDepartment().subscribe({
//      next:(res)=>{
//        this.allDepartment=res;
//      },
//      error:(err)=>{
//        Swal.fire({
//          icon: 'error',
//          title: 'Oops...',
//          text: 'Something went wrong!',
//          footer: err
//        })
//      }
//    })
//  }
updateRefund(){
       this.api.updateRefund(this.editData.edit._id,this.refundForm.value).subscribe({
         next:(res)=>{
           Swal.fire(
             'Good job!',
             'Refund Updated Successfully',
             'success'
           )
           this.refundForm.reset();
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