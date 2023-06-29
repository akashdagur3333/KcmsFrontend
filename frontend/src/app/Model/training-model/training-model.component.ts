import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { BatchesService } from 'src/app/services/batches.service';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-training-model',
  templateUrl: './training-model.component.html',
  styleUrls: ['./training-model.component.css']
})
export class TrainingModelComponent {
  batchForm!:FormGroup;
  Submit='Add Batches';
  token:any;
  createdBy:any;
  errors:any;
  date:any;
  allSubdepartment:any;
  allBatchSize:any;
  allTrainer:any;
  constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<TrainingModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:BatchesService,private api1:SettingService){}

  ngOnInit(): void {
    this.getAllTrainer();
    this.getAllBatchSize();
    this.getAllSubdepartment()
this.token=localStorage.getItem('token');
this.token=jwtDecode(this.token);
this.createdBy=this.token.username;

    this.batchForm=this.formbuilder.group({
      batch_name:['',Validators.required],
      batch_location:['',Validators.required],
      batch_starting_date:['',Validators.required],
      batch_size:['',Validators.required],
      batch_type:['',Validators.required],
      batch_trainer:['',Validators.required],
      created_by:this.createdBy
    })

    if(this.editData){
      this.Submit="Update Batch",
      this.date=this.editData.batch_starting_date;
      this.date=moment(this.editData.batch_starting_date).utc().format('YYYY-MM-DD');
      this.batchForm.controls['batch_name'].setValue(this.editData.batch_name);
      this.batchForm.controls['batch_location'].setValue(this.editData.batch_location);
      this.batchForm.controls['batch_starting_date'].setValue(this.date);
      this.batchForm.controls['batch_size'].setValue(this.editData.batch_size);
      this.batchForm.controls['batch_type'].setValue(this.editData.batch_type);
      this.batchForm.controls['batch_trainer'].setValue(this.editData.batch_trainer);
      this.batchForm.controls['created_by'].setValue(this.createdBy);
    }
     
   
  }
  addBatch(){
    if(!this.editData){
      if(this.batchForm.value.batch_name=='' ||this.batchForm.value.batch_location=='' ||this.batchForm.value.batch_starting_date=='' ||this.batchForm.value.batch_size=='' ||this.batchForm.value.batch_type=='' || this.batchForm.value.batch_trainer==''){
        console.log('Fill All the fields')
      }
      else{
        this.api.addBatches(this.batchForm.value).subscribe({
          next:(res)=>{
            if(res.name=='ValidationError'){
              this.errors=res.errors    
              console.log(res.errors)
              //  this.errors=res.errors;
              // this.errors.sort((x:any)=>{
              //   console.log(x.message);
              // })
            }
            Swal.fire(
              'Good job!',
              'Batch Added Successfully',
              'success'
            )
            this.batchForm.reset();
            this.dialog.close("Add");
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
else{
  this.updateBatches()
}
   
  }

  updateBatches(){
    this.api.updateBatches(this.editData._id,this.batchForm.value).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'Batch Updated Successfully',
          'success'
        )
        this.batchForm.reset();
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

getAllSubdepartment(){
  this.api1.getAllSubdepartment().subscribe({
    next:(res)=>{
      this.allSubdepartment=res;
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

getAllBatchSize(){
  this.api1.getAllBatchSize().subscribe({
    next:(res)=>{
      this.allBatchSize=res;
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

getAllTrainer(){
  this.api1.getAllTrainer().subscribe({
    next:(res)=>{
      this.allTrainer=res;
    },
    error:(err)=>{
      console.log(err);
    }
  })
}


}
