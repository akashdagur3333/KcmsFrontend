import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LocationModelComponent } from 'src/app/Model/location-model/location-model.component';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit{
  constructor(private api:SettingService,private dialog:MatDialog){}
  ngOnInit(): void {
      this.getAllLocations();
  }
    displayedColumns: string[] = ['id','office_code','location','address','action'];
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



    getAllLocations(){
      this.api.getAllLocation().subscribe({
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
 
  
   

  

     
    editLocation(data:any){
      this.dialog.open(LocationModelComponent,{
        width:'30%',
        data:data
      }).afterClosed().subscribe(val=>{
        if(val=='Update'){
          this.getAllLocations();
        }
      })
    }
  
    deleteLocation(id:any){
      this.api.deleteLocation(id).subscribe({
        next:(res)=>{
          Swal.fire(
            'Good job!',
            'Location Deleted Successfully',
            'success'
          )
          this.getAllLocations();
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

 openDialog(){
  this.dialog.open(LocationModelComponent,{
    width:'30%'
  }).afterClosed().subscribe(val=>{
    if(val=='Add'){
      this.getAllLocations();
    }
  })
 }


 viewBatchSize(){
  var x=document.getElementById("batchSize");
x?.removeAttribute('hidden');
 }

 viewTrainer(){
  var x=document.getElementById("trainer");
  x?.removeAttribute('hidden');
 }
}

