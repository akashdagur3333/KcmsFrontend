import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HrMeetingModelComponent } from 'src/app/Model/hr-meeting-model/hr-meeting-model.component';
import { RefundPaymentModelComponent } from 'src/app/Model/refund-payment-model/refund-payment-model.component';
import { Refund1ModelComponent } from 'src/app/Model/refund1-model/refund1-model.component';
import { Refund2ModelComponent } from 'src/app/Model/refund2-model/refund2-model.component';
import { Refund3ModelComponent } from 'src/app/Model/refund3-model/refund3-model.component';
import { MeetingService } from 'src/app/services/meeting.service';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.component.html',
  styleUrls: ['./refunds.component.css']
})
export class RefundsComponent implements OnInit{
  res:any;
  displayedColumns: string[] = ['id','rfd_id','rpt_id','emp_type','offer_letter_no','name','father_name','sex','aadhar_number','reporting_date','total_value','paid_value','pending_value','refund_value','state_reason','which_policy','submit_by','director_consent','approx_date','remarks','add','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getAllRefund();
  }
  constructor(private dialog:MatDialog,private api:ReportingService){}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

              getAllRefund(){
                this.api.getAllRefund().subscribe({
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
    this.dialog.open(Refund1ModelComponent,{
      width:'60%',
      height:'80%'
    }).afterClosed().subscribe(val=>{
      if(val=='Add'){
        this.getAllRefund();
      }
    })
  }


  editRefund(data:any){
    // this.dialog.open(HrMeetingModelComponent,{
    //   width:'30%',
    //   data
    // }).afterClosed().subscribe(val=>{
    //   if(val=='Update'){
    //     this.getAllDirectorMeeting();
    //   }
    // })
  }

  deleteRefund(id:any){
    this.api.deleteRefund(id).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'Refund Deleted Successfully',
          'success'
        )
        this.getAllRefund();
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

  addAuthority(data:any){
    this.dialog.open(Refund3ModelComponent,{
   width:'60%',
   height:'70%',
   data:{edit:data}
    }).afterClosed().subscribe(val=>{
      if(val=='Update'){
        this.getAllRefund();
      }
    })
  }
  addPayment(data:any){
    this.dialog.open(RefundPaymentModelComponent,{
      width:'60%',
      height:'70%',
      data
       }).afterClosed().subscribe(val=>{
         if(val=='Add'){
           this.getAllRefund();
         }
       })
  }
}





