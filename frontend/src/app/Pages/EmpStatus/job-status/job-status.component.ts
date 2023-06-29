import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-status',
  templateUrl: './job-status.component.html',
  styleUrls: ['./job-status.component.css']
})
export class JobStatusComponent implements OnInit{

  date:any;
  data:any;
  allWaited:any;
  allIntraining:any;
  allCompletetraining:any;
  allJoined:any;
  allLeft:any;
  displayedColumns: string[] = ['id','rpt_id','type','name','sex','reporting_date','reported_at','doj','pending_value','jobStatus','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getAwaited();
    this.getInTraining();
    this.getCompleteTraining();
    this.getJoined();
    this.getLeft();
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
   res.filter((x:any)=>{
      if(x.status==1 && x.pending_value>0){
        x.status='Awaited';
      }
      else if(x.status==1 && x.pending_value==0){
        x.status='In Pool'
      }
      else if(x.status==2 && x.pending_value==0){
        x.status='In Training'
      }
      else if(x.status==3 && x.pending_value==0){
        x.status='Training Completed'
      }
      else if(x.status==4 && x.pending_value==0){
        x.status='Joined'
      }
      else{
        x.status='Left'
      }
    })
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


  editReporting(data:any){
    // this.dialog.open(ReportingModelComponent,{
    //   width:'60%',
    //   height:'70%',
    //   data:data
    // }).afterClosed().subscribe(val=>{
    //   if(val=='Update'){
    //     this.getAllReporting();
    //   }
    // })
  }

  deleteReporting(id:any){
    // this.api.deleteReporting(id).subscribe({
    //   next:(res)=>{
    //     Swal.fire(
    //       'Good job!',
    //       'Reporting Deleted Successfully',
    //       'success'
    //     )
    //     this.getAllReporting();
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

  getAwaited(){
    this.api.getAllReporting().subscribe({
      next:(res)=>{
        this.allWaited= res.filter((x:any)=>
       {
        if(x.status==1 && x.pending_value>0){
          x.status='Awaited'
          return x;
        }
      
       })
       console.log(this.allWaited)
    
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

      getInTraining(){
        this.api.getAllReporting().subscribe({
          next:(res)=>{
            this.allIntraining= res.filter((x:any)=>
           {
            if(x.status==2){
              x.status='In Training'
              return x;
            }
          
           })
        
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
    
          getCompleteTraining(){
            this.api.getAllReporting().subscribe({
              next:(res)=>{
                this.allCompletetraining= res.filter((x:any)=>
               {
                if(x.status==3){
                  x.status='Complete Training'
                  return x;
                }
               })
            
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

              getJoined(){
                this.api.getAllReporting().subscribe({
                  next:(res)=>{
                    this.allJoined= res.filter((x:any)=>
                   {
                    if(x.status==4){
                      x.status='Joined'
                      return x;
                    }
                  
                   })
                
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
                  getLeft(){
                    this.api.getAllReporting().subscribe({
                      next:(res)=>{
                        this.allLeft= res.filter((x:any)=>
                       {
                        if(x.status==5){
                          x.status='Left'
                          return x;
                        }
                       })
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
                      joinedStatus:any;
                      leftStatus:any;
                      jobStatus:any;
                      relieving:any;
getAllid(){
  this.inPool=document.getElementById('inPool');
  this.awaited=document.getElementById('awaited');
  this.inTraining=document.getElementById('inTraining');
  this.trainingCompleted=document.getElementById('trainingCompleted');
  this.joinedStatus=document.getElementById('joinedStatus');
  this.leftStatus=document.getElementById('leftStatus');
  this.jobStatus=document.getElementById('jobStatus');
  this.relieving=document.getElementById('relieving');


}
     showPool(){
      this.getAllid();
       this.inPool?.removeAttribute('hidden')
       this.awaited?.setAttribute('hidden','');
       this.inTraining?.setAttribute('hidden','');
       this.trainingCompleted?.setAttribute('hidden','');
       this.joinedStatus?.setAttribute('hidden','');
       this.leftStatus?.setAttribute('hidden','');
       this.jobStatus?.setAttribute('hidden','');
       this.relieving?.setAttribute('hidden','')
      }
      showJobStatus(){
        this.getAllid();
        this.jobStatus?.removeAttribute('hidden')
        this.awaited?.setAttribute('hidden','');
        this.inTraining?.setAttribute('hidden','');
        this.trainingCompleted?.setAttribute('hidden','');
        this.joinedStatus?.setAttribute('hidden','');
        this.leftStatus?.setAttribute('hidden','');
        this.inPool?.setAttribute('hidden','');
        this.relieving?.setAttribute('hidden','')

      }
      showAwaited(){
        this.getAllid();
        this.awaited?.removeAttribute('hidden')
        this.inPool?.setAttribute('hidden','');
        this.inTraining?.setAttribute('hidden','');
        this.trainingCompleted?.setAttribute('hidden','');
        this.joinedStatus?.setAttribute('hidden','');
        this.leftStatus?.setAttribute('hidden','');
        this.jobStatus?.setAttribute('hidden','');
        this.relieving?.setAttribute('hidden','')

       }
       showIntraining(){
        this.getAllid();
        this.inTraining?.removeAttribute('hidden')
        this.awaited?.setAttribute('hidden','');
        this.inPool?.setAttribute('hidden','');
        this.trainingCompleted?.setAttribute('hidden','');
        this.joinedStatus?.setAttribute('hidden','');
        this.leftStatus?.setAttribute('hidden','');
        this.jobStatus?.setAttribute('hidden','');
        this.relieving?.setAttribute('hidden','')

       }
       showTrainingCompleted(){
        this.getAllid();
       this.trainingCompleted?.removeAttribute('hidden')
       this.awaited?.setAttribute('hidden','');
       this.inTraining?.setAttribute('hidden','');
       this.inPool?.setAttribute('hidden','');
       this.joinedStatus?.setAttribute('hidden','');
       this.leftStatus?.setAttribute('hidden','');
       this.jobStatus?.setAttribute('hidden','');
       this.relieving?.setAttribute('hidden','')

       }
       showJoined(){
        this.getAllid();
        this.joinedStatus?.removeAttribute('hidden')
        this.awaited?.setAttribute('hidden','');
        this.inTraining?.setAttribute('hidden','');
        this.trainingCompleted?.setAttribute('hidden','');
        this.inPool?.setAttribute('hidden','');
        this.leftStatus?.setAttribute('hidden','');
        this.jobStatus?.setAttribute('hidden','');
        this.relieving?.setAttribute('hidden','')

       }
       showLeft(){
        this.getAllid();
       this.leftStatus?.removeAttribute('hidden')
       this.awaited?.setAttribute('hidden','');
       this.inTraining?.setAttribute('hidden','');
       this.trainingCompleted?.setAttribute('hidden','');
       this.joinedStatus?.setAttribute('hidden','');
       this.inPool?.setAttribute('hidden','');
       this.jobStatus?.setAttribute('hidden','');
       this.relieving?.setAttribute('hidden','')
       }
       showRelieving(){
        this.getAllid();
        this.relieving?.removeAttribute('hidden')
       this.leftStatus?.setAttribute('hidden','')
       this.awaited?.setAttribute('hidden','');
       this.inTraining?.setAttribute('hidden','');
       this.trainingCompleted?.setAttribute('hidden','');
       this.joinedStatus?.setAttribute('hidden','');
       this.inPool?.setAttribute('hidden','');
       this.jobStatus?.setAttribute('hidden','');
       }

}

