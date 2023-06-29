import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fine',
  templateUrl: './fine.component.html',
  styleUrls: ['./fine.component.css']
})
export class FineComponent implements OnInit{


  ngOnInit(): void {
      this.getAllFine();
  }
  displayedColumns: string[] = ['id','rpt_id','name','father_name','imposed_date','amount','imposed_by','remarks','gst_amount','action'];
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

  
  getAllFine(){
    this.api.getAllFine().subscribe({
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

  deleteFine(id:any){
    this.api.deleteFine(id).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'Fine Deleted Successfully',
          'success'
        )
        this.getAllFine()
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

