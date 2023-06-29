import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-model',
  templateUrl: './user-model.component.html',
  styleUrls: ['./user-model.component.css']
})
export class UserModelComponent implements OnInit{
  UserForm!:FormGroup;
  UsersData:any;
  Submit='Add Admin';
  token:any;
submitted=false;
  constructor(private formbuilder:FormBuilder,private api:AuthService,private dialog:MatDialogRef<UserModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api1:ReportingService){}
  ngOnInit(): void {
    this.getAllEmployee();
this.token=localStorage.getItem('token');
this.token=jwtDecode(this.token);
var role=this.token.role;
    this.UserForm=this.formbuilder.group({
      user_name:['',Validators.required],
      // rpt_id:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      confirm_password:['',Validators.required],
      roles:['',Validators.required],
      role:role,
      phone_no:['',Validators.required]
    })
    if(this.editData){
      this.Submit='Update Admin';
      this.UserForm.controls['user_name'].setValue(this.editData.username);
      this.UserForm.controls['email'].setValue(this.editData.email);
      this.UserForm.controls['roles'].setValue(this.editData.role);
      this.UserForm.controls['phone_no'].setValue(this.editData.phone_no);
    }
  }
 
  // addData(event:Event,data:any) {
  //   const filterValue = (event.target as HTMLInputElement).value; 
  //   const username=document.getElementById('user_name');
  //   const email=document.getElementById('email');
  //   const password=document.getElementById('password');
  //   const roles=document.getElementById('roles');
  //   const confirm_password=document.getElementById('confirm_password');
  //   const phone_no=document.getElementById('phone_no');
 
  //   if(data=='username'){
  //     if(filterValue==''){
  //       username?.setAttribute('style','border-color:red')
  //     }
  //     else{
  //       username?.setAttribute('style','border-color:green')

  //     }
  //   }
  //   else if(data=='email'){
  //     if(filterValue==''){
  //       email?.setAttribute('style','border-color:red')
  //     }
  //     else{
  //       email?.setAttribute('style','border-color:green')
  //     }
  //   }
  //   else if(data=='password'){
  //     if(filterValue==''){
  //       password?.setAttribute('style','border-color:red')
  //     }
  //     else{
  //       password?.setAttribute('style','border-color:green')
  //     }
  //   }
  //   else if(data=='roles'){
  //     if(filterValue==''){
  //       roles?.setAttribute('style','border-color:red')
  //     }
  //     else{
  //       roles?.setAttribute('style','border-color:green')
  //     }
  //   }
  //   else if(data=='confirm_password'){
  //     if(filterValue==''){
  //       confirm_password?.setAttribute('style','border-color:red')
  //     }
  //     else{
  //       confirm_password?.setAttribute('style','border-color:green')
  //     }
  //   }
  //   else if(data=='phone_no'){
  //     if(filterValue==''){
  //       phone_no?.setAttribute('style','border-color:red')
  //     }
  //     else{
  //       phone_no?.setAttribute('style','border-color:green')
  //     }
  //   }
  //   // if(filterValue==''){
  //   //   password?.setAttribute('style','border-color:red')
  //   //   roles?.setAttribute('style','border-color:red')
  //   //   confirm_password?.setAttribute('style','border-color:red')
  //   //   phone_no?.setAttribute('style','border-color:red')

  //   // }
  //   // else{
  //   //   password?.setAttribute('style','border-color:green')
  //   //   roles?.setAttribute('style','border-color:green')
  //   //   confirm_password?.setAttribute('style','border-color:green')
  //   //   phone_no?.setAttribute('style','border-color:green')

  //   // }
  // }

  validate:any=[]
  data:any=[]
  addUser(){
if(!this.editData){
this.submitted=true
//  this.validate=Object.keys(this.UserForm.value)
//   this.validate.forEach((element:any) => {
//     this.data.push(element)
//     // if(this.UserForm.value+'.'+element==''){
//      })
//      console.log(this.data)
//      this.data.forEach((ele:any)=>{
//       console.log(this.UserForm.value+'.'+ele)
//      })
    // }
if(this.UserForm.value.user_name=='' || this.UserForm.value.email=='' || this.UserForm.value.password=='' || this.UserForm.value.roles=='' || this.UserForm.value.confirm_password=='' || this.UserForm.value.phone_no==''){
  console.log('fill the all field')
}
else{
  if(this.UserForm.value.password==this.UserForm.value.confirm_password){
    this.api.adduserData(this.UserForm.value).subscribe({
      next:(res)=>{
        if(res.message=='user already registered'){
          Swal.fire(
            'Good job!',
            'User Already registered',
            'success'
          )
        }
        else if(res.message=='You dont have permission'){
          Swal.fire(
            'Not Authorised!',
            'You are not Super Admin',
            'error'
          )
        }
        else{
          Swal.fire(
            'Good job!',
            'Admin Added Successfully',
            'success'
          );
    this.UserForm.reset()
    this.dialog.close("Add")
       }
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
  else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Confirm Password is not match!'
    })    
  } 
}
 
}
else{
  this.updateUser();
}
 
}
AllEmployee:any;
getAllEmployee(){
this.api1.getAllReporting().subscribe({
  next:(res)=>{
  this.AllEmployee=res.filter((x:any)=>{
    if(x.status==4){
      return x
    }
  })
  },error:(err)=>{
    console.log(err)
  }
})
}
updateUser(){
  if(!this.UserForm.value.password){
    this.api.updateUser(this.editData._id,this.UserForm.value).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'User Updated Successfully',
          'success'
        )
        this.dialog.close("Update")
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
  else{
    if(this.UserForm.value.password==this.UserForm.value.confirm_password){
      this.api.updateUser(this.editData._id,this.UserForm.value).subscribe({
        next:(res)=>{
          Swal.fire(
            'Good job!',
            'User & Password Updated Successfully',
            'success'
          )
          this.dialog.close("Update")
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
    else{
        Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Confirm Password is not match!'
    })   
    }
  }
  
}

}
