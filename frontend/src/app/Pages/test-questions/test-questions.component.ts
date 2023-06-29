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
import { VSRWaiverModelComponent } from 'src/app/Model/vsrwaiver-model/vsrwaiver-model.component';
import { QuesrionService } from 'src/app/services/quesrion.service';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-test-questions',
  templateUrl: './test-questions.component.html',
  styleUrls: ['./test-questions.component.css']
})
export class TestQuestionsComponent implements OnInit{
  date:any
  res:any;
  displayedColumns: string[] = ['id','qst_id','name','title','type','ques1','ques2','ques3','ques4','ans','status','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
r: any;
  ngOnInit(): void {
    this.getAllQuestion();
  }
  constructor(private dialog:MatDialog,private api:QuesrionService){}

  OpenModel(){
    this.dialog.open(QuestionModelComponent,{
      width:'60%',
      height:'80%'
    }).afterClosed().subscribe(val=>{
      if(val=='Add'){
         this.getAllQuestion();
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

  getAllQuestion(){
this.api.getAllQuestion().subscribe({
  next:(res)=>{
    res.map((x:any)=>{
      var question= x.question.split("\n");
      x.question=question
        })
        this.res=res;
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator= this.paginator;
    this.dataSource.sort =this.sort;
    console.log(res)
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


  

  deleteQuestion(id:any){
    this.api.deleteQuestion(id).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'Reporting Deleted Successfully',
          'success'
        )
this.getAllQuestion();      },
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
