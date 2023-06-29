import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class QuesrionService {

  constructor(private http:HttpClient) { }
  address=environment.url;

  public addQuestion(data:any){
    return this.http.post<any>(this.address+'question',data)
  }

  public getAllQuestion(){
    return this.http.get<any>(this.address+'question')
  }
  public deleteQuestion(id:any){
    return this.http.delete<any>(this.address+'question/'+id)
  }



  
  public addTest(data:any){
    return this.http.post<any>(this.address+'trainingTest',data)
  }

  public getAllTest(){
    return this.http.get<any>(this.address+'trainingTest')
  }
  public deleteTest(id:any){
    return this.http.delete<any>(this.address+'trainingTest/'+id)
  }
  public updateTest(id:any,data:any){
    return this.http.put<any>(this.address+'trainingTest/'+id,data)
  }
}
