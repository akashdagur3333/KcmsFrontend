import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  address=environment.url;
  public addStudents(data:any){
    return this.http.post<any>(this.address+'students',data)
  }

  public getAllStudents(){
    return this.http.get<any>(this.address+'students')
  }
  public deleteStudents(id:any){
    return this.http.delete<any>(this.address+'students/'+id)
  }
  public updateStudents(id:any,data:any){
    return this.http.put<any>(this.address+'students/'+id,data)
  }
}
