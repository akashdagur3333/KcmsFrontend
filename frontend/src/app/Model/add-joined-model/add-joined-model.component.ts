import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { ReportingService } from 'src/app/services/reporting.service';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-joined-model',
  templateUrl: './add-joined-model.component.html',
  styleUrls: ['./add-joined-model.component.css']
})
export class AddJoinedModelComponent implements OnInit{
  joinedForm!:FormGroup;
  allDepartment:any;
 
  Submit='Add Joined';
     token:any;
     createdBy:any;
     errors:any; 
     date:any;
     data:any;
     constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<AddJoinedModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:ReportingService){}
   
     ngOnInit(): void {
      this.data=this.editData;
   this.token=localStorage.getItem('token');
   this.token=jwtDecode(this.token);
   this.createdBy=this.token.username;
     this.joinedForm=this.formbuilder.group({
      message:'joined',
      status:4,
      // failStatus,
      batch_start:['',Validators.required],
      training_start:['',Validators.required],
      training_complete:['',Validators.required],
      joining_date:['',Validators.required],
      hr_remarks:['',Validators.required],
      created_by:this.createdBy
     })

     this.joinedForm.controls['batch_start'].setValue(this.data.inTraining[0].batch_start);
     this.joinedForm.controls['training_start'].setValue(this.data.inTraining[0].training_start);
     this.joinedForm.controls['training_complete'].setValue(this.data.completeTraining[0].training_complete);
     this.joinedForm.controls['hr_remarks'].setValue(this.data.completeTraining[0].hr_remarks);

     }
     addIntraining(){
  this.api.updateJobStatus(this.data._id,this.joinedForm.value).subscribe({
         next:(res)=>{
           Swal.fire(
             'Good job!',
             'Joined Successfully',
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

