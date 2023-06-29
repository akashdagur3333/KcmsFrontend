import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddProjectComponent } from 'src/app/Model/add-project/add-project.component';
import { ClientModelComponent } from 'src/app/Model/client-model/client-model.component';
import { TotalAssignmentModelComponent } from 'src/app/Model/total-assignment-model/total-assignment-model.component';
import { ClientManagementService } from 'src/app/services/client-management.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-total-project',
  templateUrl: './total-project.component.html',
  styleUrls: ['./total-project.component.css']
})
export class TotalProjectComponent implements OnInit{

  token:any;
  displayedColumns: string[] = ['id','prt_id','clt_id_name','project_category','project_type','project_name','payment_type','due_date','project_description','project_cost','gst_slab','project_delivery_date','domain_details','hosting_details','add','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private api:ClientManagementService){}
  ngOnInit(): void {
this.getAllTotalProject()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  getAllTotalProject(){
    this.api.getAllProject().subscribe({
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
      this.getAllTotalProject();
    }
  })
}


editProject(data:any){
  this.dialog.open(AddProjectComponent,{
    width:'60%',
    data:{edit:data}
  }).afterClosed().subscribe(val=>{
    if(val=='Update'){
      this.getAllTotalProject();
    }
  })

}

deleteProject(id:any){
  this.api.deleteProject(id).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'Project Deleted Successfully',
        'success'
      )
      this.getAllTotalProject();
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

totalAssignment(data:any){
  this.dialog.open(TotalAssignmentModelComponent,{
    width:'60%',
    data:{add:data}
  })
}

}


