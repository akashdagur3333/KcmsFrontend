import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { ReportingService } from 'src/app/services/reporting.service';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fine-model',
  templateUrl: './fine-model.component.html',
  styleUrls: ['./fine-model.component.css']
})
export class FineModelComponent implements OnInit{
  fineForm!:FormGroup;
  token:any;
  createdBy:any;
  total_vsr:any;
  detail:any;
  constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<FineModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:SettingService,private api2:ReportingService){}
  
  ngOnInit(): void {
    this.token=localStorage.getItem('token');
  this.token=jwtDecode(this.token);
  this.createdBy=this.token.username;
  
  this.fineForm=this.formbuilder.group({
    rpt_id:['',Validators.required],
    name:['',Validators.required],
    father_name:['',Validators.required],
    amount:['',Validators.required],
    fine:['',Validators.required],
    imposed_by:['',Validators.required],
    remarks:['',Validators.required],
    gst_amount:['',Validators.required],
    pending_value:['',Validators.required],
    total_value:['',Validators.required],
    created_by:this.createdBy
  })
  
  if(this.editData.fine){
  this.detail=this.editData.fine.employee_name+' S/O '+this.editData.fine.father_name;
  this.total_vsr=this.editData.fine.pending_value;
  this.fineForm.controls['rpt_id'].setValue('RPT'+this.editData.fine._id);
  this.fineForm.controls['pending_value'].setValue(this.total_vsr);
  this.fineForm.controls['name'].setValue(this.editData.fine.employee_name);
this.fineForm.controls['father_name'].setValue(this.editData.fine.father_name);
  } 
  }
  
  gst_value(event: Event){
    var fineamount=(event.target as HTMLInputElement).value;
    var total =Number(fineamount)
    const result=this.api2.calGST(total);
    this.fineForm.controls['gst_amount'].setValue(result);

    }

  addFine(){
  var amount=this.fineForm.value.amount;
  var pending=this.fineForm.value.pending_value;
  const total=pending+amount;
  this.fineForm.controls['pending_value'].setValue(total);
  const total_value=this.editData.fine.total_value;
  const add =total_value+amount;
  this.fineForm.controls['total_value'].setValue(add);
  var pre_fine=this.editData.fine.fine;
  const cal=pre_fine+amount;
  this.fineForm.controls['fine'].setValue(cal);


  this.api2.addFine(this.fineForm.value).subscribe({
    next:(res)=>{
      console.log('great fine added');
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

  this.api2.updatePendingValue(this.editData.fine._id,this.fineForm.value).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'Fine Added Successfully',
        'success'
      )
      this.fineForm.reset();
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
  
