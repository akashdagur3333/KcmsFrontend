import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { ClientManagementService } from 'src/app/services/client-management.service';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-model',
  templateUrl: './client-model.component.html',
  styleUrls: ['./client-model.component.css']
})
export class ClientModelComponent implements OnInit{
  clientForm!:FormGroup;
  allDepartment:any;
 
  Submit='Add Client';
     token:any;
     createdBy:any;
     errors:any; 
     date:any;
     constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<ClientModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:ClientManagementService){}
   
     ngOnInit(): void {
   this.token=localStorage.getItem('token');
   this.token=jwtDecode(this.token);
   this.createdBy=this.token.username;
   
     this.clientForm=this.formbuilder.group({
      client_name:['',Validators.required],
      client_location:['',Validators.required],
      contact_person:['',Validators.required],
      contact_number:['',Validators.required],
      email_id:['',Validators.required],
      address:['',Validators.required],
      gst_number:['',Validators.required],
      project_poc:['',Validators.required],
      poc_contact:['',Validators.required],
      poc_email:['',Validators.required],
      billing_currency:['',Validators.required],
      client_type:['',Validators.required],
      project_refrence:['',Validators.required],
      status:1,
       created_by:this.createdBy
     })
   
   
   if(this.editData){
     this.Submit="Update Client",
     this.clientForm.controls['client_name'].setValue(this.editData.client_name);
     this.clientForm.controls['client_location'].setValue(this.editData.client_location);
     this.clientForm.controls['contact_person'].setValue(this.editData.contact_person);
     this.clientForm.controls['contact_number'].setValue(this.editData.contact_number);
     this.clientForm.controls['email_id'].setValue(this.editData.email_id);
     this.clientForm.controls['address'].setValue(this.editData.address);
     this.clientForm.controls['gst_number'].setValue(this.editData.gst_number);
     this.clientForm.controls['project_poc'].setValue(this.editData.project_poc);
     this.clientForm.controls['poc_contact'].setValue(this.editData.poc_contact);
     this.clientForm.controls['poc_email'].setValue(this.editData.poc_email);
     this.clientForm.controls['billing_currency'].setValue(this.editData.billing_currency);
     this.clientForm.controls['client_type'].setValue(this.editData.client_type);
     this.clientForm.controls['project_refrence'].setValue(this.editData.project_refrence);
    }
     }
     addClient(){
       if(!this.editData){
         if(this.clientForm.value.client_name=='' || this.clientForm.value.client_location==''){
           console.log('Fill All the fields')
         }
         else{
           this.api.addClient(this.clientForm.value).subscribe({
             next:(res)=>{
               console.log(res)
               Swal.fire(
                 'Good job!',
                 'Client Added Successfully',
                 'success'
               )
               this.clientForm.reset();
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
     this.updateClient()
   }
      
     }
   
     updateClient(){
       this.api.updateClient(this.editData._id,this.clientForm.value).subscribe({
         next:(res)=>{
           Swal.fire(
             'Good job!',
             'Client Updated Successfully',
             'success'
           )
           this.clientForm.reset();
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
