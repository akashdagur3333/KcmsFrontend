import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddIntrainingModelComponent } from 'src/app/Model/add-intraining-model/add-intraining-model.component';
import { AddLeftModelComponent } from 'src/app/Model/add-left-model/add-left-model.component';
import { RelievingModelComponent } from 'src/app/Model/relieving-model/relieving-model.component';
import { ReportingService } from 'src/app/services/reporting.service';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-relieving',
  templateUrl: './relieving.component.html',
  styleUrls: ['./relieving.component.css']
})
export class RelievingComponent implements OnInit{
  res:any;
  displayedColumns: string[] = ['id','name','father_name','aadhar_number','trn_id','training_start','training_completed','doj','seperation_date','emp_type','left_hr_remarks','rejoining','vsr_status','final_hr_remarks','created_by','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getAllRelieving();
  }
  constructor(private dialog:MatDialog,private api:SettingService){}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

              getAllRelieving(){
                this.api.getAllRelieving().subscribe({
                  next:(res)=>{
                  res.map((x:any)=>{
                    if(x.leftStatus==1){
                       x.leftStatus='Awaited'
                    }
                    else if(x.leftStatus==2){
                      x.leftStatus='In Pool'   
                    }
                    else if(x.leftStatus==3){
                      x.leftStatus='In Training'   
                    }
                    else if(x.leftStatus==4){
                      x.leftStatus='Training Complete'   
                    }
                    else if(x.leftStatus==5){
                      x.leftStatus='Joined'   
                    }
                  })

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
           
                  editRelieving(data:any){
                    this.dialog.open(RelievingModelComponent,{
                      width:'60%',
                      data:{edit:data}
                    }).afterClosed().subscribe(val=>{
                      if(val=='Update'){
                        this.getAllRelieving();
                      }
                    })
                  }

                  deleteRelieving(id:any){
                    this.api.deleteRelieving(id).subscribe({
                      next:(res)=>{
                        Swal.fire(
                          'Good job!',
                          'Relieving Deleted Successfully',
                          'success'
                        )
                        this.getAllRelieving();
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

