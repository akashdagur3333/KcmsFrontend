import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http:HttpClient) { }
  address=environment.url;
  public addHrActivity(data:any){
    return this.http.post<any>(this.address+'Activity',data)
  }

  public getAllHrActivity(){
    return this.http.get<any>(this.address+'Activity')
  }
  public deleteHrActivity(id:any){
    return this.http.delete<any>(this.address+'Activity/'+id)
  }
  public updateHrActivity(id:any,data:any){
    return this.http.put<any>(this.address+'Activity/'+id,data)
  }

  //HR Meeting
  public addHrMeeting(data:any){
    return this.http.post<any>(this.address+'HrMeeting',data)
  }

  public getAllHrMeeting(){
    return this.http.get<any>(this.address+'HrMeeting')
  }
  public deleteHrMeeting(id:any){
    return this.http.delete<any>(this.address+'HrMeeting/'+id)
  }
  public updateHrMeeting(id:any,data:any){
    return this.http.put<any>(this.address+'HrMeeting/'+id,data)
  }

    //Director Meeting
    public addDirectorMeeting(data:any){
      return this.http.post<any>(this.address+'DirectorMeeting',data)
    }
  
    public getAllDirectorMeeting(){
      return this.http.get<any>(this.address+'DirectorMeeting')
    }
    public deleteDirectorMeeting(id:any){
      return this.http.delete<any>(this.address+'DirectorMeeting/'+id)
    }
    public updateDirectorMeeting(id:any,data:any){
      return this.http.put<any>(this.address+'DirectorMeeting/'+id,data)
    }

}
