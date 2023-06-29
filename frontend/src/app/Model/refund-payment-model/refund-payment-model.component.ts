import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { ReportingService } from 'src/app/services/reporting.service';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-refund-payment-model',
  templateUrl: './refund-payment-model.component.html',
  styleUrls: ['./refund-payment-model.component.css']
})
export class RefundPaymentModelComponent implements OnInit{
  paymentForm!:FormGroup;
  allDepartment:any;
 
     token:any;
     createdBy:any;
     errors:any; 
     date:any;
     allData:any;
     failStatus:any;
     constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<RefundPaymentModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:ReportingService){}
   
     ngOnInit(): void {
      this.allData=this.editData.edit
   this.token=localStorage.getItem('token');
   this.token=jwtDecode(this.token);
   this.createdBy=this.token.username;
     this.paymentForm=this.formbuilder.group({
      rfd_id:['',Validators.required],
      rpt_id:['',Validators.required],
      name:['',Validators.required],
      payment_type:['',Validators.required],
      amount:['',Validators.required],
      payment_mode:['',Validators.required],
      bank_ledger:['',Validators.required],
      booking_year:['',Validators.required],
      payment_date:['',Validators.required],
      txn_id:['',Validators.required],
      director_remarks:['',Validators.required],
       created_by:this.createdBy
     })

  this.allData=this.editData

  this.paymentForm.controls['rfd_id'].setValue(this.editData._id);
  this.paymentForm.controls['rpt_id'].setValue(this.editData.rpt_id);
  this.paymentForm.controls['name'].setValue(this.editData.name);


     }
     addRefundPayment(){
           this.api.addRefundPayment(this.paymentForm.value).subscribe({
             next:(res)=>{
               console.log(res)
               Swal.fire(
                 'Good job!',
                 'Payment Added Successfully',
                 'success'
               )
               this.paymentForm.reset();
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
