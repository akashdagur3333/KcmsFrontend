import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BatchSizeModelComponent } from 'src/app/Model/batch-size-model/batch-size-model.component';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-batch-size',
  templateUrl: './batch-size.component.html',
  styleUrls: ['./batch-size.component.css']
})
export class BatchSizeComponent implements OnInit{
  constructor(private api:SettingService,private dialog:MatDialog){}
  ngOnInit(): void {
      this.getAllBatchSize();
  }
    displayedColumns: string[] = ['id','batch_size','action'];
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
      this.dialog.open(BatchSizeModelComponent,{
        width:'30%',
      }).afterClosed().subscribe(val=>{
        if(val=='Add'){
          this.getAllBatchSize();
        }
      })
    }

    getAllBatchSize(){
      this.api.getAllBatchSize().subscribe({
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

    editBatchSize(data:any){
      this.dialog.open(BatchSizeModelComponent,{
        width:'30%',
        data:data
      }).afterClosed().subscribe(val=>{
        if(val=='Update'){
          this.getAllBatchSize();
        }
      })
    }

    deleteBatchSize(id:any){
   this.api.deleteBatchSize(id).subscribe({
        next:(res)=>{
          Swal.fire(
            'Good job!',
            'Batch Size Deleted Successfully',
            'success'
          )
          this.getAllBatchSize();
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
