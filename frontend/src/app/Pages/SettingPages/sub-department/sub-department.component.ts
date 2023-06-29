import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SubdepartmentModelComponent } from 'src/app/Model/subdepartment-model/subdepartment-model.component';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sub-department',
  templateUrl: './sub-department.component.html',
  styleUrls: ['./sub-department.component.css']
})
export class SubDepartmentComponent implements OnInit{
  constructor(private api:SettingService,private dialog:MatDialog){}
  ngOnInit(): void {
    this.getAllSubDepartment();
  }
    displayedColumns: string[] = ['id','head_department','sub_department','action'];
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
      this.dialog.open(SubdepartmentModelComponent,{
        width:'30%'
      }).afterClosed().subscribe(val=>{
        if(val=='Add'){
          this.getAllSubDepartment();
        }
      })
 }
 getAllSubDepartment(){
  this.api.getAllSubdepartment().subscribe({
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
editSubDepartment(data:any){
  this.dialog.open(SubdepartmentModelComponent,{
    width:'30%',
    data:data
  }).afterClosed().subscribe(val=>{
    if(val=='Update'){
      this.getAllSubDepartment();
    }
  })
}

deleteSubDepartment(id:any){
  this.api.deleteSubdepartment(id).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'Sub Department Deleted Successfully',
        'success'
      )
      this.getAllSubDepartment();
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


