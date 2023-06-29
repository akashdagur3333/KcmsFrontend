import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VsrValueModelComponent } from 'src/app/Model/vsr-value-model/vsr-value-model.component';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-vsr-value',
  templateUrl: './vsr-value.component.html',
  styleUrls: ['./vsr-value.component.css']
})
export class VsrValueComponent implements OnInit{
  constructor(private api:SettingService,private dialog:MatDialog){}
  ngOnInit(): void {
    this.getAllVsr()
  }
    displayedColumns: string[] = ['id','vsr_value','action'];
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
      this.dialog.open(VsrValueModelComponent,{
        width:'50%'
      }).afterClosed().subscribe(val=>{
        if(val=='Add'){
          this.getAllVsr();
        }
      })
 }
 getAllVsr(){
  this.api.getAllVsrValue().subscribe({
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
editVsr(data:any){
  this.dialog.open(VsrValueModelComponent,{
    width:'30%',
    data:data
  }).afterClosed().subscribe(val=>{
    if(val=='Update'){
      this.getAllVsr();
    }
  })
}

deleteVsr(id:any){
  this.api.deleteVsrvalue(id).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'VSR Value Deleted Successfully',
        'success'
      )
      this.getAllVsr();
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


