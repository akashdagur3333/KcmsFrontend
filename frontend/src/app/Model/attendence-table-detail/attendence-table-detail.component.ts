import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';
import { TeammemberModelComponent } from '../teammember-model/teammember-model.component';
import { LoginStatusService } from 'src/app/services/login-status.service';
import { AllRecordsAttendenceModelComponent } from '../all-records-attendence-model/all-records-attendence-model.component';
@Component({
  selector: 'app-attendence-table-detail',
  templateUrl: './attendence-table-detail.component.html',
  styleUrls: ['./attendence-table-detail.component.css']
})
export class AttendenceTableDetailComponent implements OnInit{

  token:any;
  displayedColumns: string[] = ['id','_id','rpt_id','name','date','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api:LoginStatusService,@Inject(MAT_DIALOG_DATA) private Data:any,private dialog:MatDialog){}
    ngOnInit(): void {
this.getAllLoginStatus()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getAllLoginStatus(){
    this.api.getPersonalStatus(this.Data._id).subscribe({
      next:(res)=>{
       res.reverse()
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
  
      }
      ,error:(err)=>{
        console.log(err)
      }
    })
  
    // this.Events.push({
    //   title:'mohit',
    //   date:'2023-06-16'
    // })
  
  }

  AllRecords(data:any){
  this.dialog.open(AllRecordsAttendenceModelComponent,{
    width:'50%',
    height:'70%',
    data
  })
  }


}

