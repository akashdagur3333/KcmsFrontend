import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HrMeetingModelComponent } from 'src/app/Model/hr-meeting-model/hr-meeting-model.component';
import { MeetingService } from 'src/app/services/meeting.service';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-refunds1',
  templateUrl: './refunds1.component.html',
  styleUrls: ['./refunds1.component.css']
})
export class Refunds1Component implements OnInit{
  res:any;
  displayedColumns: string[] = ['id','rfp_id','rfd_id','rpt_id','payment_to','payment_type','amount','payment_mode','bank_ledger','booking_year','payment_date','txn_id','director_remarks','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getAllPayment();
  }
  constructor(private dialog:MatDialog,private api:ReportingService){}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

              getAllPayment(){
                this.api.getAllRefundPayment().subscribe({
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
    // this.dialog.open(DirectorMeetingModelComponent,{
    //   width:'50%'
    // }).afterClosed().subscribe(val=>{
    //   if(val=='Add'){
    //     this.getAllDirectorMeeting();
    //   }
    // })
  }


  editMeeting(data:any){
    // this.dialog.open(HrMeetingModelComponent,{
    //   width:'30%',
    //   data
    // }).afterClosed().subscribe(val=>{
    //   if(val=='Update'){
    //     this.getAllDirectorMeeting();
    //   }
    // })
  }

  deleteMeeting(id:any){
    // this.api.deleteDirectorMeeting(id).subscribe({
    //   next:(res)=>{
    //     Swal.fire(
    //       'Good job!',
    //       'Director Meeting Deleted Successfully',
    //       'success'
    //     )
    //     this.getAllDirectorMeeting();
    //   },
    //   error:(err)=>{
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: 'Something went wrong!',
    //       footer: err
    //     })
    //   }
    // })
  }
}

