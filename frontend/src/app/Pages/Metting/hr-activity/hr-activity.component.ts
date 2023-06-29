import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddIntrainingModelComponent } from 'src/app/Model/add-intraining-model/add-intraining-model.component';
import { AddLeftModelComponent } from 'src/app/Model/add-left-model/add-left-model.component';
import { HrActivityModelComponent } from 'src/app/Model/hr-activity-model/hr-activity-model.component';
import { MeetingService } from 'src/app/services/meeting.service';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hr-activity',
  templateUrl: './hr-activity.component.html',
  styleUrls: ['./hr-activity.component.css']
})
export class HrActivityComponent implements OnInit{
  res:any;
  displayedColumns: string[] = ['id','hra_id','assign_to','invite_to','shift','start_time','end_time','location','name','description','hr_remarks','submit_by','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getAllHrActivity();
  }
  constructor(private dialog:MatDialog,private api:MeetingService){}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

              getAllHrActivity(){
                this.api.getAllHrActivity().subscribe({
                  next:(res)=>{
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
                  // fromPool(event:Event,data:any){
                  //   var value= (event.target as HTMLInputElement).value;
                  //   console.log(value,data)
                  //   if(value=='2'){
                  //   this.dialog.open(AddIntrainingModelComponent,{
                  //   width:'60%',
                  //   height:'70%',
                  //   data:data
                  //   }).afterClosed().subscribe(val=>{
                  //     if(val=='Update'){
                  //       this.getInPool();
                  //     }
                  //   })
                  //   }
                  //   else if(value=='5'){
                  //     this.dialog.open(AddLeftModelComponent,{
                  //       width:'60%',
                  //       height:'60%',
                  //       data:{inpool:data}
                  //       }).afterClosed().subscribe(val=>{
                  //         if(val=='Update'){
                  //           this.getInPool();
                  //         }
                  //       })
                  //   }

                    
                  // } 


                  
  OpenModel(){
    this.dialog.open(HrActivityModelComponent,{
      width:'50%'
    }).afterClosed().subscribe(val=>{
      if(val=='Add'){
        this.getAllHrActivity();
      }
    })
  }


  editActivity(data:any){
    this.dialog.open(HrActivityModelComponent,{
      width:'30%',
      data
    }).afterClosed().subscribe(val=>{
      if(val=='Update'){
        this.getAllHrActivity();
      }
    })
  }

  deleteActivity(id:any){
    this.api.deleteHrActivity(id).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'HR Activity Deleted Successfully',
          'success'
        )
        this.getAllHrActivity();
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


