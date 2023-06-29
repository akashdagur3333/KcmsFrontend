import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AddNormalUserModelComponent } from 'src/app/Model/add-normal-user-model/add-normal-user-model.component';
import { AddNormalComponent } from 'src/app/Model/add-normal/add-normal.component';
import { UserModelComponent } from 'src/app/Model/user-model/user-model.component';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  UserForm!:FormGroup;
  UsersData:any;
  status:any;
  token:any;
  displayedColumns: string[] = ['id','rpt_id','username','email','phone_no','role','status','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private formbuilder:FormBuilder,private api:AuthService,private dialog:MatDialog,private router:Router){}
  username:any;
  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    var localToken=localStorage.getItem('token');
    this.token=jwtDecode(this.token)
    this.username=this.token.username;
    this.token=this.token.role
    this.token=this.token.toString();
    // console.log(localToken)
     if(localToken==null){
       this.router.navigate(['/login']);
     }
    else{
       this.api.checkToken().subscribe((response:any)=>{
      if(response.message=="true"){
       if(this.token=='admin' || this.token=='nadmin'){
        this.router.navigate(['/user']);
        this.getAllUser();
       this.UserForm=this.formbuilder.group({
         user_name:['',Validators.required],
         email:['',Validators.required],
         password:['',Validators.required],
         confirm_password:['',Validators.required],
         roles:['',Validators.required],
         phone_no:['',Validators.required]
       })
       }
       else{
        this.router.navigate(['/user/home']);
       }
    
    
      }
      else if(response.message=="Token Expired"){
       Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'Token Expired'
       });
       this.router.navigate(['/login']);
 
      }
      else if(response.message="Authentication failed"){
       Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'Authentication failed'
       });
       this.router.navigate(['/login']);
      }
        // console.log(response);
       // console.log("chal gya ")
       });
     }
 
   
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  addUser(){
    if(this.UserForm.value.password==this.UserForm.value.confirm_password){
      this.api.adduserData(this.UserForm.value).subscribe({
        next:(res)=>{
          // console.log(res);
          if(res.message=='user already registered'){
            Swal.fire(
              'Good job!',
              'User Already registered',
              'success'
            )
          }
          else{
            Swal.fire(
              'Good job!',
              'User Added Successfully',
              'success'
            )
            this.getAllUser();
            this.UserForm.reset();
          }
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Incorrect Password!',
      })
    }  
}

resData:any=[];
getAllUser(){
  this.api.alluser().subscribe({
next:(res)=>{
  res.map((x:any)=>{
    if(x.rpt_id){
      x.rpt_id='RPT'+x.rpt_id
    }
    if(x.status==false){
      x.status='Active'
    }
  })
 this.resData=res;
 this.resData.reverse();
  this.dataSource = new MatTableDataSource(this.resData);
       this.dataSource.paginator= this.paginator;
       this.dataSource.sort =this.sort;
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
OpenModel(){
  const person = prompt("Please Enter User type", "Admin/Normal");
  var data=person?.toLowerCase()
  if(data=='admin'){
  this.dialog.open(UserModelComponent,{
    width:'50%'
  }).afterClosed().subscribe(val=>{
    if(val=='Add'){
      this.getAllUser();
    }
  })
  }
  else if(data=='normal'){
    this.dialog.open(AddNormalComponent,{
      width:'50%',
      height:'80%'
    }).afterClosed().subscribe(val=>{
      if(val=='Add'){
        this.getAllUser();
      }
    })

  }
  console.log(data)

}


editUser(user:any){
 if(user.role=='nadmin'|| user.role=='admin'){
  this.dialog.open(UserModelComponent,{
    width:'30%',
    data:user
  }).afterClosed().subscribe(val=>{
    if(val=='Update'){
      this.getAllUser();
    }
  })
 }
  else{
    this.dialog.open(AddNormalUserModelComponent,{
      width:'50%',
      height:'70%',
      data:user
    }).afterClosed().subscribe(val=>{
      if(val=='Update'){
        this.getAllUser();
      }
    })
  }

}

deleteUser(id:any){

  this.api.deleteUser(id,{role:this.token}).subscribe({
    next:(res)=>{
      
      Swal.fire(
        'Good job!',
        'User Deleted Successfully',
        'success'
      )
      this.getAllUser();
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
