import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PackageModelComponent } from 'src/app/Model/package-model/package-model.component';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit{
  constructor(private api:SettingService,private dialog:MatDialog){}
  ngOnInit(): void {
    this.getAllPackage();

  }
    displayedColumns: string[] = ['id','pkg_id','name','training_days','net_pay','ctc_after','action'];
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
      this.dialog.open(PackageModelComponent,{
        width:'60%',
        height:'70%'
      }).afterClosed().subscribe(val=>{
        if(val=='Add'){
          this.getAllPackage();
        }
      })
 }



 getAllPackage(){
  this.api.getAllPackage().subscribe({
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

editPackage(data:any){
  this.dialog.open(PackageModelComponent,{
    width:'60%',
    height:'70%',
    data:data
  }).afterClosed().subscribe(val=>{
    if(val=='Update'){
      this.getAllPackage();
    }
  })
}

deletePackage(id:any){
  this.api.deletePackage(id).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'Package Deleted Successfully',
        'success'
      )
      this.getAllPackage();
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





