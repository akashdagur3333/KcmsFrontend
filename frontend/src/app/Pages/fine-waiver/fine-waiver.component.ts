import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fine-waiver',
  templateUrl: './fine-waiver.component.html',
  styleUrls: ['./fine-waiver.component.css']
})
export class FineWaiverComponent implements OnInit{


  ngOnInit(): void {
      this.getAllFineWaiver();
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

  
  getAllFineWaiver(){
    this.api.getAllFineWaiver().subscribe({
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

  deleteFineWaiver(id:any){
    this.api.deleteFineWaiver(id).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'FineWaiver Deleted Successfully',
          'success'
        )
        this.getAllFineWaiver()
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


