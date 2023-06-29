import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { ReportingComponent } from 'src/app/Pages/reporting/reporting.component';
import { ReportingService } from 'src/app/services/reporting.service';
import { SettingService } from 'src/app/services/setting.service';
import { TechnicalManagementService } from 'src/app/services/technical-management.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-assign-task-model',
  templateUrl: './add-assign-task-model.component.html',
  styleUrls: ['./add-assign-task-model.component.css']
})
export class AddAssignTaskModelComponent implements OnInit{
  AssignedTaskForm!:FormGroup;
   Submit:any='Add Project'
     token:any;
     createdBy:any;
     errors:any; 
     date:any;
     allData:any;
     teamLead:any=[];
     rpt_team_lead:any;
     AllSubDepartment:any;
     AllTeam:any=[];
     Dep:any;
     AllDep:any=[];
     constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<AddAssignTaskModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:TechnicalManagementService,private api1:ReportingService){}
   
     ngOnInit(): void {
      this.getAllTeam();
   this.token=localStorage.getItem('token');
   this.token=jwtDecode(this.token);
   this.createdBy=this.token.username;
     this.AssignedTaskForm=this.formbuilder.group({
      tsk_id:['',Validators.required],
      ast_id:['',Validators.required],
      clt_id:['',Validators.required],
      prt_id:['',Validators.required],
      project_name:['',Validators.required],
      client_name:['',Validators.required],
      assign_to_department:['',Validators.required],
      assign_by:['',Validators.required],
      rpt_team_lead:['',Validators.required],
      page_name:['',Validators.required],
      task_description:['',Validators.required],
      task_assign_to:['',Validators.required],
      task_expiry_date:['',Validators.required],
      remarks:['',Validators.required],
      status:1,
       created_by:this.createdBy
     })
     if(this.editData.add){
      this.allData=this.editData.add;
      const teamData=this.editData.add.team_lead.split(" ");
      const team_lead_name=teamData[1];
            this.Submit="Add Total Task";
            this.AssignedTaskForm.controls['tsk_id'].setValue(this.editData.add._id);
            this.AssignedTaskForm.controls['ast_id'].setValue(this.editData.add.ast_id);
            this.AssignedTaskForm.controls['clt_id'].setValue(this.editData.add.clt_id);
            this.AssignedTaskForm.controls['prt_id'].setValue(this.editData.add.prt_id);
            this.AssignedTaskForm.controls['project_name'].setValue(this.editData.add.project_name);
            this.AssignedTaskForm.controls['client_name'].setValue(this.editData.add.client_name);
            this.AssignedTaskForm.controls['page_name'].setValue(this.editData.add.page_name);
            this.AssignedTaskForm.controls['task_description'].setValue(this.editData.add.task_description);
            this.AssignedTaskForm.controls['assign_to_department'].setValue(this.editData.add.assign_to_department);
            this.AssignedTaskForm.controls['rpt_team_lead'].setValue(teamData[0]);
            this.AssignedTaskForm.controls['assign_by'].setValue(teamData[0]);
            this.getAllDepartment(this.AssignedTaskForm.value.rpt_team_lead);
            this.rpt_team_lead=this.AssignedTaskForm.value.rpt_team_lead;

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
      this.AssignedTaskForm.controls['page_name'].setValue(this.editData.edit.page_name);
      this.AssignedTaskForm.controls['task_description'].setValue(this.editData.edit.task_description);
      this.AssignedTaskForm.controls['remarks'].setValue(this.editData.edit.remarks);
     }

     }

     
     leadChange(){
      const id=this.AssignedTaskForm.value.assign_by;
      this.AssignedTaskForm.controls['rpt_team_lead'].setValue(id);
      this.rpt_team_lead=this.AssignedTaskForm.value.rpt_team_lead;
      this.getAllDepartment(id);
     }
     addAssignedTask(){
       if(!this.editData.edit){
         if(this.AssignedTaskForm.value.client_name=='' || this.AssignedTaskForm.value.project_name==''){
           console.log('Fill All the fields')
         }
         else{
           this.api.addAssignedtask(this.AssignedTaskForm.value).subscribe({
             next:(res)=>{
               Swal.fire(
                 'Good job!',
                 'Assigned Added Successfully',
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
   else{
     this.updateTotalTask()
   }  
     }


     updateTotalTask(){
       this.api.updateTotaltask(this.editData.edit._id,this.AssignedTaskForm.value).subscribe({
         next:(res)=>{
           Swal.fire(
             'Good job!',
             'Task Updated Successfully',
             'success'
           )
           this.AssignedTaskForm.reset();
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


     getAllTeam(){
      this.api.getAllTeam().subscribe({
        next:(res)=>{
      res.map((x:any)=>{
        if(x.team_lead[0].team_lead_department==this.AssignedTaskForm.value.assign_to_department){
          this.teamLead.push({name:x.team_lead[0].team_lead_name,rpt:x.team_lead[0].team_lead_rpt_id});
        }
      })
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

     getAllDepartment(id:any){
      this.AllDep=[]
      this.api1.getAllReporting().subscribe({
        next:(res)=>{
        res.filter((x:any)=>{
          if(x.subDepartment==this.AssignedTaskForm.value.assign_to_department && x.status==4 && x._id!=id){
            this.AllDep.push({name:x.employee_name,rpt_id:x._id})
          }
        })
        console.log(this.AllDep)
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
