import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { ReportingService } from 'src/app/services/reporting.service';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-refund3-model',
  templateUrl: './refund3-model.component.html',
  styleUrls: ['./refund3-model.component.css']
})
export class Refund3ModelComponent implements OnInit{
  refundForm!:FormGroup;
  allDepartment:any;
 
     token:any;
     createdBy:any;
     errors:any; 
     date:any;
     allData:any;
     failStatus:any;
     constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<Refund3ModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:ReportingService){}
   
     ngOnInit(): void {
      this.allData=this.editData.edit
   this.token=localStorage.getItem('token');
   this.token=jwtDecode(this.token);
   this.createdBy=this.token.username;
     this.refundForm=this.formbuilder.group({
      director_consent:['',Validators.required],
      approx_date:['',Validators.required],
      remarks:['',Validators.required],
       created_by:this.createdBy
     })

  this.allData=this.editData.edit
     }
     addRefund(){
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