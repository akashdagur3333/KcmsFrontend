import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { numbers } from '@material/dialog';
import jwtDecode from 'jwt-decode';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-other-waiver-model',
  templateUrl: './other-waiver-model.component.html',
  styleUrls: ['./other-waiver-model.component.css']
})
export class OtherWaiverModelComponent implements OnInit{
  otherWaiverForm!:FormGroup;
  token:any;
  createdBy:any;
  total_vsr:any;
  detail:any;
  constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<OtherWaiverModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:ReportingService){}
  
  ngOnInit(): void {
    this.token=localStorage.getItem('token');
  this.token=jwtDecode(this.token);
  this.createdBy=this.token.username;
  
  this.otherWaiverForm=this.formbuilder.group({
    rpt_id:['',Validators.required],
    name:['',Validators.required],
    father_name:['',Validators.required],
    amount:['',Validators.required],
    other:['',Validators.required],
    otherWaiver:['',Validators.required],
    otherPending:['',Validators.required],
    remarks:['',Validators.required],
    gst_amount:['',Validators.required],
    waived_by:['',Validators.required],
    pending_value:['',Validators.required],
    created_by:this.createdBy
  })
  
  if(this.editData.otherWaiver){
  this.detail=this.editData.otherWaiver.employee_name+' S/O '+this.editData.otherWaiver.father_name;
  this.total_vsr=this.editData.otherWaiver.pending_value;
  var imposed =this.editData.otherWaiver.other;
  imposed=Number(imposed)
  // var otherPaid=this.editData.otherWaiver.paid_fine;
  // finePaid=Number(finePaid);
  var otherWaived=this.editData.otherWaiver.otherWaiver; 
  otherWaived=Number(otherWaived)
const otherPending=imposed-otherWaived;
this.otherWaiverForm.controls['otherPending'].setValue(otherPending);
  this.otherWaiverForm.controls['rpt_id'].setValue('RPT'+this.editData.otherWaiver._id);
  this.otherWaiverForm.controls['pending_value'].setValue(this.total_vsr);
  this.otherWaiverForm.controls['name'].setValue(this.editData.otherWaiver.employee_name);
  this.otherWaiverForm.controls['father_name'].setValue(this.editData.otherWaiver.father_name);
  this.otherWaiverForm.controls['other'].setValue(this.editData.otherWaiver.other);
  this.otherWaiverForm.controls['other_paid'].setValue(this.editData.otherWaiver.other_paid);
  this.otherWaiverForm.controls['otherWaiver'].setValue(this.editData.otherWaiver.otherWaiver);
  this.otherWaiverForm.controls['other_imposed'].setValue(this.editData.otherWaiver.other_imposed);

} 
  }


  addOtherWaiver(){
  var amount=Number(this.otherWaiverForm.value.amount);
  var pending=this.otherWaiverForm.value.pending_value;
  const total=pending-amount;
  this.otherWaiverForm.controls['pending_value'].setValue(total);

 const waiveOther= Number(this.editData.otherWaiver.otherWaiver);
 const cal=waiveOther+amount;
 this.otherWaiverForm.controls['otherWaiver'].setValue(cal);



  this.api.addOtherWaiver(this.otherWaiverForm.value).subscribe({
    next:(res)=>{
      console.log('great otherWaiver added');
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

  this.api.updatePendingValue(this.editData.otherWaiver._id,this.otherWaiverForm.value).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'otherWaiver Added Successfully',
        'success'
      )
      this.otherWaiverForm.reset();
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
  var otheramount=(event.target as HTMLInputElement).value;
  var total =Number(otheramount)
  const result=this.api.calGST(total);
  this.otherWaiverForm.controls['gst_amount'].setValue(result);
  }
  
  
  }
  
