import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { ClientManagementService } from 'src/app/services/client-management.service';
import { ReportingService } from 'src/app/services/reporting.service';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit{
  orderForm!:FormGroup;
   Submit:any='Add Order'
     token:any;
     createdBy:any;
     errors:any; 
     date:any;
     allData:any;
     filterPrt:any=[];
     constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<AddOrderComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:ClientManagementService){}
   
     ngOnInit(): void {
      this.allData=this.editData.order
   this.token=localStorage.getItem('token');
   this.token=jwtDecode(this.token);
   this.createdBy=this.token.username;
     this.orderForm=this.formbuilder.group({
      clt_id:['',Validators.required],
      client_name:['',Validators.required],
      order_for:['',Validators.required],
      client_type:['',Validators.required],
      project:[],
      status:1,
       created_by:this.createdBy
     })

     if(this.editData.order){
this.getAllProject(this.editData.order._id)
            this.Submit="Add Order",
            this.orderForm.controls['clt_id'].setValue(this.editData.order._id);
            this.orderForm.controls['client_name'].setValue(this.editData.order.client_name);
            this.orderForm.controls['client_type'].setValue(this.editData.order.client_type);
            this.orderForm.controls['project'].setValue(this.filterPrt);

     }


   

    //  if(this.editData){
    //   this.Submit="Update Designation",
    //   this.orderForm.controls['head_department'].setValue(this.editData.head_department);
    //   this.orderForm.controls['designation'].setValue(this.editData.designation);
    //   }
     }

     getAllProject(id:any){
      this.api.getAllProject().subscribe({
        next:(res)=>{
         this.filterPrt= res.filter((x:any)=>{
            if(id==x.clt_id){
              this.filterPrt.push(x);
            }
          })
        },
        error:(err)=>{
          console.log(err)
        }
      })
     }


     addOrder(){
       if(!this.editData.edit){
         if(this.orderForm.value.client_name==''){
           console.log('Fill All the fields')
         }
         else{
           this.api.addOrder(this.orderForm.value).subscribe({
             next:(res)=>{
               Swal.fire(
                 'Good job!',
                 'Order Added Successfully',
                 'success'
               )
               this.orderForm.reset();
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
     this.updateOrder()
   }
      
     }
   
     updateOrder(){
       this.api.updateOrder(this.editData.order._id,this.orderForm.value).subscribe({
         next:(res)=>{
           Swal.fire(
             'Good job!',
             'Order Updated Successfully',
             'success'
           )
           this.orderForm.reset();
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