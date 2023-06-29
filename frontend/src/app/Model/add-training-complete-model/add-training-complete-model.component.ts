import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { ReportingService } from 'src/app/services/reporting.service';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-training-complete-model',
  templateUrl: './add-training-complete-model.component.html',
  styleUrls: ['./add-training-complete-model.component.css']
})
export class AddTrainingCompleteModelComponent implements OnInit{
  trainingCompleteForm!:FormGroup;
  allDepartment:any;
 
  Submit='Add Complete Training';
     token:any;
     createdBy:any;
     errors:any; 
     date:any;
     data:any;
     constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<AddTrainingCompleteModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:ReportingService){}
   
     ngOnInit(): void {
      this.data=this.editData;
   this.token=localStorage.getItem('token');
   this.token=jwtDecode(this.token);
   this.createdBy=this.token.username;
     this.trainingCompleteForm=this.formbuilder.group({
      message:'trainingComplete',
      status:3,
      // failStatus,
      batch_start:['',Validators.required],
      training_start:['',Validators.required],
      training_complete:['',Validators.required],
      hr_remarks:['',Validators.required],
      created_by:this.createdBy
     })

     console.log(this.data.inTraining[0].batch_start)
     this.trainingCompleteForm.controls['batch_start'].setValue(this.data.inTraining[0].batch_start);
     this.trainingCompleteForm.controls['training_start'].setValue(this.data.inTraining[0].training_start);

     }
     addIntraining(){
  this.api.updateJobStatus(this.data._id,this.trainingCompleteForm.value).subscribe({
         next:(res)=>{
           Swal.fire(
             'Good job!',
             'Training Completed Updated Successfully',
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
