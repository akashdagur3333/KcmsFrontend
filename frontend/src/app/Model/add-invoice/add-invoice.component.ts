import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { ClientManagementService } from 'src/app/services/client-management.service';
import { QuesrionService } from 'src/app/services/quesrion.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit{
  InvoiceForm!:FormGroup;
  res:any;
  x:any
  token:any;
  createdBy:any;
  question:any=[];

    ngOnInit(): void {
        this.getAllQuestion();
        this.token=localStorage.getItem('token');
        this.token=jwtDecode(this.token);
        this.createdBy=this.token.username;
        this.InvoiceForm=this.formbuilder.group({
          invoice:[],
          created_by:this.createdBy
        })
        // localStorage.removeItem('addQuestion');
    }
    constructor(private api:ClientManagementService,private dialog1:MatDialogRef<AddInvoiceComponent>,private formbuilder:FormBuilder){}
    getAllQuestion(){
      this.api.getAllOrder().subscribe({
        next:(res)=>{
              this.res=res;
              this.InvoiceForm.controls['invoice'].setValue(this.res);

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
  
    
  
        // dialog(){
        //   this.dialog1.close("question");
        // }
        // addquestion(data:{},id:any){
        //   if(this.question==''){
        //     this.question.push(data)
        //     localStorage.setItem('addQuestion',JSON.stringify(this.question));
        //   }
        //   else{
        //    this.question.find((x:any)=>{
        //       if(x._id==id){
        //       alert('already exist')
        //       }
        //       else{
        //         this.question.push(data)
        //         localStorage.setItem('addQuestion',JSON.stringify(this.question));
        //       }
        //         });
        //   // if(!this.x){
        //   //       this.question.push(data)
        //   //       console.log(this.question)
        //   //       }
        //   }
        //    console.log(this.question)
      
  
        // }
        addInvoice(){
          console.log(this.InvoiceForm.value)
          this.api.addInvoice(this.InvoiceForm.value).subscribe({
            next:(res)=>{
              Swal.fire(
                'Good job!',
                'Invoice Added Successfully',
                'success'
              )            },
            error:(err)=>{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: err
              })            }
          })

        }
      }
       
  //         this.question.findIndex((x:any)=>{
  //                 if(x._id==id){
  // console.log(x)
  //                 }
              
  //                   });      }
      
        // console.log(this.question)
        // }
  
    