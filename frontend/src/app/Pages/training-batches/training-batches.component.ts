import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { TrainingModelComponent } from 'src/app/Model/training-model/training-model.component';
import { BatchesService } from 'src/app/services/batches.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-training-batches',
  templateUrl: './training-batches.component.html',
  styleUrls: ['./training-batches.component.css']
})
export class TrainingBatchesComponent implements OnInit{
  date:any
  displayedColumns: string[] = ['id','batch_id','batch_name','batch_location','batch_start','batch_size','occupied_seat','aviable_seat','batch_type','batch_trainer','view','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getallBatches()
  }
AllBatches:any;
  constructor(private dialog:MatDialog,private api:BatchesService){}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  OpenModel(){
    this.dialog.open(TrainingModelComponent,{
      width:'50%'
    }).afterClosed().subscribe(val=>{
      if(val=='Add'){
        this.getallBatches();
      }
    })
  }

getallBatches(){
  this.api.getAllBateches().subscribe({
    next:(res)=>{
      res.sort((x:any)=>{
        // this.date=x.batch_starting_date;
         this.date=moment(x.batch_starting_date).utc().format('YYYY-MM-DD');
      })
      res.reverse()
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
editBatches(data:any){
  this.dialog.open(TrainingModelComponent,{
    width:'50%',
    data:data
  }).afterClosed().subscribe(val=>{
    if(val=='Update'){
      this.getallBatches();
    }
  })
}
deleteBatches(id:any){
  this.api.deleteBatches(id).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'Batch Deleted Successfully',
        'success'
      )
      this.getallBatches();
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
