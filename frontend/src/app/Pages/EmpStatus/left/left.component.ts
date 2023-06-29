import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.css']
})
export class LeftComponent implements OnInit{
  date:any;
  data:any;
  failStatus:any=1
  displayedColumns: string[] = ['id','rpt_id','type','name','sex','reporting_date','reported_at','doj','pending_value','jobStatus'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getAllReporting();
    var show=document.getElementById('jobStatus');
    show?.removeAttribute('hidden')
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
  this.data= res.filter((x:any)=>
   {
    if(x.status==5 && x.left[0].failStatus==this.failStatus){
      x.status='Left'
      return x;
    }
   })
    this.dataSource = new MatTableDataSource(this.data);
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
  inPool:any;
   awaited:any;
   inTraining:any;
   trainingCompleted:any;
   jobStatus:any;
  getAllid(){
    this.inPool=document.getElementById('inPool');
    this.awaited=document.getElementById('awaited');
    this.inTraining=document.getElementById('inTraining');
    this.trainingCompleted=document.getElementById('trainingCompleted');
    this.jobStatus=document.getElementById('jobStatus');
  
  }
       showPool(){
        this.failStatus=4
        this.getAllReporting();
        this.getAllid();
         this.inPool?.removeAttribute('hidden')
         this.awaited?.setAttribute('hidden','');
         this.inTraining?.setAttribute('hidden','');
         this.trainingCompleted?.setAttribute('hidden','');
         this.jobStatus?.setAttribute('hidden','');
        }
        showJobStatus(){
          this.failStatus=1
          this.getAllReporting();
          this.getAllid();
          this.jobStatus?.removeAttribute('hidden')
          this.awaited?.setAttribute('hidden','');
          this.inTraining?.setAttribute('hidden','');
          this.trainingCompleted?.setAttribute('hidden','');
          this.inPool?.setAttribute('hidden','');
        }
        showAwaited(){
          this.failStatus=3
          this.getAllReporting();
          this.getAllid();
          this.awaited?.removeAttribute('hidden')
          this.inPool?.setAttribute('hidden','');
          this.inTraining?.setAttribute('hidden','');
          this.trainingCompleted?.setAttribute('hidden','');
          this.jobStatus?.setAttribute('hidden','');
         }
         showIntraining(){
          this.failStatus=5
          this.getAllReporting();
          this.getAllid();
          this.inTraining?.removeAttribute('hidden')
          this.awaited?.setAttribute('hidden','');
          this.inPool?.setAttribute('hidden','');
          this.trainingCompleted?.setAttribute('hidden','');
          this.jobStatus?.setAttribute('hidden','');
         }
         showTrainingCompleted(){
          this.failStatus=2
          this.getAllReporting();
          this.getAllid();
         this.trainingCompleted?.removeAttribute('hidden')
         this.awaited?.setAttribute('hidden','');
         this.inTraining?.setAttribute('hidden','');
         this.inPool?.setAttribute('hidden','');
         this.jobStatus?.setAttribute('hidden','');
         }

}

