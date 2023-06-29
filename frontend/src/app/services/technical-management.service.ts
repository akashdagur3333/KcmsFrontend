import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class TechnicalManagementService {

  constructor(private http:HttpClient) { }
  address=environment.url;


  //Team
  public addTeam(data:any){
    return this.http.post<any>(this.address+'team',data)
  }

  public getAllTeam(){
    return this.http.get<any>(this.address+'team')
  }
  public deleteTeam(id:any){
    return this.http.delete<any>(this.address+'team/'+id)
  }
  public updateTeam(id:any,data:any){
    return this.http.put<any>(this.address+'team/'+id,data)
  }

  //Total Assignment
  public addTotalAssignment(data:any){
    return this.http.post<any>(this.address+'totalAssignment',data)
  }

  public getAllTotalAssignment(){
    return this.http.get<any>(this.address+'totalAssignment')
  }
  public deleteTotalAssignment(id:any){
    return this.http.delete<any>(this.address+'totalAssignment/'+id)
  }
  public updateTotalAssignment(id:any,data:any){
    return this.http.put<any>(this.address+'totalAssignment/'+id,data)
  }

  //Total Task
  public addTotaltask(data:any){
    return this.http.post<any>(this.address+'totalTask',data)
  }

  public getAllTotaltask(){
    return this.http.get<any>(this.address+'totalTask')
  }
  public deleteTotaltask(id:any){
    return this.http.delete<any>(this.address+'totalTask/'+id)
  }
  public updateTotaltask(id:any,data:any){
    return this.http.put<any>(this.address+'totalTask/'+id,data)
  }

  //Assigned Task
  public addAssignedtask(data:any){
    return this.http.post<any>(this.address+'assignedTask',data)
  }

  public getAllAssignedtask(){
    return this.http.get<any>(this.address+'assignedTask')
  }
  public deleteAssignedtask(id:any){
    return this.http.delete<any>(this.address+'assignedTask/'+id)
  }
  public updateAssignedtask(id:any,data:any){
    return this.http.put<any>(this.address+'assignedTask/'+id,data)
  }

}
