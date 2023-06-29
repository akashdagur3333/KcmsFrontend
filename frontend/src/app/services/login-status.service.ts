import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {
  address=environment.url;
  constructor(private http:HttpClient) { }

public updateLoginStatus(id:any,data:any){
  return this.http.put<any>(this.address+'updateloginStatus/'+id,data)
}

public getTotalActive(id:any){
  return this.http.get<any>(this.address+'getTotalActive/'+id)
}

public getAllStatus(id:any){
  return this.http.get<any>(this.address+'getUserStatus/'+id)
}
public getPersonalStatus(id:any){
  return this.http.get<any>(this.address+'getUserSingleStatus/'+id)
}

public converter(data:any){
  const second=Math.floor(data % 60);
  const minute= Math.floor((data/60) % 60);
  const hour=Math.floor((data/(60*60)));
  return hour+'H '+minute+'M '+second+'S'
}

}
