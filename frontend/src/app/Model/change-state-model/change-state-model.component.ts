import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { ClientManagementService } from 'src/app/services/client-management.service';
import { TechnicalManagementService } from 'src/app/services/technical-management.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-change-state-model',
  templateUrl: './change-state-model.component.html',
  styleUrls: ['./change-state-model.component.css']
})
export class ChangeStateModelComponent implements OnInit{
  AssignedTaskForm!:FormGroup;
   Submit:any='Add Project'
     token:any;
     createdBy:any;
     errors:any; 
     date:any;
     allData:any;
     Status:any;
     constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<ChangeStateModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:TechnicalManagementService){}
   id:any;
    ngOnInit(): void {
      
   this.token=localStorage.getItem('token');
   this.token=jwtDecode(this.token);
   this.createdBy=this.token.username;
     this.AssignedTaskForm=this.formbuilder.group({
      task_expiry_date:['',Validators.required],
      remarkStatus:['',Validators.required],
      status:['',Validators.required],
       created_by:this.createdBy
     })


     if(this.editData.add){
      this.allData=this.editData.add
      this.id=this.editData.add._id
      const StatusVal=this.editData.Status;
      if(StatusVal==1){
        this.Status='Assigned'
      }
      else if(StatusVal==2){
        this.Status='Performing'
        var per=document.getElementById('perf')
        per?.setAttribute('hidden','')
       }
      else if(StatusVal==3){
        this.Status='Re-Assign'
       }
       else if(StatusVal==4){
        this.Status='Applied For Check'
       }
       else if(StatusVal==5){
        this.Status='Completed'
       }
       else if(StatusVal==6){
        this.Status='Failed'
       }
         this.AssignedTaskForm.controls['task_expiry_date'].setValue(this.editData.add.task_expiry_date);
         this.AssignedTaskForm.controls['status'].setValue(StatusVal);
     }

     else if(this.editData.edit){
      var hidden=document.getElementById('hidden1');
      var status=document.getElementById('status');
      hidden?.setAttribute('hidden','');
      status?.removeAttribute('hidden')
      this.allData=this.editData.edit;
      this.id=this.editData.edit._id
      console.log(this.editData.edit.status)
      this.AssignedTaskForm.controls['task_expiry_date'].setValue(this.editData.edit.task_expiry_date);
      this.AssignedTaskForm.controls['remarkStatus'].setValue(this.editData.edit.remark_completed);
      this.AssignedTaskForm.controls['status'].setValue(5);
     }
     else if(this.editData.FailedEdit){
      var hidden=document.getElementById('hidden1');
      var status=document.getElementById('status');
      hidden?.setAttribute('hidden','');
      status?.removeAttribute('hidden')
      this.allData=this.editData.FailedEdit;
      this.id=this.editData.FailedEdit._id
      this.AssignedTaskForm.controls['task_expiry_date'].setValue(this.editData.FailedEdit.task_expiry_date);
      this.AssignedTaskForm.controls['remarkStatus'].setValue(this.editData.FailedEdit.remark_failed);
      this.AssignedTaskForm.controls['status'].setValue(6);
     }
     else if(this.editData.editAssign){
      var hidden=document.getElementById('hidden1');
      var status=document.getElementById('status');
      hidden?.setAttribute('hidden','');
      status?.removeAttribute('hidden')
      this.allData=this.editData.editAssign;
      this.id=this.editData.editAssign._id
      this.AssignedTaskForm.controls['task_expiry_date'].setValue(this.editData.editAssign.task_expiry_date);
      this.AssignedTaskForm.controls['remarkStatus'].setValue(this.editData.editAssign.remark_failed);
       var val;
       console.log(this.editData.editAssign.status)
       if(this.editData.editAssign.status=='Assigned'){
       val=1
       }
      else if(this.editData.editAssign.status=='Performing'){
        val=2
        }
        else if(this.editData.editAssign.status=='Re-Assigned'){
          val=3
          }
          else if(this.editData.editAssign.status=='Applied For Check'){
            val=4
            }
      

      this.AssignedTaskForm.controls['status'].setValue(val);
     }
    //  if(this.editData){
    //   this.Submit="Update Designation",
    //   this.AssignedTaskForm.controls['head_department'].setValue(this.editData.head_department);
    //   this.AssignedTaskForm.controls['designation'].setValue(this.editData.designation);
    //   }
     }

   
     updateStatus(){
       this.api.updateAssignedtask(this.id,this.AssignedTaskForm.value).subscribe({
         next:(res)=>{
           Swal.fire(
             'Good job!',
             'Task Status Updated Successfully',
             'success'
           )
           this.AssignedTaskForm.reset();
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