import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { ReportingService } from 'src/app/services/reporting.service';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-left-model',
  templateUrl: './add-left-model.component.html',
  styleUrls: ['./add-left-model.component.css']
})
export class AddLeftModelComponent implements OnInit{
  joinedForm!:FormGroup;
  allDepartment:any;
 
  Submit='Add Left';
     token:any;
     createdBy:any;
     errors:any; 
     date:any;
     data:any;
     batch_start:any;
     training_start:any;
     training_complete:any;
     joining_date:any;
     constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<AddLeftModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:ReportingService){}
   
     ngOnInit(): void {
   this.token=localStorage.getItem('token');
   this.token=jwtDecode(this.token);
   this.createdBy=this.token.username;
     this.joinedForm=this.formbuilder.group({
      message:'left',
      status:5,
      failStatus:['',Validators.required],
      batch_start:['',Validators.required],
      training_start:['',Validators.required],
      training_complete:['',Validators.required],
      joining_date:['',Validators.required],
      seperation_date:['',Validators.required],
      seperation_type:['',Validators.required],
      rejoining_possible:['',Validators.required],
      hr_remarks:['',Validators.required],
      created_by:this.createdBy
     })

     console.log(this.editData)

     if(this.editData.awaited){
      this.data=this.editData.awaited;
    this.getId();
   this.joinedForm.controls['failStatus'].setValue(1);

    // this.joinedForm.controls['batch_start'].setValue(this.data.inTraining[0].batch_start);
      // this.joinedForm.controls['training_start'].setValue(this.data.inTraining[0].training_start);
      // this.joinedForm.controls['training_complete'].setValue(this.data.completeTraining[0].training_complete);
      // this.joinedForm.controls['hr_remarks'].setValue(this.data.completeTraining[0].hr_remarks);
     }
     else if(this.editData.inpool){
      this.data=this.editData.inpool;
      this.getId();
     this.joinedForm.controls['failStatus'].setValue(2);
     }
     else if(this.editData.intraining){
      this.data=this.editData.intraining;
      this.joinedForm.controls['failStatus'].setValue(3);
 this.joinedForm.controls['batch_start'].setValue(this.data.inTraining[0].batch_start);
      this.joinedForm.controls['training_start'].setValue(this.data.inTraining[0].training_start);
     }
     else if(this.editData.trainingComplete){
      this.data=this.editData.trainingComplete;
      this.joinedForm.controls['failStatus'].setValue(4);
      this.joinedForm.controls['batch_start'].setValue(this.data.inTraining[0].batch_start);
      this.joinedForm.controls['training_start'].setValue(this.data.inTraining[0].training_start);
       this.joinedForm.controls['training_complete'].setValue(this.data.completeTraining[0].training_complete);
      this.joinedForm.controls['hr_remarks'].setValue(this.data.completeTraining[0].hr_remarks);
      const doj= document.getElementById('doj');
      const dateforma=moment(this.data.batch_starting_date).format('DD/MM/YYYY');
      doj?.setAttribute('value',dateforma);
     }
     else if(this.editData.Joined){
      this.data=this.editData.Joined;
      this.joinedForm.controls['failStatus'].setValue(5);
      this.joinedForm.controls['batch_start'].setValue(this.data.inTraining[0].batch_start);
      this.joinedForm.controls['training_start'].setValue(this.data.inTraining[0].training_start);
       this.joinedForm.controls['training_complete'].setValue(this.data.completeTraining[0].training_complete);
      this.joinedForm.controls['hr_remarks'].setValue(this.data.completeTraining[0].hr_remarks);
      const doj= document.getElementById('doj');
      const dateforma=moment(this.data.batch_starting_date).format('DD/MM/YYYY');
      doj?.setAttribute('value',dateforma);
     }
     }

     getId(){
      this.batch_start=document.getElementById('batch_start');
      this.training_start=document.getElementById('training_start');
      this.training_complete=document.getElementById('training_complete');
      this.joining_date=document.getElementById('joining_date');
      this.batch_start?.setAttribute('hidden','');
    this.training_start?.setAttribute('hidden','');
    this.training_complete?.setAttribute('hidden','');
    this.joining_date?.setAttribute('hidden','');
    this.joining_date?.removeAttribute('value');      
     }
     addIntraining(){
  this.api.updateJobStatus(this.data._id,this.joinedForm.value).subscribe({
         next:(res)=>{
           Swal.fire(
             'Good job!',
             'Left Successfully',
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


