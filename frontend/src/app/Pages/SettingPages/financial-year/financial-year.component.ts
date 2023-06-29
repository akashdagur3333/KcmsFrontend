import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FinancialModelComponent } from 'src/app/Model/financial-model/financial-model.component';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-financial-year',
  templateUrl: './financial-year.component.html',
  styleUrls: ['./financial-year.component.css']
})
export class FinancialYearComponent implements OnInit{
  constructor(private api:SettingService,private dialog:MatDialog){}

  ngOnInit(): void {
    this.getAllfinancial()
  }
    displayedColumns: string[] = ['id','financial_year','status','action'];
    dataSource!: MatTableDataSource<any>;
  

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
  
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    openDialog(){
      this.dialog.open(FinancialModelComponent,{
        width:'30%'
      }).afterClosed().subscribe(val=>{
        if(val=='Add'){
          this.getAllfinancial();
        }
      })
     }

    getAllfinancial(){
      this.api.getAllFinancial().subscribe({
        next:(res)=>{
          res.reverse();
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

    editFinancial(data:any){
      this.dialog.open(FinancialModelComponent,{
        width:'30%',
        data:data
      }).afterClosed().subscribe(val=>{
        if(val=='Update'){
          this.getAllfinancial();
        }
      })
    }

    deleteFinancial(id:any){
      this.api.deleteFinancial(id).subscribe({
        next:(res)=>{
          Swal.fire(
            'Good job!',
            'Financial Deleted Successfully',
            'success'
          )
          this.getAllfinancial();
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

