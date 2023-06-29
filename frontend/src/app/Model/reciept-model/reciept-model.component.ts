import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { ReportingService } from 'src/app/services/reporting.service';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reciept-model',
  templateUrl: './reciept-model.component.html',
  styleUrls: ['./reciept-model.component.css']
})
export class RecieptModelComponent implements OnInit{
recieptForm!:FormGroup;
token:any;
createdBy:any;
total_vsr:any;
AllFinancial:any;
AllLocation:any;
detail:any;
constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<RecieptModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:SettingService,private api2:ReportingService){}

ngOnInit(): void {
  this.getAllFinancial();
  this.getAllLocation();
  this.token=localStorage.getItem('token');
this.token=jwtDecode(this.token);
this.createdBy=this.token.username;

this.recieptForm=this.formbuilder.group({
  rpt_id:['',Validators.required],
  reciept_serial:['',Validators.required],
  ol_serial:['',Validators.required],
  name:['',Validators.required],
  father_name:['',Validators.required],
  financial_year:['',Validators.required],
  ledger:['',Validators.required],
  type:['',Validators.required],
  paid_vsr:['',Validators.required],
  paid_fine:['',Validators.required],
  amount:['',Validators.required],
  txn_id:['',Validators.required],
  submited_at:['',Validators.required],
  gst_amount:['',Validators.required],
  pending_value:['',Validators.required],
  created_by:this.createdBy
})

if(this.editData.reciept){  
this.detail=this.editData.reciept.employee_name+' S/O '+this.editData.reciept.father_name;
  console.log(this.editData.reciept)

this.total_vsr=this.editData.reciept.pending_value
this.recieptForm.controls['rpt_id'].setValue('RPT'+this.editData.reciept._id);
this.recieptForm.controls['pending_value'].setValue(this.total_vsr);
this.recieptForm.controls['name'].setValue(this.editData.reciept.employee_name);
this.recieptForm.controls['father_name'].setValue(this.editData.reciept.father_name);

} 
}

gst_value(event: Event){
var Recieptamount=(event.target as HTMLInputElement).value;
var total =Number(Recieptamount)
// const cal=(total/118)*100;
// this.roundUp(total-cal,1);
const result=this.api2.calGST(total);
this.recieptForm.controls['gst_amount'].setValue(result);
}



addReciept(){
var amount=this.recieptForm.value.amount;
var pending=this.recieptForm.value.pending_value;
const total=this.api2.Total(pending,amount);
this.recieptForm.controls['pending_value'].setValue(total);





if(this.recieptForm.value.type=='fine'){
  var fine=this.editData.reciept.paid_fine;
  const total2=amount+fine;
  this.recieptForm.controls['paid_fine'].setValue(total2);
  if(this.editData.reciept.paid_vsr==0){
    this.recieptForm.controls['paid_vsr'].setValue(0);
  }
  else{
    this.recieptForm.controls['paid_vsr'].setValue(this.editData.reciept.paid_vsr);
  }

}
else{
  console.log('vsr')
  console.log(this.recieptForm.value);
  var paidvsr= this.editData.reciept.paid_vsr;
  const total1=amount+paidvsr;
  this.recieptForm.controls['paid_vsr'].setValue(total1);
  if(this.editData.reciept.paid_fine==0){
    this.recieptForm.controls['paid_fine'].setValue(0);
  }
  else{
    console.log(this.recieptForm.value.paid_fine);
    this.recieptForm.controls['paid_fine'].setValue(this.editData.reciept.paid_fine);
  }

}

this.api2.addReciept(this.recieptForm.value).subscribe({
  next:(res)=>{
    console.log('great reciept added');
  },
  error:(err)=>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: err
    })  }
})

this.api2.updatePendingValue(this.editData.reciept._id,this.recieptForm.value).subscribe({
  next:(res)=>{
    Swal.fire(
      'Good job!',
      'Reciept Added Successfully',
      'success'
    )
    this.recieptForm.reset();
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

getAllFinancial(){
  this.api.getAllFinancial().subscribe({
    next:(res)=>{
     this.AllFinancial=res
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

getAllLocation(){
  this.api.getAllLocation().subscribe({
    next:(res)=>{
     this.AllLocation=res;
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
function roundUp(arg0: number) {
  throw new Error('Function not implemented.');
}

