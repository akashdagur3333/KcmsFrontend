import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AttandanceDataModelComponent } from 'src/app/Model/attandance-data-model/attandance-data-model.component';
import { AttendenceTableDetailComponent } from 'src/app/Model/attendence-table-detail/attendence-table-detail.component';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-system-attendence',
  templateUrl: './system-attendence.component.html',
  styleUrls: ['./system-attendence.component.css']
})
export class SystemAttendenceComponent implements OnInit{
  date:any;
  data:any
  displayedColumns: string[] = ['id','rpt_id','type','name','sex','reporting_date','reported_at','doj','pending_value','jobStatus','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getAllReporting();
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
  var data= res.filter((x:any)=>
   {
    if(x.status==4){
      x.status='Joined'
      return x;
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
  openCalender(data:any){
this.dialog.open(AttandanceDataModelComponent,{
  width:'60%',
  height:'70%',
  data
})
  }

  openAttendenceDetail(data:any){
   this.dialog.open(AttendenceTableDetailComponent,{
    width:'50%',
    height:'70%',
    data
   })
  }

}




