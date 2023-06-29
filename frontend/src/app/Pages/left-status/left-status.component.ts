import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddIntrainingModelComponent } from 'src/app/Model/add-intraining-model/add-intraining-model.component';
import { AddLeftModelComponent } from 'src/app/Model/add-left-model/add-left-model.component';
import { RelievingModelComponent } from 'src/app/Model/relieving-model/relieving-model.component';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-left-status',
  templateUrl: './left-status.component.html',
  styleUrls: ['./left-status.component.css']
})
export class LeftStatusComponent implements OnInit{
  res:any;
  displayedColumns: string[] = ['id','rpt_id','trn_id','emp_id','type','name','sex','trn_start','trn_end','doj','dos','pending_value','jobStatus','action'];
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
                   if(x.status==5){
                    x.status='Left'
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
                     if(value=='Relieving'){
                    this.dialog.open(RelievingModelComponent,{
                      width:'60%',
                      height:'60%',
                      data:{add:data}
                    })
                     }
                  
                  } 

}


