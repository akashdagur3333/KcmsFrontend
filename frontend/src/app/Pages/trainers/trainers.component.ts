import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BatchSizeModelComponent } from 'src/app/Model/batch-size-model/batch-size-model.component';
import { TrainersModelComponent } from 'src/app/Model/trainers-model/trainers-model.component';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit{
  constructor(private api:SettingService,private dialog:MatDialog){}
  ngOnInit(): void {
      this.getAllTrainer();
  }
    displayedColumns: string[] = ['id','trainer_name','action'];
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
      this.dialog.open(TrainersModelComponent,{
        width:'30%',
      }).afterClosed().subscribe(val=>{
        if(val=='Add'){
          this.getAllTrainer();
        }
      })
    }

    getAllTrainer(){
      this.api.getAllTrainer().subscribe({
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

    editTrainer(data:any){
      this.dialog.open(TrainersModelComponent,{
        width:'30%',
        data:data
      }).afterClosed().subscribe(val=>{
        if(val=='Update'){
          this.getAllTrainer();
        }
      })
    }

    deleteTrainer(id:any){
   this.api.deleteTrainer(id).subscribe({
        next:(res)=>{
          Swal.fire(
            'Good job!',
            'Trainer Deleted Successfully',
            'success'
          )
          this.getAllTrainer();
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
