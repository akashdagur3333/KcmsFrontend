import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { timer } from 'rxjs';
import { LoginStatusService } from 'src/app/services/login-status.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit{
  Seconds!:number;
  minutes!:number;
  hours!:number;
  Start:number=0;
  count:number=1000;
  time:any;
  title:any;
  token:any;
  Status!:FormGroup;
  constructor(private router:Router,private api:LoginStatusService,private formbuilder:FormBuilder){
    this.token=localStorage.getItem('token');
    this.token=jwtDecode(this.token);
     this.username=this.token.username;


     var local=localStorage.getItem('timer');
     this.time=setInterval(()=>{     
      this.Start=Number(this.Start)+1;
      const y=this.Start
      localStorage.setItem('timer',this.Start.toString())  
   
 
     this.Seconds  = Math.floor(y % 60);
     this.minutes  = Math.floor((y/60) % 60);
     this.hours = Math.floor((y/(60*60)));
    //  if(y>=300){
    //   this.router.navigate(['/login']);
    //   localStorage.removeItem('timer');
    //   clearInterval(time)
    //  }
     },1000)

    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    const getpendingtime=Number(localStorage.getItem('timer'));
    this.Start=getpendingtime;
    // const second=Math.floor(this.Start % 60);
    // const minute= Math.floor((this.Start/60) % 60);
    // const hour=Math.floor((this.Start/(60*60)));

    this.Status=this.formbuilder.group({
      totalActive:this.Start,
     })
     this.updateData(this.token.rpt_id,this.Status.value)
    } 
  }


    username:any;
    TotalActiveTime:any=[]
    activetime:any;
    ngOnInit(): void {
      var date=new Date();
     var dateFormat= moment(date).format('YYYY/MM/DD')      
    this.api.getTotalActive(this.token.rpt_id).subscribe({
      next:(res)=>{
       this.TotalActiveTime=res.find((x:any)=>{
        if(x.date==dateFormat){
        this.Start=x.totalActive
        }
      });

      },
      error:(err)=>{
        console.log(err);
      }
    })
var role= this.token.role;
if(role=='hr'){
  this.title='HR'
}
else if(role=='technical'){
  this.title='TECHNICAL'
}

    }


    updateData(id:any,value:any){
      this.api.updateLoginStatus(id,value).subscribe({
        next:(res)=>{
          console.log(res)
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }

  
  
   CurentTime:any;
    logout(){
      var currentDateTime=new Date();
      var dateUTC = currentDateTime.getTime() 
      var dateIST = new Date(dateUTC);
      dateIST.setHours(dateIST.getHours() + 5); 
      dateIST.setMinutes(dateIST.getMinutes() + 30);
      this.CurentTime=localStorage.getItem('timer')?.toString();
      this.CurentTime=Number(this.CurentTime);
      // const second=Math.floor(this.CurentTime % 60);
      // const minute= Math.floor((this.CurentTime/60) % 60);
      // const hour=Math.floor((this.CurentTime/(60*60)));
      this.Status=this.formbuilder.group({
        logout:dateIST,
        totalActive:this.CurentTime
       })
         
       this.updateData(this.token.rpt_id,this.Status.value)
    this.router.navigate(['/']);
    localStorage.clear();
    clearInterval(this.time)
    }
}
