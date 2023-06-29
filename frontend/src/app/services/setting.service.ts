import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http:HttpClient) { }

  address=environment.url;


  //location
  public addLocation(data:any){
    return this.http.post<any>(this.address+'location',data)
  }
  public getAllLocation(){
    return this.http.get<any>(this.address+'location')
  }
  public deleteLocation(id:any){
    return this.http.delete<any>(this.address+'location/'+id)
  }
  public updateLocation(id:any,data:any){
    return this.http.put<any>(this.address+'location/'+id,data)
  }

//financial
public addFinancial(data:any){
  return this.http.post<any>(this.address+'financial',data)
}
public getAllFinancial(){
  return this.http.get<any>(this.address+'financial')
}
public deleteFinancial(id:any){
  return this.http.delete<any>(this.address+'financial/'+id)
}
public updateFinancial(id:any,data:any){
  return this.http.put<any>(this.address+'financial/'+id,data)
}

//department
public addDepartment(data:any){
  return this.http.post<any>(this.address+'department',data)
}
public getAllDepartment(){
  return this.http.get<any>(this.address+'department')
}
public deleteDepartment(id:any){
  return this.http.delete<any>(this.address+'department/'+id)
}
public updateDepartment(id:any,data:any){
  return this.http.put<any>(this.address+'department/'+id,data)
}

//Sub department
public addSubDepartment(data:any){
  return this.http.post<any>(this.address+'sub_department',data)
}
public getAllSubdepartment(){
  return this.http.get<any>(this.address+'sub_department')
}
public deleteSubdepartment(id:any){
  return this.http.delete<any>(this.address+'sub_department/'+id)
}
public updateSubdepartment(id:any,data:any){
  return this.http.put<any>(this.address+'sub_department/'+id,data)
}

//designation
public addDesignation(data:any){
  return this.http.post<any>(this.address+'designation',data)
}
public getAllDesignation(){
  return this.http.get<any>(this.address+'designation')
}
public deleteDesignation(id:any){
  return this.http.delete<any>(this.address+'designation/'+id)
}
public updateDesignation(id:any,data:any){
  return this.http.put<any>(this.address+'designation/'+id,data)
}

//Qualification
public addQualification(data:any){
  return this.http.post<any>(this.address+'qualification',data)
}
public getAllQualification(){
  return this.http.get<any>(this.address+'qualification')
}
public deleteQualification(id:any){
  return this.http.delete<any>(this.address+'qualification/'+id)
}
public updateQualification(id:any,data:any){
  return this.http.put<any>(this.address+'qualification/'+id,data)
}

//package
public addPackage(data:any){
  return this.http.post<any>(this.address+'package',data)
}
public getAllPackage(){
  return this.http.get<any>(this.address+'package')
}
public deletePackage(id:any){
  return this.http.delete<any>(this.address+'package/'+id)
}
public updatePackage(id:any,data:any){
  return this.http.put<any>(this.address+'package/'+id,data)
}

//shift
public addShift(data:any){
  return this.http.post<any>(this.address+'shift',data);
}
public getAllShift(){
  return this.http.get<any>(this.address+'shift');
}
public deleteShift(id:any){
  return this.http.delete<any>(this.address+'shift/'+id)
}
public updateShift(id:any,data:any){
  return this.http.put<any>(this.address+'shift/'+id,data)
}

//vsrValue
public addVsrvalue(data:any){
  return this.http.post<any>(this.address+'vsrValue',data)
}
public getAllVsrValue(){
  return this.http.get<any>(this.address+'vsrValue')
}
public deleteVsrvalue(id:any){
  return this.http.delete<any>(this.address+'vsrValue/'+id)
}
public UpdateVsrValue(id:any,data:any){
  return this.http.put<any>(this.address+'vsrValue/'+id,data)
}

//ledger
public addLedger(data:any){
  return this.http.post<any>(this.address+'ledger',data)
}
public getAllLedger(){
  return this.http.get<any>(this.address+'ledger')
}
public deleteLedger(id:any){
  return this.http.delete<any>(this.address+'ledger/'+id)
}
public updateLedger(id:any,data:any){
  return this.http.put<any>(this.address+'ledger/'+id,data)
}

//stream
public addStream(data:any){
  return this.http.post<any>(this.address+'stream',data)
}
public getAllStream(){
  return this.http.get<any>(this.address+'stream')
}
public deleteStream(id:any){
  return this.http.delete<any>(this.address+'stream/'+id)
}
public updateStream(id:any,data:any){
  return this.http.put<any>(this.address+'stream/'+id,data)
}

//batch size
public addBatchSize(data:any){
  return this.http.post<any>(this.address+'batchSize',data)
}
public getAllBatchSize(){
  return this.http.get<any>(this.address+'batchSize')
}
public deleteBatchSize(id:any){
  return this.http.delete<any>(this.address+'batchSize/'+id)
}
public updateBatchSize(id:any,data:any){
  return this.http.put<any>(this.address+'batchSize/'+id,data)
}


//trainer
public addTrainer(data:any){
  return this.http.post<any>(this.address+'trainer',data)
}
public getAllTrainer(){
  return this.http.get<any>(this.address+'trainer')
}
public deleteTrainer(id:any){
  return this.http.delete<any>(this.address+'trainer/'+id)
}
public updateTrainer(id:any,data:any){
  return this.http.put<any>(this.address+'trainer/'+id,data)
}


//relieving
public addRelieving(data:any){
  return this.http.post<any>(this.address+'relieving',data)
}
public getAllRelieving(){
  return this.http.get<any>(this.address+'relieving')
}
public deleteRelieving(id:any){
  return this.http.delete<any>(this.address+'relieving/'+id)
}
public updateRelieving(id:any,data:any){
  return this.http.put<any>(this.address+'relieving/'+id,data)
}
}

