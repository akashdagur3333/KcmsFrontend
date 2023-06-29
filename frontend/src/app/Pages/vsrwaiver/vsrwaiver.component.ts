import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vsrwaiver',
  templateUrl: './vsrwaiver.component.html',
  styleUrls: ['./vsrwaiver.component.css']
})
export class VSRWaiverComponent implements OnInit{


  ngOnInit(): void {
      this.getAllVsrWaiver();
  }
  displayedColumns: string[] = ['id','rpt_id','name','father_name','amount','remarks','gst_amount','waived_by','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api:ReportingService){}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  getAllVsrWaiver(){
    this.api.getAllVSRWaiver().subscribe({
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

  deleteVsrWaiver(id:any){
    this.api.deleteVSRWaiver(id).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'VSRWaiver Deleted Successfully',
          'success'
        )
        this.getAllVsrWaiver()
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


