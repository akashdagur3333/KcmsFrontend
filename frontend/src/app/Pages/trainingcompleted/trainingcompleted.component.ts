import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddIntrainingModelComponent } from 'src/app/Model/add-intraining-model/add-intraining-model.component';
import { AddJoinedModelComponent } from 'src/app/Model/add-joined-model/add-joined-model.component';
import { AddLeftModelComponent } from 'src/app/Model/add-left-model/add-left-model.component';
import { AddTrainingCompleteModelComponent } from 'src/app/Model/add-training-complete-model/add-training-complete-model.component';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-trainingcompleted',
  templateUrl: './trainingcompleted.component.html',
  styleUrls: ['./trainingcompleted.component.css']
})
export class TrainingcompletedComponent implements OnInit{
  res:any;
  displayedColumns: string[] = ['id','rpt_id','type','name','sex','reporting_date','reported_at','doj','pending_value','jobStatus'];
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
        if(x.pending_value==0 && x.status==3){
          x.status='Training Completed'
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
                    if(value=='4'){
                    this.dialog.open(AddJoinedModelComponent,{
                    width:'60%',
                    data:data
                    }).afterClosed().subscribe(val=>{
                      if(val=='Update'){
                        this.getAllReporting();
                      }
                    })
                    }
                    else if(value=='5'){
                      this.dialog.open(AddLeftModelComponent,{
                        width:'60%',
                        height:'70%',
                        data:{trainingComplete:data}
                        }).afterClosed().subscribe(val=>{
                          if(val=='Update'){
                            this.getAllReporting();
                          }
                        })
                  } 

}
}
