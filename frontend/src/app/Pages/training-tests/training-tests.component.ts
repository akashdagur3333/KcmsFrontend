import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FineModelComponent } from 'src/app/Model/fine-model/fine-model.component';
import { FineWaiverModelComponent } from 'src/app/Model/fine-waiver-model/fine-waiver-model.component';
import { QuestionModelComponent } from 'src/app/Model/question-model/question-model.component';
import { RecieptModelComponent } from 'src/app/Model/reciept-model/reciept-model.component';
import { ReportingModelComponent } from 'src/app/Model/reporting-model/reporting-model.component';
import { TrainingTestModelComponent } from 'src/app/Model/training-test-model/training-test-model.component';
import { VSRWaiverModelComponent } from 'src/app/Model/vsrwaiver-model/vsrwaiver-model.component';
import { QuesrionService } from 'src/app/services/quesrion.service';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-training-tests',
  templateUrl: './training-tests.component.html',
  styleUrls: ['./training-tests.component.css']
})
export class TrainingTestsComponent implements OnInit{
  date:any
  res:any;
  displayedColumns: string[] = ['id','tst_id','test_name','test_start','test_end','test_date','test_status','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getAllTest();
  }
  constructor(private dialog:MatDialog,private api:QuesrionService){}

  OpenModel(){
    this.dialog.open(TrainingTestModelComponent,{
      width:'60%',
      height:'80%'
    }).afterClosed().subscribe(val=>{
      if(val=='Add'){
         this.getAllTest();
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllTest(){
  this.api.getAllTest().subscribe({
  next:(res)=>{
    this.dataSource = new MatTableDataSource(res);
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


  editTest(data:any){
    this.dialog.open(TrainingTestModelComponent,{
      width:'60%',
      height:'80%',
      data:{data}
    }).afterClosed().subscribe(val=>{
      if(val=='Update'){
        this.getAllTest();
      }
    })
  }
  

  deleteTest(id:any){
    this.api.deleteTest(id).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'Test Deleted Successfully',
          'success'
        )
this.getAllTest();      },
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

