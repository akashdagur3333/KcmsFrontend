import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { QuesrionService } from 'src/app/services/quesrion.service';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user-model',
  templateUrl: './add-user-model.component.html',
  styleUrls: ['./add-user-model.component.css']
})
export class AddUserModelComponent implements OnInit{
  res:any;
  x:any
  user:any=[];
    ngOnInit(): void {
        this.getAllUser();
        // localStorage.removeItem('adduser');
    }
    constructor(private api:ReportingService,private dialog1:MatDialogRef<AddUserModelComponent>){}
    getAllUser(){
      this.api.getAllReporting().subscribe({
        next:(res)=>{
          this.res=res;
          console.log(res)
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
        //   this.dialog1.close("user");
        // }
        // adduser(data:{},id:any){
        //   if(this.user==''){
        //     this.user.push(data)
        //     localStorage.setItem('adduser',JSON.stringify(this.user));
        //   }
        //   else{
        //    this.user.find((x:any)=>{
        //       if(x._id==id){
        //       alert('already exist')
        //       }
        //       else{
        //         this.user.push(data)
        //         localStorage.setItem('adduser',JSON.stringify(this.user));
        //       }
        //         });
        //   // if(!this.x){
        //   //       this.user.push(data)
        //   //       console.log(this.user)
        //   //       }
        //   }
        //    console.log(this.user)
      
  
        // }
        userChange($event:any,data1:any,id:any){
        const data=data1
        const isChecked=$event.target.checked;
        // console.log(data,isChecked)
        if(isChecked==true){
          
          this.user.push(data);
          console.log(this.user)
        }
        else{
      const index= this.user.findIndex((x:any)=>x._id==id);
      if (index > -1) {
        this.user.splice(index, 1);
      }
      console.log(this.user)
      return this.user;
     
    }
    }
  
    addUser(){
      let data=this.user
      this.dialog1.close(data);
    }
      }
       
  //         this.user.findIndex((x:any)=>{
  //                 if(x._id==id){
  // console.log(x)
  //                 }
              
  //                   });      }
      
        // console.log(this.user)
        // }
  
  
