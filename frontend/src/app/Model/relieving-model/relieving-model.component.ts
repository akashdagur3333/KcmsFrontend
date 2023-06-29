import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-relieving-model',
  templateUrl: './relieving-model.component.html',
  styleUrls: ['./relieving-model.component.css']
})
export class RelievingModelComponent implements OnInit{
  relievingForm!:FormGroup;
  allDepartment:any;
 
  Submit='Add Relieving';
     token:any;
     createdBy:any;
     errors:any; 
     date:any;
     allData:any;
     failStatus:any;
     constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<RelievingModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:SettingService){}
   
     ngOnInit(): void {
   this.token=localStorage.getItem('token');
   this.token=jwtDecode(this.token);
   this.createdBy=this.token.username;
     this.relievingForm=this.formbuilder.group({
      name:['',Validators.required],
      father_name:['',Validators.required],
      rpt_id:['',Validators.required],
      aadhar_number:['',Validators.required],
      training_start:['',Validators.required],
      training_completed:['',Validators.required],
      doj:['',Validators.required],
      seperation_date:['',Validators.required],
      emp_type:['',Validators.required],
      left_hr_remarks:['',Validators.required],
      rejoining:['',Validators.required],
      left_type:['',Validators.required],
      vsr_status:['',Validators.required],
      final_hr_remarks:['',Validators.required],
       created_by:this.createdBy
     })
   if(this.editData.add){
    if(this.editData.add.left[0].failStatus==1){
      this.failStatus='Awaited'
    }
    else if(this.editData.add.left[0].failStatus==2){
      this.failStatus='In Pool'
    }
    else if(this.editData.add.left[0].failStatus==3){
      this.failStatus='In Training'
    }
    else if(this.editData.add.left[0].failStatus==4){
      this.failStatus='Training Complete'
    }
    else if(this.editData.add.left[0].failStatus==5){
      this.failStatus='Joined'
    }

  this.allData=this.editData.add
    this.relievingForm.controls['name'].setValue(this.editData.add.employee_name);
    this.relievingForm.controls['rpt_id'].setValue(this.editData.add._id);
    this.relievingForm.controls['father_name'].setValue(this.editData.add.father_name);
    this.relievingForm.controls['aadhar_number'].setValue(this.editData.add.aadhar_number);
    this.relievingForm.controls['training_start'].setValue(this.editData.add.inTraining[0].training_start);
    this.relievingForm.controls['training_completed'].setValue(this.editData.add.left[0].training_complete);
    this.relievingForm.controls['doj'].setValue(this.editData.add.batch_starting_date);
    this.relievingForm.controls['seperation_date'].setValue(this.editData.add.left[0].seperation_date);
    this.relievingForm.controls['emp_type'].setValue(this.editData.add.employee_type);
    this.relievingForm.controls['left_hr_remarks'].setValue(this.editData.add.left[0].hr_remarks);
    this.relievingForm.controls['rejoining'].setValue(this.editData.add.left[0].rejoining_possible);
    this.relievingForm.controls['left_type'].setValue(this.editData.add.left[0].failStatus);
  }
  else if(this.editData.edit){
    const value=document.getElementById('SectionHide');
    const rpt_id=document.getElementById('rpt_id')
    const emp_type=document.getElementById('emp_type')
    const name=document.getElementById('name')
    const father_name=document.getElementById('father_name')
    const aadhar_number=document.getElementById('aadhar_number')
    const training_start=document.getElementById('training_start')
    const training_complete=document.getElementById('training_complete')
    const joining_date=document.getElementById('joining_date')
    const seperation_date=document.getElementById('seperation_date')
    const left_hr_remarks=document.getElementById('left_hr_remarks')
    const left_type=document.getElementById('left_type')
    const rejoining=document.getElementById('rejoining')
console.log(rpt_id?.getAttribute('value'))
    rpt_id?.removeAttribute('value');
    emp_type?.removeAttribute('value');
    name?.removeAttribute('value');
    father_name?.removeAttribute('value');
    aadhar_number?.removeAttribute('value');
    training_start?.removeAttribute('value');
    training_complete?.removeAttribute('value');
    joining_date?.removeAttribute('value');
    seperation_date?.removeAttribute('value');
    left_hr_remarks?.removeAttribute('value');
    left_type?.removeAttribute('value');
    rejoining?.removeAttribute('value');


    value?.setAttribute('hidden','')
     this.Submit="Update Relieving",
     this.relievingForm.controls['vsr_status'].setValue(this.editData.edit.vsr_status);
     this.relievingForm.controls['final_hr_remarks'].setValue(this.editData.edit.final_hr_remarks);
     }
     }
     addRelieving(){
       if(!this.editData.edit){
         if(this.relievingForm.value.vsr_status=='' || this.relievingForm.value.final_hr_remarks==''){
           console.log('Fill All the fields')
         }
         else{
           this.api.addRelieving(this.relievingForm.value).subscribe({
             next:(res)=>{
               // if(res.name=='ValidationError'){
               //   this.errors=res.errors    
               //   console.log(res)
               //   //  this.errors=res.errors;
               //   // this.errors.sort((x:any)=>{
               //   //   console.log(x.message);
               //   // })
               // }
               Swal.fire(
                 'Good job!',
                 'Relieving Added Successfully',
                 'success'
               )
               this.relievingForm.reset();
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
     this.updateRelieving()
   }
      
     }
   
//  getAlldepartment()
//  {
//    this.api.getAllDepartment().subscribe({
//      next:(res)=>{
//        this.allDepartment=res;
//      },
//      error:(err)=>{
//        Swal.fire({
//          icon: 'error',
//          title: 'Oops...',
//          text: 'Something went wrong!',
//          footer: err
//        })
//      }
//    })
//  }
 updateRelieving(){
       this.api.updateRelieving(this.editData.edit._id,this.relievingForm.value).subscribe({
         next:(res)=>{
           Swal.fire(
             'Good job!',
             'Relieving Updated Successfully',
             'success'
           )
           this.relievingForm.reset();
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