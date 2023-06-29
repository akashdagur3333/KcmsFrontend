import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddIntrainingModelComponent } from 'src/app/Model/add-intraining-model/add-intraining-model.component';
import { AddLeftModelComponent } from 'src/app/Model/add-left-model/add-left-model.component';
import { HrActivityModelComponent } from 'src/app/Model/hr-activity-model/hr-activity-model.component';
import { HrMeetingModelComponent } from 'src/app/Model/hr-meeting-model/hr-meeting-model.component';
import { MeetingService } from 'src/app/services/meeting.service';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hr-meeting',
  templateUrl: './hr-meeting.component.html',
  styleUrls: ['./hr-meeting.component.css']
})
export class HrMeetingComponent implements OnInit{
  res:any;
  displayedColumns: string[] = ['id','hra_id','assign_to','invite_to','shift','start_time','end_time','location','name','description','hr_remarks','submit_by','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getAllHrMeeting();
  }
  constructor(private dialog:MatDialog,private api:MeetingService){}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

              getAllHrMeeting(){
                this.api.getAllHrMeeting().subscribe({
                  next:(res)=>{
                    res.sort().reverse();
                    this.dataSource = new MatTableDataSource(res);
                    this.dataSource.paginator= this.paginator;
                    this.dataSource.sort =this.sort;
                  },
                  error:(err)=>{
                    console.log(err)
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Something went wrong!',
                      footer: err
                    })
                  }
                })
                  }
         
                  
  OpenModel(){
    this.dialog.open(HrMeetingModelComponent,{
      width:'50%'
    }).afterClosed().subscribe(val=>{
      if(val=='Add'){
        this.getAllHrMeeting();
      }
    })
  }


  editActivity(data:any){
    this.dialog.open(HrMeetingModelComponent,{
      width:'30%',
      data
    }).afterClosed().subscribe(val=>{
      if(val=='Update'){
        this.getAllHrMeeting();
      }
    })
  }

  deleteActivity(id:any){
    this.api.deleteHrMeeting(id).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'HR Meeting Deleted Successfully',
          'success'
        )
        this.getAllHrMeeting();
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
}



