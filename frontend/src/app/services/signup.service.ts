import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }
  address=environment.url;
  public loginUser(data:any){
    return this.http.post<any>(this.address+'user/login',data)
  }

 public getIPAddress()
  {
   return this.http.get("http://api.ipify.org/?format=json");
  }

  public header(){
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    return {headers: headers};
  }
}
