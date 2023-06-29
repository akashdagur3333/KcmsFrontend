import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PackageModelComponent } from 'src/app/Model/package-model/package-model.component';
import { ShiftBreakModelComponent } from 'src/app/Model/shift-break-model/shift-break-model.component';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-shift-break',
  templateUrl: './shift-break.component.html',
  styleUrls: ['./shift-break.component.css']
})
export class ShiftBreakComponent implements OnInit{
  constructor(private api:SettingService,private dialog:MatDialog){}
  ngOnInit(): void {
    this.getAllShift();

  }
    displayedColumns: string[] = ['id','brk_id','shift_name','shift_start','shift_end','shift_description','break_title','break_duration','break_title2','break_duration2','break_title3','break_duration3','status','action'];
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
      this.dialog.open(ShiftBreakModelComponent,{
        width:'60%',
        height:'70%'
      }).afterClosed().subscribe(val=>{
        if(val=='Add'){
          this.getAllShift();
        }
      })
 }



 getAllShift(){
  this.api.getAllShift().subscribe({
    next:(res)=>{
      res.map((X:any)=>{
        if(X.status=='1'){
          X.status="Active"
        }
        else{
          X.status="InActive"
        }
      })
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

editShift(data:any){
  this.dialog.open(ShiftBreakModelComponent,{
    width:'60%',
    height:'70%',
    data:data
  }).afterClosed().subscribe(val=>{
    if(val=='Update'){
      this.getAllShift();
    }
  })
}

deleteShift(id:any){
  this.api.deleteShift(id).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'Shift Deleted Successfully',
        'success'
      )
      this.getAllShift();
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






