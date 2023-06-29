import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';
import { TeammemberModelComponent } from '../teammember-model/teammember-model.component';
import { LoginStatusService } from 'src/app/services/login-status.service';
@Component({
  selector: 'app-all-records-attendence-model',
  templateUrl: './all-records-attendence-model.component.html',
  styleUrls: ['./all-records-attendence-model.component.css']
})
export class AllRecordsAttendenceModelComponent implements OnInit{

  token:any;
  displayedColumns: string[] = ['id','date','loginTime','ipAddress','lastActive','totalActive','logout'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api:LoginStatusService,@Inject(MAT_DIALOG_DATA) private Data:any,private dialog:MatDialog){}
  AllData:any=[];
    ngOnInit(): void {
      this.AllData=[]
    this.AllData.push(this.Data)
    console.log(this.AllData)
      this.dataSource = new MatTableDataSource(this.AllData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
 
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }






}


