import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class BatchesService {
  address=environment.url;
  constructor(private http:HttpClient) { }

  public addBatches(data:any){
    return this.http.post<any>(this.address+'training_batches',data)
  }

  public getAllBateches(){
    return this.http.get<any>(this.address+'training_batches')
  }
  public deleteBatches(id:any){
    return this.http.delete<any>(this.address+'training_batches/'+id)
  }
  public updateBatches(id:any,data:any){
    return this.http.put<any>(this.address+'training_batches/'+id,data)
  }
}
