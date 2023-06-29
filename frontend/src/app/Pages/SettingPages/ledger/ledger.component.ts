import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LedgersModelComponent } from 'src/app/Model/ledgers-model/ledgers-model.component';
import { VsrValueModelComponent } from 'src/app/Model/vsr-value-model/vsr-value-model.component';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit{
  constructor(private api:SettingService,private dialog:MatDialog){}
  ngOnInit(): void {
    this.getAllLedger();
  }
    displayedColumns: string[] = ['id','ledger_name','action'];
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
      this.dialog.open(LedgersModelComponent,{
        width:'50%'
      }).afterClosed().subscribe(val=>{
        if(val=='Add'){
          this.getAllLedger();
        }
      })
 }
 getAllLedger(){
  this.api.getAllLedger().subscribe({
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
editLedger(data:any){
  this.dialog.open(LedgersModelComponent,{
    width:'30%',
    data:data
  }).afterClosed().subscribe(val=>{
    if(val=='Update'){
      this.getAllLedger();
    }
  })
}

deleteLedger(id:any){
  this.api.deleteLedger(id).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'Ledger Deleted Successfully',
        'success'
      )
      this.getAllLedger();
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



