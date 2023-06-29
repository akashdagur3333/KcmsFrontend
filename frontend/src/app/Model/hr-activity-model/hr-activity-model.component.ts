import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { MeetingService } from 'src/app/services/meeting.service';
import { ReportingService } from 'src/app/services/reporting.service';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hr-activity-model',
  templateUrl: './hr-activity-model.component.html',
  styleUrls: ['./hr-activity-model.component.css']
})
export class HrActivityModelComponent implements OnInit{
  hrActivityForm!:FormGroup;
  allDepartment:any;
 
  Submit='Add HR Activity';
     token:any;
     createdBy:any;
     errors:any; 
     date:any;
     value:any;
     data:any=[];
     allLocation:any;
     allShift:any;
     constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<HrActivityModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:SettingService,private api2:ReportingService,private api1:MeetingService){}
   
     ngOnInit(): void {
      this.getAllShift();
      this.getAllLocation();
       this.getAlldepartment()
       this.getAllReporting();
   this.token=localStorage.getItem('token');
   this.token=jwtDecode(this.token);
   this.createdBy=this.token.username;
   
     this.hrActivityForm=this.formbuilder.group({
      assign_to:['',Validators.required],
      invite_to:['',Validators.required],
      assign_date:['',Validators.required],
      shift:['',Validators.required],
      activity_start:['',Validators.required],
      activity_end:['',Validators.required],
      activity_location:['',Validators.required],
      activity_name:['',Validators.required],
      activity_description:['',Validators.required],
      hr_remarks:['',Validators.required],
      created_by:this.createdBy
     })
   
   
   if(this.editData){
     this.Submit="Update HR Activity",
     this.hrActivityForm.controls['assign_to'].setValue(this.editData.assign_to);
     this.hrActivityForm.controls['invite_to'].setValue(this.editData.invite_to);
     this.hrActivityForm.controls['assign_date'].setValue(this.editData.assign_date);
     this.hrActivityForm.controls['shift'].setValue(this.editData.shift);
     this.hrActivityForm.controls['activity_start'].setValue(this.editData.activity_start);
     this.hrActivityForm.controls['activity_end'].setValue(this.editData.activity_end);
     this.hrActivityForm.controls['activity_location'].setValue(this.editData.activity_location);
     this.hrActivityForm.controls['activity_name'].setValue(this.editData.activity_name);
     this.hrActivityForm.controls['activity_description'].setValue(this.editData.activity_description);
     this.hrActivityForm.controls['hr_remarks'].setValue(this.editData.hr_remarks);
     }
     }
     addHrActivity(){
      console.log(this.hrActivityForm.value)
       if(!this.editData){
         if(this.hrActivityForm.value.assign_to=='' || this.hrActivityForm.value.invite_to==''){
           console.log('Fill All the fields')
         }
         else{
           this.api1.addHrActivity(this.hrActivityForm.value).subscribe({
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
                 'HR Activity Added Successfully',
                 'success'
               )
               this.hrActivityForm.reset();
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
     this.updateHrActivity()
   }
      
     }
   
 getAlldepartment()
 {
   this.api.getAllDesignation().subscribe({
     next:(res)=>{
       this.allDepartment=res;
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
 updateHrActivity(){
       this.api1.updateHrActivity(this.editData._id,this.hrActivityForm.value).subscribe({
         next:(res)=>{
           Swal.fire(
             'Good job!',
             'HR Activity Updated Successfully',
             'success'
           )
           this.hrActivityForm.reset();
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
     getrptId(){
      const value=this.hrActivityForm.value.assign_to;
      const data= this.data.filter((x:any)=>{
        if(x.designation==value){
       return x._id
        }
      })
      this.value=data;
    const d=  this.value.map((x:any)=>x._id)
      this.hrActivityForm.controls['invite_to'].setValue(d);
     }


     getAllReporting(){
      this.api2.getAllReporting().subscribe({
        next:(res)=>{
        this.data=res
        },
        error:(err)=>{
          console.log(err)
        }
      })
     }
     
     getAllLocation(){
      this.api.getAllLocation().subscribe({
        next:(res)=>{
        this.allLocation=res
        },
        error:(err)=>{
          console.log(err)
        }
      })
     }

     getAllShift(){
      this.api.getAllShift().subscribe({
        next:(res)=>{
        this.allShift=res
        },
        error:(err)=>{
          console.log(err)
        }
      })
     }
   }