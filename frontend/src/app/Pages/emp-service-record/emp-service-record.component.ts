import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmpServiceRecordModelComponent } from 'src/app/Model/emp-service-record-model/emp-service-record-model.component';
import { FineModelComponent } from 'src/app/Model/fine-model/fine-model.component';
import { FineWaiverModelComponent } from 'src/app/Model/fine-waiver-model/fine-waiver-model.component';
import { OtherChargeModelComponent } from 'src/app/Model/other-charge-model/other-charge-model.component';
import { OtherWaiverModelComponent } from 'src/app/Model/other-waiver-model/other-waiver-model.component';
import { RecieptModelComponent } from 'src/app/Model/reciept-model/reciept-model.component';
import { ReportingModelComponent } from 'src/app/Model/reporting-model/reporting-model.component';
import { VSRWaiverModelComponent } from 'src/app/Model/vsrwaiver-model/vsrwaiver-model.component';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-emp-service-record',
  templateUrl: './emp-service-record.component.html',
  styleUrls: ['./emp-service-record.component.css']
})
export class EmpServiceRecordComponent implements OnInit{
  date:any
  displayedColumns: string[] = ['id','rpt_id','type','name','father_name','package','sex','doj','total_value','pending_value','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getAllReporting()
  }
  constructor(private dialog:MatDialog,private api:ReportingService){}



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllReporting(){
this.api.getAllReporting().subscribe({
  next:(res)=>{
  var data=  res.filter((x:any)=>{
      if(x.status==4){
        return x
      }
    })
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator= this.paginator;
    this.dataSource.sort =this.sort;
  },
  error:(err)=>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: err
    })
  }
})
  }


  viewRecord(data:any){
    this.dialog.open(EmpServiceRecordModelComponent,{
      width:'60%',
      height:'70%',
      data
    })
  }

}
