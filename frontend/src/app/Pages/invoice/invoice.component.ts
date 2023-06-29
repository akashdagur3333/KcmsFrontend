import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jwtDecode from 'jwt-decode';
import { AddOrderComponent } from 'src/app/Model/add-order/add-order.component';
import { AddProjectComponent } from 'src/app/Model/add-project/add-project.component';
import { ClientModelComponent } from 'src/app/Model/client-model/client-model.component';
import { ViewInvoiceComponent } from 'src/app/Model/view-invoice/view-invoice.component';
import { ClientManagementService } from 'src/app/services/client-management.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit{

  token:any;
  displayedColumns: string[] = ['id','inv_id','ord_id','clt_id','client_name','client_type','prt_id','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private api:ClientManagementService){}
  ngOnInit(): void {
this.getAllInvoice()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  getAllInvoice(){
    this.api.getAllInvoice().subscribe({
      next:(res)=>{
     
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator= this.paginator;
        this.dataSource.sort =this.sort;
      },
      error:(err)=>{
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: err
        })
      }
    })
      }
OpenModel(){
  this.dialog.open(ClientModelComponent,{
    width:'50%',
    height:'80%'
  }).afterClosed().subscribe(val=>{
    if(val=='Add'){
      this.getAllInvoice();
    }
  })
}


viewInvoice(data:any){
  this.dialog.open(ViewInvoiceComponent,{
    width:'60%',
    data
  })

}

deleteInvoice(id:any){
  this.api.deleteInvoice(id).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'Invoice Deleted Successfully',
        'success'
      )
      this.getAllInvoice();
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
