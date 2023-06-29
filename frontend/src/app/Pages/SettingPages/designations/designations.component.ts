import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DesignationModelComponent } from 'src/app/Model/designation-model/designation-model.component';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.css']
})
export class DesignationsComponent implements OnInit{
  constructor(private api:SettingService,private dialog:MatDialog){}
  ngOnInit(): void {
    this.getAllDesignation();
  }
    displayedColumns: string[] = ['id','head_department','designation','action'];
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
      this.dialog.open(DesignationModelComponent,{
        width:'30%'
      }).afterClosed().subscribe(val=>{
        if(val=='Add'){
          this.getAllDesignation();
        }
      })
 }
 getAllDesignation(){
  this.api.getAllDesignation().subscribe({
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

deleteDesignation(id:any){
  this.api.deleteDesignation(id).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'Designation Deleted Successfully',
        'success'
      )
      this.getAllDesignation();
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

editDesignation(data:any){
  this.dialog.open(DesignationModelComponent,{
    width:'30%',
    data:data
  }).afterClosed().subscribe(val=>{
    if(val=='Update'){
      this.getAllDesignation();
    }
  })
}

}



