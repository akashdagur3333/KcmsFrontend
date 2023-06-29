import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddIntrainingModelComponent } from 'src/app/Model/add-intraining-model/add-intraining-model.component';
import { AddLeftModelComponent } from 'src/app/Model/add-left-model/add-left-model.component';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-awaited-status',
  templateUrl: './awaited-status.component.html',
  styleUrls: ['./awaited-status.component.css']
})
export class AwaitedStatusComponent implements OnInit{
  res:any;
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
        if(x.status==1 && x.pending_value>0){
          x.status='Awaited'
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
                  fromPool(event:Event,data:any){
                    var value= (event.target as HTMLInputElement).value;
                    console.log(value,data)
                    if(value=='5'){
                    this.dialog.open(AddLeftModelComponent,{
                    width:'60%',
                    height:'60%',
                    data:{awaited:data}
                    }).afterClosed().subscribe(val=>{
                      if(val=='Update'){
                        this.getAllReporting();
                      }
                    })
                    }
                  } 

}

