import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class CollegesService {
  constructor(private http:HttpClient) { }
  address=environment.url;
  public addColleges(data:any){
    return this.http.post<any>(this.address+'colleges',data)
  }

  public getAllColleges(){
    return this.http.get<any>(this.address+'colleges')
  }
  public deleteColleges(id:any){
    return this.http.delete<any>(this.address+'colleges/'+id)
  }
  public updateColleges(id:any,data:any){
    return this.http.put<any>(this.address+'colleges/'+id,data)
  }

  

  public updateStatus(id:any,data:any){
    return this.http.put<any>('https://knocialindiagreatong.onrender.com/collegesStatus/'+id,data)
  }
}
