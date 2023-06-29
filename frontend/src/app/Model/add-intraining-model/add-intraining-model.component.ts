import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { ReportingService } from 'src/app/services/reporting.service';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-intraining-model',
  templateUrl: './add-intraining-model.component.html',
  styleUrls: ['./add-intraining-model.component.css']
})
export class AddIntrainingModelComponent implements OnInit{
  inTrainingForm!:FormGroup;
  allDepartment:any;
 
  Submit='Add In-Training';
     token:any;
     createdBy:any;
     errors:any; 
     date:any;
     data:any;
     constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<AddIntrainingModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:ReportingService){}
   
     ngOnInit(): void {
      this.data=this.editData;
   this.token=localStorage.getItem('token');
   this.token=jwtDecode(this.token);
   this.createdBy=this.token.username;
   
     this.inTrainingForm=this.formbuilder.group({
      message:'inTraining',
      status:2,
      batch_start:['',Validators.required],
      training_start:['',Validators.required],
      address:['',Validators.required],
      pan_card:['',Validators.required],
      name:['',Validators.required],
      contact_number:['',Validators.required],
      relation:['',Validators.required],
      bank_name:['',Validators.required],
      ac_name:['',Validators.required],
      ac_number:['',Validators.required],
      ac_type:['',Validators.required],
      ifsc_code:['',Validators.required],
      micr_code:['',Validators.required],
      esic_number:['',Validators.required],
      epfo_number:['',Validators.required],
      uan_number:['',Validators.required],
      hr_remarks:['',Validators.required],
      document_name:['',Validators.required],
      file:['',Validators.required],
      file_name:['',Validators.required],
      file_status:['',Validators.required],
      deadline:['',Validators.required],
      doc_hr_remarks:['',Validators.required],
      created_by:this.createdBy
     })
   
     }
     addIntraining(){
  this.api.updateJobStatus(this.data._id,this.inTrainingForm.value).subscribe({
         next:(res)=>{
           Swal.fire(
             'Good job!',
             'In Training Updated Successfully',
             'success'
           )
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