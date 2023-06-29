import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';
import { ReportingService } from 'src/app/services/reporting.service';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-normal-user-model',
  templateUrl: './add-normal-user-model.component.html',
  styleUrls: ['./add-normal-user-model.component.css']
})
export class AddNormalUserModelComponent implements OnInit{
  UserForm!:FormGroup;
  UsersData:any;
  Submit='Add User';
  token:any;
submitted=false;
  constructor(private formbuilder:FormBuilder,private api:AuthService,private dialog:MatDialogRef<AddNormalUserModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api1:ReportingService,private api2:SettingService){}
  ngOnInit(): void {
    this.getAllEmployee();
    this.AllDepartment();
    this.AllDesignation();
    this.AllLocation();
    this.AllShift();
  
this.token=localStorage.getItem('token');
this.token=jwtDecode(this.token);
var role=this.token.role;
    this.UserForm=this.formbuilder.group({
      user_name:['',Validators.required],
      rpt_id:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      confirm_password:['',Validators.required],
      roles:['',Validators.required],
      role:role,
      phone_no:['',Validators.required],
      shift:['',Validators.required],
      department:['',Validators.required],
      designation:['',Validators.required],
      sub_department:['',Validators.required],
      office_location:['',Validators.required],
      status:['',Validators.required],
    })
    if(this.editData){
      // this.Submit='Update User';
      this.UserForm.controls['rpt_id'].setValue(this.editData._id);
      this.UserForm.controls['user_name'].setValue(this.editData.employee_name);
      this.UserForm.controls['email'].setValue(this.editData.email);
      this.UserForm.controls['phone_no'].setValue(this.editData.contact_no1);
      this.UserForm.controls['department'].setValue(this.editData.department);
      this.UserForm.controls['designation'].setValue(this.editData.designation);
      this.UserForm.controls['subDepartment'].setValue(this.editData.subDepartment);

    }
  }
 
  validate:any=[]
  data:any=[]
  addUser(){
const shift=this.UserForm.value.shift;
const office_location=this.UserForm.value.office_location;

 var data= this.shifts.find((x:any)=>{
  if(x._id==shift){
    this.UserForm.controls['shift'].setValue(x);
  }
 })
 var data1=this.locations.find((x:any)=>{
  if(x._id==office_location){
    this.UserForm.controls['office_location'].setValue(x);
  }
 })

if(!this.editData.update){
this.submitted=true

if(this.UserForm.value.user_name=='' || this.UserForm.value.email=='' || this.UserForm.value.password=='' || this.UserForm.value.roles=='' || this.UserForm.value.confirm_password=='' || this.UserForm.value.phone_no==''){
  console.log('fill the all field')
}
else{
  if(this.UserForm.value.password==this.UserForm.value.confirm_password){
    this.api.adduserData(this.UserForm.value).subscribe({
      next:(res)=>{
        console.log(res)
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
            'User Added Successfully',
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
Departments:any=[];
Designations:any=[];
SubDepartments:any=[];
shifts:any=[];
locations:any=[];


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

SubDepartment:any=[]
designationSelect:any=[]
 DepartmentChange(event:Event){
  
   const val=(event.target as HTMLInputElement).value;
  this.SubDepartment= this.SubDepartments.filter((x:any)=>
     x.head_department==val
   )


   this.designationSelect= this.Designations.filter((y:any)=>
   y.head_department==val
 )
 
 }
AllDepartment(){
  this.api2.getAllDepartment().subscribe({
    next:(res)=>{
      this.Departments=res;
      console.log(this.Departments)
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
AllDesignation(){
  this.api2.getAllDesignation().subscribe({
    next:(res)=>{
      this.Designations=res;
    
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
AllSubDeparment(){
  this.api2.getAllSubdepartment().subscribe({
    next:(res)=>{
      this.SubDepartments=res;
      console.log(this.SubDepartments)
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
AllShift(){
this.api2.getAllShift().subscribe({
  next:(res)=>{
    this.shifts=res;
  },
  error:(err)=>{
    console.log(err)
  }
})
}
AllLocation(){
  this.api2.getAllLocation().subscribe({
    next:(res)=>{
      this.locations=res;
    },
    error:(err)=>{
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
