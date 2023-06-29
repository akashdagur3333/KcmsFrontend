import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { timer } from 'rxjs';
import { SignupService } from 'src/app/services/signup.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  WindowHeight:any;
  WindowWidth:any;
  deviceInfo:any;
  public login:any={
    email:'',
    password:'',
    width:'',
    height:'',
    lat:'',
    lng:'',
    ipAddress:''
  }
  constructor(private api:SignupService,public route:Router){
  }
  hours:number=0;
  minutes:number=0;
  Seconds:number=1;
ngOnInit(): void {
  this.getLocation();
  this.getipaddress();
  this.WindowWidth= window.innerWidth;
  this.WindowHeight= window.innerHeight;
 this.login.width=this.WindowWidth;
 this.login.height=this.WindowHeight;
  localStorage.removeItem('token');
}
username:any;
token:any;
userLogin(){
  console.log(this.login.ipAddress)
  this.api.loginUser(this.login).subscribe({
    next:(res)=>{
      var message=res.message;
      if(message=='Login With Laptop'){
        Swal.fire({
          icon: 'error',
          title: message,
          text: 'Login With Laptop'
        })
      }
     else if(message=='user not found'){
        Swal.fire({
          icon: 'error',
          title: message,
          text: 'Create New Account'
        }),
        this.route.navigate(['/login'])
      }
      else if(message =='Password not match'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: message
        })
      }
      else if(message =='User Inactive'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: message
        }) 
      }
      else if(message=='Shift Over'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: message
        }) 
      }
      else if(message=='login Successfully'){ 
    Swal.fire(
        'Good job!',
        'Login Sucessfully',
        'success',
      )
      localStorage.setItem('token',res.token);
      var tokenData:any=jwtDecode(res.token);
      this.token=tokenData
      var local=localStorage.getItem('timer');
      if(local){
        localStorage.setItem('timer',local.toString())
      }
      tokenData= tokenData.role.toString();

      if(tokenData=='admin' || tokenData=='nadmin'){
       this.route.navigate(['/Admin/user'])
      }
      else{
        this.route.navigate(['/User/index'])
      }
      }
  
 
    },
    error:(err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Live Backend',
      });
    }
  }
  )
}

data:any=[]
getipaddress(){
  this.api.getIPAddress().subscribe({
    next:(res)=>{
      this.data=res
  this.login.ipAddress=this.data.ip;
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
lat:any;
lng:any;
getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position: any) => {
      if (position) {
       
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.login.lat=this.lat;
        this.login.lng=this.lng;
      }
    },
      (error: any) => console.log(error));
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

  signin(){
this.route.navigate(['/home']).then(()=>{
window.location.reload();
})
  }

}
