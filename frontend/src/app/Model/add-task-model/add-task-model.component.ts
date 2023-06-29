import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { SettingService } from 'src/app/services/setting.service';
import { TechnicalManagementService } from 'src/app/services/technical-management.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-task-model',
  templateUrl: './add-task-model.component.html',
  styleUrls: ['./add-task-model.component.css']
})
export class AddTaskModelComponent implements OnInit{
  TotalTaskForm!:FormGroup;
   Submit:any='Add Project'
     token:any;
     createdBy:any;
     errors:any; 
     date:any;
     allData:any;
     teamLead:any=[];
     AllSubDepartment:any;
     AllTeam:any=[];
     constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<AddTaskModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:TechnicalManagementService,private api1:SettingService){}
   
     ngOnInit(): void {
   this.token=localStorage.getItem('token');
   this.token=jwtDecode(this.token);
   this.createdBy=this.token.username;
     this.TotalTaskForm=this.formbuilder.group({
      ast_id:['',Validators.required],
      clt_id:['',Validators.required],
      prt_id:['',Validators.required],
      project_name:['',Validators.required],
      client_name:['',Validators.required],
      assign_to_department:['',Validators.required],
      team_lead:['',Validators.required],
      page_name:['',Validators.required],
      task_description:['',Validators.required],
      remarks:['',Validators.required],
      status:1,
       created_by:this.createdBy
     })
     if(this.editData.add){
      this.allData=this.editData.add
            this.Submit="Add Total Task";
            this.TotalTaskForm.controls['ast_id'].setValue(this.editData.add._id);
            this.TotalTaskForm.controls['clt_id'].setValue(this.editData.add.clt_id);
            this.TotalTaskForm.controls['prt_id'].setValue(this.editData.add.prt_id);
            this.TotalTaskForm.controls['project_name'].setValue(this.editData.add.project_name);
            this.TotalTaskForm.controls['client_name'].setValue(this.editData.add.client_name);
            this.TotalTaskForm.controls['assign_to_department'].setValue(this.editData.add.assign_to_department);
            this.TotalTaskForm.controls['team_lead'].setValue(this.editData.add.team_lead);
     }
     else if(this.editData.edit){
      const value=document.getElementById('hidden');
      const value2=document.getElementById('hidden2');
      const value3=document.getElementById('hidden3');

      value?.setAttribute('hidden','')
      value2?.setAttribute('hidden','')
      value3?.setAttribute('hidden','')

      this.allData=this.editData.edit
      this.Submit="Update Total Task";
      this.TotalTaskForm.controls['page_name'].setValue(this.editData.edit.page_name);
      this.TotalTaskForm.controls['task_description'].setValue(this.editData.edit.task_description);
      this.TotalTaskForm.controls['remarks'].setValue(this.editData.edit.remarks);
     }

     }
     addTotalTask(){
       if(!this.editData.edit){
         if(this.TotalTaskForm.value.client_name=='' || this.TotalTaskForm.value.project_name==''){
           console.log('Fill All the fields')
         }
         else{
           this.api.addTotaltask(this.TotalTaskForm.value).subscribe({
             next:(res)=>{
               Swal.fire(
                 'Good job!',
                 'Task Added Successfully',
                 'success'
               )
               this.TotalTaskForm.reset();
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
     this.updateTotalTask()
   }
      
     }
   
     updateTotalTask(){
       this.api.updateTotaltask(this.editData.edit._id,this.TotalTaskForm.value).subscribe({
         next:(res)=>{
           Swal.fire(
             'Good job!',
             'Task Updated Successfully',
             'success'
           )
           this.TotalTaskForm.reset();
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
