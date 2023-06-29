import { Injectable } from '@angular/core';
import { environment } from '../enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientManagementService {

  constructor(private http:HttpClient) { }
  address=environment.url;


  //client
  public addClient(data:any){
    return this.http.post<any>(this.address+'client',data)
  }

  public getAllClient(){
    return this.http.get<any>(this.address+'client')
  }
  public deleteClient(id:any){
    return this.http.delete<any>(this.address+'client/'+id)
  }
  public updateClient(id:any,data:any){
    return this.http.put<any>(this.address+'client/'+id,data)
  }

  //project
  public addProject(data:any){
    return this.http.post<any>(this.address+'project',data)
  }

  public getAllProject(){
    return this.http.get<any>(this.address+'project')
  }
  public deleteProject(id:any){
    return this.http.delete<any>(this.address+'project/'+id)
  }
  public updateProject(id:any,data:any){
    return this.http.put<any>(this.address+'project/'+id,data)
  }

  //order
  public addOrder(data:any){
    return this.http.post<any>(this.address+'order',data)
  }

  public getAllOrder(){
    return this.http.get<any>(this.address+'order')
  }
  public deleteOrder(id:any){
    return this.http.delete<any>(this.address+'order/'+id)
  }
  public updateOrder(id:any,data:any){
    return this.http.put<any>(this.address+'order/'+id,data)
  }

  //invoice
  public addInvoice(data:any){
    return this.http.post<any>(this.address+'invoice',data)
  }

  public getAllInvoice(){
    return this.http.get<any>(this.address+'invoice')
  }
  public deleteInvoice(id:any){
    return this.http.delete<any>(this.address+'invoice/'+id)
  }
  public updateInvoice(id:any,data:any){
    return this.http.put<any>(this.address+'invoice/'+id,data)
  }

}
