import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { ReportingService } from 'src/app/services/reporting.service';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-other-charge-model',
  templateUrl: './other-charge-model.component.html',
  styleUrls: ['./other-charge-model.component.css']
})
export class OtherChargeModelComponent implements OnInit{
  otherForm!:FormGroup;
  token:any;
  createdBy:any;
  total_vsr:any;
  detail:any;
  constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<OtherChargeModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:SettingService,private api2:ReportingService){}
  
  ngOnInit(): void {
    this.token=localStorage.getItem('token');
  this.token=jwtDecode(this.token);
  this.createdBy=this.token.username;
  
  this.otherForm=this.formbuilder.group({
    rpt_id:['',Validators.required],
    name:['',Validators.required],
    father_name:['',Validators.required],
    amount:['',Validators.required],
    other:['',Validators.required],
    imposed_by:['',Validators.required],
    remarks:['',Validators.required],
    gst_amount:['',Validators.required],
    pending_value:['',Validators.required],
    total_value:['',Validators.required],
    created_by:this.createdBy
  })
  
  if(this.editData.other){
    console.log(this.editData.other)
  this.detail=this.editData.other.employee_name+' S/O '+this.editData.other.father_name;
  this.total_vsr=this.editData.other.pending_value;
  this.otherForm.controls['rpt_id'].setValue('RPT'+this.editData.other._id);
  this.otherForm.controls['pending_value'].setValue(this.total_vsr);
  this.otherForm.controls['name'].setValue(this.editData.other.employee_name);
this.otherForm.controls['father_name'].setValue(this.editData.other.father_name);
  } 
  }
  
  gst_value(event: Event){
    var otheramount=(event.target as HTMLInputElement).value;
    var total =Number(otheramount)
    const result=this.api2.calGST(total);
    this.otherForm.controls['gst_amount'].setValue(result);

    }

  addOther(){
  var amount=this.otherForm.value.amount;
  var pending=this.otherForm.value.pending_value;
  const total=pending+amount;
  this.otherForm.controls['pending_value'].setValue(total);
  const total_value=this.editData.other.total_value;
  const add =total_value+amount;
  this.otherForm.controls['total_value'].setValue(add);
  var pre_other=this.editData.other.other;
  const cal=pre_other+amount;
  this.otherForm.controls['other'].setValue(cal);


  this.api2.addOther(this.otherForm.value).subscribe({
    next:(res)=>{
      console.log('great other added');
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

  this.api2.updatePendingValue(this.editData.other._id,this.otherForm.value).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'other Added Successfully',
        'success'
      )
      this.otherForm.reset();
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
  
  }
  
