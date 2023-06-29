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
  selector: 'app-in-pool',
  templateUrl: './in-pool.component.html',
  styleUrls: ['./in-pool.component.css']
})
export class InPoolComponent implements OnInit{
  res:any;
  displayedColumns: string[] = ['id','rpt_id','type','name','sex','reporting_date','reported_at','doj','pending_value','jobStatus','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getInPool();
  }
  constructor(private dialog:MatDialog,private api:ReportingService){}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

              getInPool(){
                this.api.getAllReporting().subscribe({
                  next:(res)=>{
                  var data= res.filter((x:any)=>{
                   if(x.pending_value==0 && x.status==1){
                    x.status='In Pool'
                    return x
                    }
                    })
                    this.res=data
                    this.dataSource = new MatTableDataSource(this.res);
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
                  fromPool(event:Event,data:any){
                    var value= (event.target as HTMLInputElement).value;
                    console.log(value,data)
                    if(value=='2'){
                    this.dialog.open(AddIntrainingModelComponent,{
                    width:'60%',
                    height:'70%',
                    data:data
                    }).afterClosed().subscribe(val=>{
                      if(val=='Update'){
                        this.getInPool();
                      }
                    })
                    }
                    else if(value=='5'){
                      this.dialog.open(AddLeftModelComponent,{
                        width:'60%',
                        height:'60%',
                        data:{inpool:data}
                        }).afterClosed().subscribe(val=>{
                          if(val=='Update'){
                            this.getInPool();
                          }
                        })
                    }
                  } 

}

