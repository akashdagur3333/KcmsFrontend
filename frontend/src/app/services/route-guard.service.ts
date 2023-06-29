import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(public router:Router,public auth:AuthService) { }

  canActivate(route:ActivatedRouteSnapshot):boolean{
   let expectedRoleArray=route.data;
   expectedRoleArray=expectedRoleArray['expectedRole'];
const token:any=localStorage.getItem('token');
   var tokenPayload:any;
 
   //check token

   try{
     tokenPayload=jwt_decode(token);
   }
   catch(err){
    localStorage.clear();
    this.router.navigate(['/']);
   }

   //console.log(tokenPayload.role)
   //check role
   let checkRole=false;


   for(let i=0;i<=expectedRoleArray['length'];i++){
    if(expectedRoleArray[i]==tokenPayload.role){
      checkRole=true;
    }
   }

   if(tokenPayload.role =='user' || tokenPayload.role=='admin' || tokenPayload.role=='hr' || tokenPayload.role=='technical' || tokenPayload.role=='nadmin'){
    if(this.auth.isAuthenticated() && checkRole){
      return true;
    }
    this.router.navigate(['/home']);
    return false;
   }
 else{
  this.router.navigate(['/']);
  localStorage.clear();
  return false;
 }
  }
}
