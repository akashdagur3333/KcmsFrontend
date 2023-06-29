import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { numbers } from '@material/dialog';
import jwtDecode from 'jwt-decode';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fine-waiver-model',
  templateUrl: './fine-waiver-model.component.html',
  styleUrls: ['./fine-waiver-model.component.css']
})
export class FineWaiverModelComponent implements OnInit{
  fineWaiverForm!:FormGroup;
  token:any;
  createdBy:any;
  total_vsr:any;
  detail:any;
  constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<FineWaiverModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:ReportingService){}
  
  ngOnInit(): void {
    this.token=localStorage.getItem('token');
  this.token=jwtDecode(this.token);
  this.createdBy=this.token.username;
  
  this.fineWaiverForm=this.formbuilder.group({
    rpt_id:['',Validators.required],
    name:['',Validators.required],
    father_name:['',Validators.required],
    amount:['',Validators.required],
    fine:['',Validators.required],
    fine_paid:['',Validators.required],
    fineWaiver:['',Validators.required],
    finePending:['',Validators.required],
    remarks:['',Validators.required],
    gst_amount:['',Validators.required],
    waived_by:['',Validators.required],
    pending_value:['',Validators.required],
    created_by:this.createdBy
  })
  
  if(this.editData.fineWaiver){

  this.detail=this.editData.fineWaiver.employee_name+' S/O '+this.editData.fineWaiver.father_name;
  this.total_vsr=this.editData.fineWaiver.pending_value;
  var imposed =this.editData.fineWaiver.fine;
  imposed=Number(imposed)
  var finePaid=this.editData.fineWaiver.paid_fine;
  finePaid=Number(finePaid);
  var fineWaived=this.editData.fineWaiver.fineWaiver; 
  fineWaived=Number(fineWaived)
const finePending=imposed-finePaid-fineWaived;
this.fineWaiverForm.controls['finePending'].setValue(finePending);
  this.fineWaiverForm.controls['rpt_id'].setValue('RPT'+this.editData.fineWaiver._id);
  this.fineWaiverForm.controls['pending_value'].setValue(this.total_vsr);
  this.fineWaiverForm.controls['name'].setValue(this.editData.fineWaiver.employee_name);
  this.fineWaiverForm.controls['father_name'].setValue(this.editData.fineWaiver.father_name);
  this.fineWaiverForm.controls['fine'].setValue(this.editData.fineWaiver.fine);
  this.fineWaiverForm.controls['fine_paid'].setValue(this.editData.fineWaiver.paid_fine);
  this.fineWaiverForm.controls['fineWaiver'].setValue(this.editData.fineWaiver.fineWaiver);
  this.fineWaiverForm.controls['fine_imposed'].setValue(this.editData.fineWaiver.fine_imposed);

} 
  }


  addFineWaiver(){
  var amount=Number(this.fineWaiverForm.value.amount);
  var pending=this.fineWaiverForm.value.pending_value;
  const total=pending-amount;
  this.fineWaiverForm.controls['pending_value'].setValue(total);

 const waiveFine= Number(this.editData.fineWaiver.fineWaiver);
 const cal=waiveFine+amount;
 this.fineWaiverForm.controls['fineWaiver'].setValue(cal);



  this.api.addFineWaiver(this.fineWaiverForm.value).subscribe({
    next:(res)=>{
      console.log('great fineWaiver added');
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

  this.api.updatePendingValue(this.editData.fineWaiver._id,this.fineWaiverForm.value).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'FineWaiver Added Successfully',
        'success'
      )
      this.fineWaiverForm.reset();
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
  this.fineWaiverForm.controls['gst_amount'].setValue(result);
  }
  
  
  }
  
