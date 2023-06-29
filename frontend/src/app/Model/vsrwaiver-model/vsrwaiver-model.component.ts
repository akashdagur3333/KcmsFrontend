import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vsrwaiver-model',
  templateUrl: './vsrwaiver-model.component.html',
  styleUrls: ['./vsrwaiver-model.component.css']
})
export class VSRWaiverModelComponent implements OnInit{
  vsrWaiverForm!:FormGroup;
  token:any;
  createdBy:any;
  total_vsr:any;
  detail:any;
  constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<VSRWaiverModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:ReportingService){}
  
  ngOnInit(): void {
    this.token=localStorage.getItem('token');
  this.token=jwtDecode(this.token);
  this.createdBy=this.token.username;
  
  this.vsrWaiverForm=this.formbuilder.group({
    rpt_id:['',Validators.required],
    name:['',Validators.required],
    father_name:['',Validators.required],
    amount:['',Validators.required],
    vsrWaiver:['',Validators.required],
    total_vsr:['',Validators.required],
    vsr_paid:['',Validators.required],
    vsr_waived:['',Validators.required],
    vsr_pending:['',Validators.required],
    remarks:['',Validators.required],
    gst_amount:['',Validators.required],
    waived_by:['',Validators.required],
    pending_value:['',Validators.required],
    created_by:this.createdBy
  })
  
  if(this.editData.VSR_waiver){
  this.detail=this.editData.VSR_waiver.employee_name+' S/O '+this.editData.VSR_waiver.father_name;
const total= this.editData.VSR_waiver.total_vsr;
  const paidvsr= this.editData.VSR_waiver.paid_vsr;
  const vsrWaiver=this.editData.VSR_waiver.vsrWaiver;
const cal=total-paidvsr-vsrWaiver;
this.vsrWaiverForm.controls['vsr_pending'].setValue(cal);
  this.vsrWaiverForm.controls['rpt_id'].setValue('RPT'+this.editData.VSR_waiver._id);
  this.vsrWaiverForm.controls['pending_value'].setValue(this.editData.VSR_waiver.pending_value);
  this.vsrWaiverForm.controls['name'].setValue(this.editData.VSR_waiver.employee_name);
  this.vsrWaiverForm.controls['father_name'].setValue(this.editData.VSR_waiver.father_name);
  this.vsrWaiverForm.controls['total_vsr'].setValue(this.editData.VSR_waiver.total_vsr);
  this.vsrWaiverForm.controls['vsr_paid'].setValue(this.editData.VSR_waiver.paid_vsr);
  this.vsrWaiverForm.controls['vsr_waived'].setValue(this.editData.VSR_waiver.vsrWaiver);


  } 
  }


  addVsrWaiver(){
  var amount=Number(this.vsrWaiverForm.value.amount);
  var pending=Number(this.vsrWaiverForm.value.pending_value);
  const total=pending-amount;
  this.vsrWaiverForm.controls['pending_value'].setValue(total);

  
 const waiveVsr= Number(this.editData.VSR_waiver.vsrWaiver);
 const cal=waiveVsr+amount;
 this.vsrWaiverForm.controls['vsrWaiver'].setValue(cal);

  this.api.addVSRWaiver(this.vsrWaiverForm.value).subscribe({
    next:(res)=>{
      console.log('great VSRwaiver added');
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

  this.api.updatePendingValue(this.editData.VSR_waiver._id,this.vsrWaiverForm.value).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'VSRwaiver Added Successfully',
        'success'
      )
      this.vsrWaiverForm.reset();
      this.dialog.close("Add");
    },
    error:(err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: err
      })  }
  })
}

gst_value(event: Event){
  var fineamount=(event.target as HTMLInputElement).value;
  var total =Number(fineamount)
  const result=this.api.calGST(total);
  this.vsrWaiverForm.controls['gst_amount'].setValue(result);
  }
  
  
  }
  

