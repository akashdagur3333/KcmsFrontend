import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //https://knocialindiagreatong.onrender.com/
 // http://3.7.133.163:3000/
  address=environment.url;
token:any;
  constructor(private http:HttpClient,private router:Router) { }
  public adduserData(data:any){
    return this.http.post<any>(this.address+'user/register',data);
      }
      public alluser(){
        return this.http.get<any>(this.address+'user/alluser');
          }      
    public deleteUser(id:any,data:any){
      return this.http.delete<any>(this.address+'user/deleteuser/'+id,data);
    }
    public updateUser(id:any,data:any){
      return this.http.put<any>(this.address+'user/updateUser/'+id,data);
    }

    public checkToken(){
      this.token=localStorage.getItem('token');
      return this.http.get(this.address+'user/checkToken',{headers: new HttpHeaders().set('Authorization',this.token)});
    }

    public isAuthenticated():boolean{
      const token =localStorage.getItem('token');
      if(!token){
        this.router.navigate(['/']);
        return false;
      }
      else{
        return true;
      }
    }

    
}
