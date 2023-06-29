import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StreamModelComponent } from 'src/app/Model/stream-model/stream-model.component';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit{
  constructor(private api:SettingService,private dialog:MatDialog){}
  ngOnInit(): void {
    this.getAllStream();

  }
    displayedColumns: string[] = ['id','qualification','stream','action'];
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
      this.dialog.open(StreamModelComponent,{
        width:'30%'
      }).afterClosed().subscribe(val=>{
        if(val=='Add'){
          this.getAllStream();
        }
      })
 }



 getAllStream(){
  this.api.getAllStream().subscribe({
    next:(res)=>{
      res.reverse();
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort =this.sort;    },
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

editStream(data:any){
  this.dialog.open(StreamModelComponent,{
    width:'30%',
    data:data
  }).afterClosed().subscribe(val=>{
    if(val=='Update'){
      this.getAllStream();
    }
  })
}

deleteStream(id:any){
  this.api.deleteStream(id).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'Stream Deleted Successfully',
        'success'
      )
      this.getAllStream();
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





