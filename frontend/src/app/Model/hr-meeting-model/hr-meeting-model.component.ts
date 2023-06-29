import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { MeetingService } from 'src/app/services/meeting.service';
import { ReportingService } from 'src/app/services/reporting.service';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hr-meeting-model',
  templateUrl: './hr-meeting-model.component.html',
  styleUrls: ['./hr-meeting-model.component.css']
})
export class HrMeetingModelComponent implements OnInit{
  hrMeetingForm!:FormGroup;
  allDepartment:any;
 
  Submit='Add HR Meeting';
     token:any;
     createdBy:any;
     errors:any; 
     date:any;
     value:any;
     data:any=[];
     allLocation:any;
     allShift:any;
     constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<HrMeetingModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:SettingService,private api2:ReportingService,private api1:MeetingService){}
   
     ngOnInit(): void {
      this.getAllShift();
      this.getAllLocation();
       this.getAlldepartment()
       this.getAllReporting();
   this.token=localStorage.getItem('token');
   this.token=jwtDecode(this.token);
   this.createdBy=this.token.username;
   
     this.hrMeetingForm=this.formbuilder.group({
      assign_to:['',Validators.required],
      invite_to:['',Validators.required],
      meeting_date:['',Validators.required],
      shift:['',Validators.required],
      meeting_start:['',Validators.required],
      meeting_end:['',Validators.required],
      meeting_location:['',Validators.required],
      meeting_name:['',Validators.required],
      meeting_description:['',Validators.required],
      meeting_remarks:['',Validators.required],
      created_by:this.createdBy
     })
   
   
   if(this.editData){
     this.Submit="Update HR Meeting",
     this.hrMeetingForm.controls['assign_to'].setValue(this.editData.assign_to);
     this.hrMeetingForm.controls['invite_to'].setValue(this.editData.invite_to);
     this.hrMeetingForm.controls['meeting_date'].setValue(this.editData.meeting_date);
     this.hrMeetingForm.controls['shift'].setValue(this.editData.shift);
     this.hrMeetingForm.controls['meeting_start'].setValue(this.editData.meeting_start);
     this.hrMeetingForm.controls['meeting_end'].setValue(this.editData.meeting_end);
     this.hrMeetingForm.controls['meeting_location'].setValue(this.editData.meeting_location);
     this.hrMeetingForm.controls['meeting_name'].setValue(this.editData.meeting_name);
     this.hrMeetingForm.controls['meeting_description'].setValue(this.editData.meeting_description);
     this.hrMeetingForm.controls['meeting_remarks'].setValue(this.editData.meeting_remarks);
     }
     }
     addHrMeeting(){
      console.log(this.hrMeetingForm.value)
       if(!this.editData){
         if(this.hrMeetingForm.value.assign_to=='' || this.hrMeetingForm.value.invite_to==''){
           console.log('Fill All the fields')
         }
         else{
           this.api1.addHrMeeting(this.hrMeetingForm.value).subscribe({
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
                 'HR Meeting Added Successfully',
                 'success'
               )
               this.hrMeetingForm.reset();
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
     this.updateHrMeeting()
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
 updateHrMeeting(){
       this.api1.updateHrMeeting(this.editData._id,this.hrMeetingForm.value).subscribe({
         next:(res)=>{
           Swal.fire(
             'Good job!',
             'HR Meeting Updated Successfully',
             'success'
           )
           this.hrMeetingForm.reset();
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
      const value=this.hrMeetingForm.value.assign_to;
      const data= this.data.filter((x:any)=>{
        if(x.designation==value){
       return x._id
        }
      })
      this.value=data;
    const d=  this.value.map((x:any)=>x._id)
      this.hrMeetingForm.controls['invite_to'].setValue(d);
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