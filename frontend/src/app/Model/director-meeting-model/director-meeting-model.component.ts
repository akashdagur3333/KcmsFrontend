import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { MeetingService } from 'src/app/services/meeting.service';
import { ReportingService } from 'src/app/services/reporting.service';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-director-meeting-model',
  templateUrl: './director-meeting-model.component.html',
  styleUrls: ['./director-meeting-model.component.css']
})
export class DirectorMeetingModelComponent implements OnInit{
  directorMeetingForm!:FormGroup;
  allDepartment:any;
 
  Submit='Add Director Meeting';
     token:any;
     createdBy:any;
     errors:any; 
     date:any;
     value:any;
     data:any=[];
     allLocation:any;
     allShift:any;
     constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<DirectorMeetingModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:SettingService,private api2:ReportingService,private api1:MeetingService){}
   
     ngOnInit(): void {
      this.getAllShift();
      this.getAllLocation();
       this.getAlldepartment()
       this.getAllReporting();
   this.token=localStorage.getItem('token');
   this.token=jwtDecode(this.token);
   this.createdBy=this.token.username;
   
     this.directorMeetingForm=this.formbuilder.group({
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
     this.Submit="Update Director Meeting",
     this.directorMeetingForm.controls['assign_to'].setValue(this.editData.assign_to);
     this.directorMeetingForm.controls['invite_to'].setValue(this.editData.invite_to);
     this.directorMeetingForm.controls['meeting_date'].setValue(this.editData.meeting_date);
     this.directorMeetingForm.controls['shift'].setValue(this.editData.shift);
     this.directorMeetingForm.controls['meeting_start'].setValue(this.editData.meeting_start);
     this.directorMeetingForm.controls['meeting_end'].setValue(this.editData.meeting_end);
     this.directorMeetingForm.controls['meeting_location'].setValue(this.editData.meeting_location);
     this.directorMeetingForm.controls['meeting_name'].setValue(this.editData.meeting_name);
     this.directorMeetingForm.controls['meeting_description'].setValue(this.editData.meeting_description);
     this.directorMeetingForm.controls['meeting_remarks'].setValue(this.editData.meeting_remarks);
     }
     }
     addHrMeeting(){
      console.log(this.directorMeetingForm.value)
       if(!this.editData){
         if(this.directorMeetingForm.value.assign_to=='' || this.directorMeetingForm.value.invite_to==''){
           console.log('Fill All the fields')
         }
         else{
           this.api1.addDirectorMeeting(this.directorMeetingForm.value).subscribe({
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
                 'Director Meeting Added Successfully',
                 'success'
               )
               this.directorMeetingForm.reset();
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
     this.updateDirectorMeeting()
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
 updateDirectorMeeting(){
       this.api1.updateDirectorMeeting(this.editData._id,this.directorMeetingForm.value).subscribe({
         next:(res)=>{
           Swal.fire(
             'Good job!',
             'Director Meeting Updated Successfully',
             'success'
           )
           this.directorMeetingForm.reset();
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
      const value=this.directorMeetingForm.value.assign_to;
      const data= this.data.filter((x:any)=>{
        if(x.designation==value){
       return x._id
        }
      })
      this.value=data;
    const d=  this.value.map((x:any)=>x._id)
      this.directorMeetingForm.controls['invite_to'].setValue(d);
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
