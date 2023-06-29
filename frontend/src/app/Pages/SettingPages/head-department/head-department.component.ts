import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HeaddepartmentModelComponent } from 'src/app/Model/headdepartment-model/headdepartment-model.component';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-head-department',
  templateUrl: './head-department.component.html',
  styleUrls: ['./head-department.component.css']
})
export class HeadDepartmentComponent implements OnInit{
  constructor(private api:SettingService,private dialog:MatDialog){}
  ngOnInit(): void {
    this.getAllDepartment()
  }
    displayedColumns: string[] = ['id','name','action'];
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
  this.dialog.open(HeaddepartmentModelComponent,{
    width:'30%'
  }).afterClosed().subscribe(val=>{
    if(val=='Add'){
      this.getAllDepartment();
    }
  })
 }
     getAllDepartment(){
      this.api.getAllDepartment().subscribe({
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
    editDepartment(data:any){
      this.dialog.open(HeaddepartmentModelComponent,{
        width:'30%',
        data:data
      }).afterClosed().subscribe(val=>{
        if(val=='Update'){
          this.getAllDepartment();
        }
      })
    }

    deleteDepartment(id:any){
      this.api.deleteDepartment(id).subscribe({
        next:(res)=>{
          Swal.fire(
            'Good job!',
            'Department Deleted Successfully',
            'success'
          )
          this.getAllDepartment();
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

