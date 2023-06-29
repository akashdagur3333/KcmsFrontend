import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent  implements OnInit{
  date:any
  displayedColumns: string[] = ['id','rpt_id','type','offer_letter','name','father_name','mother_name','package','sex','aadhar','reporting_date','reported_at','reported_by','doj','total_value','total_vsr','paid_vsr','fine','paid_fine','paid_other','fineWaiver','vsrWaiver','otherWaiver','pending_value','add','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getAllReporting()
  }
  constructor(private dialog:MatDialog,private api:ReportingService){}

  OpenModel(){
    this.dialog.open(ReportingModelComponent,{
      width:'60%',
      height:'70%',
        }).afterClosed().subscribe(val=>{
      if(val=='Add'){
         this.getAllReporting();
      }
    })
  }

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
    this.dataSource = new MatTableDataSource(res);
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


  editReporting(data:any){
    this.dialog.open(ReportingModelComponent,{
      width:'60%',
      height:'70%',
      data
    }).afterClosed().subscribe(val=>{
      if(val=='Update'){
        this.getAllReporting();
      }
    })
  }

  deleteReporting(id:any){
    this.api.deleteReporting(id).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'Reporting Deleted Successfully',
          'success'
        )
        this.getAllReporting();
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

  addReciept(reciept:any){
    this.dialog.open(RecieptModelComponent,{
      width:'60%',
      data:{reciept}
    }).afterClosed().subscribe(val=>{
      if(val=='Add'){
        this.getAllReporting();
      }
    })
  }
  addFine(fine:any){
    this.dialog.open(FineModelComponent,{
      width:'60%',
      data:{fine}

    }).afterClosed().subscribe(val=>{
      if(val=='Add'){
        this.getAllReporting();
      }
    })
  }
  addFineWaiver(fineWaiver:any){
    this.dialog.open(FineWaiverModelComponent,{
      width:'60%',
      data:{fineWaiver}
    }).afterClosed().subscribe(val=>{
      if(val=='Add'){
        this.getAllReporting();
      }
    })
  }
  addVSRWaiver(VSR_waiver:any){
    this.dialog.open(VSRWaiverModelComponent,{
      width:'60%',
      data:{VSR_waiver}
    }).afterClosed().subscribe(val=>{
      if(val=='Add'){
        this.getAllReporting();
      }
    })
  }

  addother(other:any){
    this.dialog.open(OtherChargeModelComponent,{
      width:'60%',
      data:{other}
    }).afterClosed().subscribe(val=>{
      if(val=='Add'){
        this.getAllReporting();
      }
    })
  }

  addOtherWaiver(otherWaiver:any){
    this.dialog.open(OtherWaiverModelComponent,{
      width:'60%',
      data:{otherWaiver}
    }).afterClosed().subscribe(val=>{
      if(val=='Add'){
        this.getAllReporting();
      }
    })
  }

}
