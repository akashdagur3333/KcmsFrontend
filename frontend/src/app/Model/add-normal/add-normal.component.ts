import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';
import { TeammemberModelComponent } from '../teammember-model/teammember-model.component';
import { AddNormalUserModelComponent } from '../add-normal-user-model/add-normal-user-model.component';

@Component({
  selector: 'app-add-normal',
  templateUrl: './add-normal.component.html',
  styleUrls: ['./add-normal.component.css']
})
export class AddNormalComponent implements OnInit{

  token:any;
  displayedColumns: string[] = ['id','rpt_id','type','name','sex','trn_start','trn_end','doj','job_status','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private api:ReportingService,private dialog1:MatDialogRef<AddNormalComponent>){}
  ngOnInit(): void {
this.getAllJoined()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  getAllJoined() {
    this.api.getAllReporting().subscribe({
      next: (res) => {
        var data = res.filter((x: any) => {
          if (x.pending_value == 0 && x.status == 4) {
            x.status = 'Joined'
            return x
          }
        })
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
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
  AddUser(data:any){
  this.dialog.open(AddNormalUserModelComponent,{
    width:'50%',
    height:'80%',
    data
  })
  .afterClosed().subscribe(val=>{
    if(val=='Add'){
      this.dialog1.close('Add');
    }
  })
}


}

