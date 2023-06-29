import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { ClientManagementService } from 'src/app/services/client-management.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit{
  projectForm!:FormGroup;
   Submit:any='Add Project'
     token:any;
     createdBy:any;
     errors:any; 
     date:any;
     allData:any;
     constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<AddProjectComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:ClientManagementService){}
   
     ngOnInit(): void {
   this.token=localStorage.getItem('token');
   this.token=jwtDecode(this.token);
   this.createdBy=this.token.username;
     this.projectForm=this.formbuilder.group({
      clt_id:['',Validators.required],
      client_name:['',Validators.required],
      project_category:['',Validators.required],
      project_type:['',Validators.required],
      project_name:['',Validators.required],
      payment_type:['',Validators.required],
      due_date:['',Validators.required],
      project_description:['',Validators.required],
      project_cost:['',Validators.required],
      gst_slab:['',Validators.required],
      project_delivery_date:['',Validators.required],
      domain_details:['',Validators.required],
      hosting_details:['',Validators.required],
      status:1,
       created_by:this.createdBy
     })

     if(this.editData.project){
      this.allData=this.editData.project
            this.Submit="Add Project";
            this.projectForm.controls['clt_id'].setValue(this.editData.project._id);
            this.projectForm.controls['client_name'].setValue(this.editData.project.client_name);
     }
     else if(this.editData.edit){
      const value=document.getElementById('hidden');
      value?.setAttribute('hidden','')
      this.allData=this.editData.edit
      this.Submit="Update Project";
      this.projectForm.controls['project_category'].setValue(this.editData.edit.project_category);
      this.projectForm.controls['client_name'].setValue(this.editData.edit.client_name);
      this.projectForm.controls['project_type'].setValue(this.editData.edit.project_type);
      this.projectForm.controls['project_name'].setValue(this.editData.edit.project_name);
      this.projectForm.controls['payment_type'].setValue(this.editData.edit.payment_type);
      this.projectForm.controls['due_date'].setValue(this.editData.edit.due_date);
      this.projectForm.controls['project_description'].setValue(this.editData.edit.project_description);
      this.projectForm.controls['project_cost'].setValue(this.editData.edit.project_cost);
      this.projectForm.controls['gst_slab'].setValue(this.editData.edit.gst_slab);
      this.projectForm.controls['project_delivery_date'].setValue(this.editData.edit.project_delivery_date);
      this.projectForm.controls['domain_details'].setValue(this.editData.edit.domain_details);
      this.projectForm.controls['hosting_details'].setValue(this.editData.edit.hosting_details);

     }

    //  if(this.editData){
    //   this.Submit="Update Designation",
    //   this.projectForm.controls['head_department'].setValue(this.editData.head_department);
    //   this.projectForm.controls['designation'].setValue(this.editData.designation);
    //   }
     }
     addProject(){
       if(!this.editData.edit){
         if(this.projectForm.value.client_name=='' || this.projectForm.value.project_name==''){
           console.log('Fill All the fields')
         }
         else{
           this.api.addProject(this.projectForm.value).subscribe({
             next:(res)=>{
               console.log(res)
               Swal.fire(
                 'Good job!',
                 'Project Added Successfully',
                 'success'
               )
               this.projectForm.reset();
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
     this.updateProject()
   }
      
     }
   
     updateProject(){
       this.api.updateProject(this.editData.edit._id,this.projectForm.value).subscribe({
         next:(res)=>{
           Swal.fire(
             'Good job!',
             'Project Updated Successfully',
             'success'
           )
           this.projectForm.reset();
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