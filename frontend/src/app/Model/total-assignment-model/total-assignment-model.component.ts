import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { SettingService } from 'src/app/services/setting.service';
import { TechnicalManagementService } from 'src/app/services/technical-management.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-total-assignment-model',
  templateUrl: './total-assignment-model.component.html',
  styleUrls: ['./total-assignment-model.component.css']
})
export class TotalAssignmentModelComponent implements OnInit{
  AssignmentForm!:FormGroup;
   Submit:any='Add Project'
     token:any;
     createdBy:any;
     errors:any; 
     date:any;
     allData:any;
     teamLead:any=[];
     AllSubDepartment:any;
     AllTeam:any=[];
     constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<TotalAssignmentModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:TechnicalManagementService,private api1:SettingService){}
     ngOnInit(): void {
      this.getAllSubDepartment();
    this.getAllTeam();
   this.token=localStorage.getItem('token');
   this.token=jwtDecode(this.token);
   this.createdBy=this.token.username;
     this.AssignmentForm=this.formbuilder.group({
      clt_id:['',Validators.required],
      prt_id:['',Validators.required],
      project_name:['',Validators.required],
      client_name:['',Validators.required],
      assign_to_department:['',Validators.required],
      team_lead:['',Validators.required],
      assignment_date:['',Validators.required],
      delivery_date:['',Validators.required],
      remarks:['',Validators.required],
       created_by:this.createdBy
     })
     if(this.editData.add){
      this.allData=this.editData.add
            this.Submit="Add Total Assignment";
            this.AssignmentForm.controls['clt_id'].setValue(this.editData.add.clt_id);
            this.AssignmentForm.controls['prt_id'].setValue(this.editData.add._id);
            this.AssignmentForm.controls['project_name'].setValue(this.editData.add.project_name);
            this.AssignmentForm.controls['client_name'].setValue(this.editData.add.client_name);
     }
     else if(this.editData.edit){
      this.loadTeamLead(this.editData.edit.assign_to_department)
      console.log(this.AllTeam)
      const value=document.getElementById('hidden');
      const value2=document.getElementById('hidden2');
      value?.setAttribute('hidden','')
      value2?.setAttribute('hidden','')
      this.allData=this.editData.edit
      this.Submit="Update Total Assignment";
      console.log(this.editData.edit.team_lead)
      this.AssignmentForm.controls['assign_to_department'].setValue(this.editData.edit.assign_to_department);
       this.AssignmentForm.controls['team_lead'].setValue(this.editData.edit.team_lead);
      this.AssignmentForm.controls['assignment_date'].setValue(this.editData.edit.assignment_date);
      this.AssignmentForm.controls['delivery_date'].setValue(this.editData.edit.delivery_date);
      this.AssignmentForm.controls['remarks'].setValue(this.editData.edit.remarks);
     }

     }
     addAssignment(){
       if(!this.editData.edit){
         if(this.AssignmentForm.value.client_name=='' || this.AssignmentForm.value.project_name==''){
           console.log('Fill All the fields')
         }
         else{
           this.api.addTotalAssignment(this.AssignmentForm.value).subscribe({
             next:(res)=>{
               console.log(res)
               Swal.fire(
                 'Good job!',
                 'Assignment Added Successfully',
                 'success'
               )
               this.AssignmentForm.reset();
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
     this.updateAssignment()
   }
     }
   
     updateAssignment(){
       this.api.updateTotalAssignment(this.editData.edit._id,this.AssignmentForm.value).subscribe({
         next:(res)=>{
           Swal.fire(
             'Good job!',
             'Assignment Updated Successfully',
             'success'
           )
           this.AssignmentForm.reset();
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

     getAllSubDepartment() {
      this.api1.getAllSubdepartment().subscribe({
        next: (res) => {
          this.AllSubDepartment = res;
        },
        error: (err) => {
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
        this.teamLead=res
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
    loadTeamLead(value:any){
      this.AllTeam=[]
    //  const value=this.AssignmentForm.value.assign_to_department;
       this.teamLead.find((x:any)=>{
         if(x.team_lead[0].team_lead_department==value){
           this.AllTeam.push({name:x.team_lead[0].team_lead_name,rpt_id:x.team_lead[0].team_lead_rpt_id});
         } 
        }
       )
        }

    onemore(){
      this.AllTeam=[]
     const value=this.AssignmentForm.value.assign_to_department;
    
       this.teamLead.find((x:any)=>{
         if(x.team_lead[0].team_lead_department==value){
           this.AllTeam.push({name:x.team_lead[0].team_lead_name,rpt_id:x.team_lead[0].team_lead_rpt_id});
         } 
          
       })
      //  this.teamLead.find((x:any)=>{
      //   console.log(x)
      //  })
    
    }
   }
