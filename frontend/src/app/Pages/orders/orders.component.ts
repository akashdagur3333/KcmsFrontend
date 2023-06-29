import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jwtDecode from 'jwt-decode';
import { AddInvoiceComponent } from 'src/app/Model/add-invoice/add-invoice.component';
import { AddOrderComponent } from 'src/app/Model/add-order/add-order.component';
import { AddProjectComponent } from 'src/app/Model/add-project/add-project.component';
import { ClientModelComponent } from 'src/app/Model/client-model/client-model.component';
import { ClientManagementService } from 'src/app/services/client-management.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{

  token:any;
  displayedColumns: string[] = ['id','ord_id','cltId','clientType','clientName','prt_id','status','add','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private api:ClientManagementService){}
  ngOnInit(): void {
this.getAllOrder()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  getAllOrder(){
    this.api.getAllOrder().subscribe({
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
// OpenModel(){
//   this.dialog.open(ClientModelComponent,{
//     width:'50%',
//     height:'80%'
//   }).afterClosed().subscribe(val=>{
//     if(val=='Add'){
//       this.getAllClient();
//     }
//   })
// }


// editClient(data:any){
//   this.dialog.open(ClientModelComponent,{
//     width:'30%',
//     data
//   }).afterClosed().subscribe(val=>{
//     if(val=='Update'){
//       this.getAllClient();
//     }
//   })

// }

deleteClient(id:any){
  this.api.deleteOrder(id).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'Order Deleted Successfully',
        'success'
      )
      this.getAllOrder();
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
addInvoice(data:any){
  this.dialog.open(AddInvoiceComponent,{
    width:'60%',
    data
  })
}

}

