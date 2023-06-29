import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  constructor(private http:HttpClient) { }

  address=environment.url;



  public validate(data:any){
    return this.http.post<any>(this.address+'validate',data)
  }

  public addReporting(data:any){
    return this.http.post<any>(this.address+'reporting',data)
  }
  public getAllReporting(){
    return this.http.get<any>(this.address+'reporting')
  }
  public deleteReporting(id:any){
    return this.http.delete<any>(this.address+'reporting/'+id)
  }
  public updateReporting(id:any,data:any){
    return this.http.put<any>(this.address+'reporting/'+id,data)
  }

  public updatePendingValue(id:any,data:any){
    return this.http.put<any>(this.address+'reporting/Pending_value/'+id,data)
  }

  public updateJobStatus(id:any,data:any){
    return this.http.put<any>(this.address+'reporting/JobStatus/'+id,data)
  }

  //reciept
  
  public addReciept(data:any){
    return this.http.post<any>(this.address+'reciept',data)
  }
  public getAllReciept(){
    return this.http.get<any>(this.address+'reciept')
  }
  public deleteReciept(id:any){
    return this.http.delete<any>(this.address+'reciept/'+id)

}

//fine
public addFine(data:any){
  return this.http.post<any>(this.address+'fine',data)
}
public getAllFine(){
  return this.http.get<any>(this.address+'fine')
}
public deleteFine(id:any){
  return this.http.delete<any>(this.address+'fine/'+id)

}

//other
public addOther(data:any){
  return this.http.post<any>(this.address+'other',data)
}
public getAllOther(){
  return this.http.get<any>(this.address+'other')
}
public deleteOther(id:any){
  return this.http.delete<any>(this.address+'other/'+id)

}


//fineWaiver

public addFineWaiver(data:any){
  return this.http.post<any>(this.address+'fineWaiver',data)
}
public getAllFineWaiver(){
  return this.http.get<any>(this.address+'fineWaiver')
}
public deleteFineWaiver(id:any){
  return this.http.delete<any>(this.address+'fineWaiver/'+id)

}


//otherWaiver 

public addOtherWaiver(data:any){
  return this.http.post<any>(this.address+'otherWaiver',data)
}
public getAllOtherWaiver(){
  return this.http.get<any>(this.address+'otherWaiver')
}
public deleteOtherWaiver(id:any){
  return this.http.delete<any>(this.address+'otherWaiver/'+id)

}

//vsrWaiver
public addVSRWaiver(data:any){
  return this.http.post<any>(this.address+'vsrWaiver',data)
}
public getAllVSRWaiver(){
  return this.http.get<any>(this.address+'vsrWaiver')
}
public deleteVSRWaiver(id:any){
  return this.http.delete<any>(this.address+'vsrWaiver/'+id)
}

//Refund
public addRefund(data:any){
  return this.http.post<any>(this.address+'refund',data)
}
public getAllRefund(){
  return this.http.get<any>(this.address+'refund')
}
public deleteRefund(id:any){
  return this.http.delete<any>(this.address+'refund/'+id)
}
public updateRefund(id:any,data:any){
  return this.http.put<any>(this.address+'refund/'+id,data)
}


//RefundPayment
public addRefundPayment(data:any){
  return this.http.post<any>(this.address+'refundPayment',data)
}
public getAllRefundPayment(){
  return this.http.get<any>(this.address+'refundPayment')
}
public deleteRefundPayment(id:any){
  return this.http.delete<any>(this.address+'refundPayment/'+id)
}

public Total(pending:any,amount:any){
  return pending-amount;
}

public calGST(value:any){
  const cal=(value/118)*100;
  return this.roundUp(value-cal,1);
}


roundUp(num:any, precision:any) {
  precision = Math.pow(1, precision)
  return Math.ceil(num * precision) / precision
}

}