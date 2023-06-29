import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class DriveService {

  constructor(private http:HttpClient) { }
  address=environment.url;

  public addDrives(data:any){
    return this.http.post<any>(this.address+'drives',data)
  }

  public getAllDrives(){
    return this.http.get<any>(this.address+'drives')
  }
  public deleteDrives(id:any){
    return this.http.delete<any>(this.address+'drives/'+id)
  }
  public updateDrives(id:any,data:any){
    return this.http.put<any>(this.address+'drives/'+id,data)
  }
}
