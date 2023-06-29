import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jwtDecode from 'jwt-decode';
import { AddProjectComponent } from 'src/app/Model/add-project/add-project.component';
import { AddTaskModelComponent } from 'src/app/Model/add-task-model/add-task-model.component';
import { ClientModelComponent } from 'src/app/Model/client-model/client-model.component';
import { TotalAssignmentModelComponent } from 'src/app/Model/total-assignment-model/total-assignment-model.component';
import { ClientManagementService } from 'src/app/services/client-management.service';
import { TechnicalManagementService } from 'src/app/services/technical-management.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-total-assignment',
  templateUrl: './total-assignment.component.html',
  styleUrls: ['./total-assignment.component.css']
})
export class TotalAssignmentComponent implements OnInit{

  token:any;
  role:any;
  displayedColumns: string[] = ['id','ast_id','prt_id_name','clt_id_name','assign_to_dep','team_manager','assignment_date','delivery_date','remakrs','add','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private api:TechnicalManagementService){}
  ngOnInit(): void {
    this.token=localStorage.getItem('token');
   this.token=jwtDecode(this.token);
   this.role=this.token.username;
this.getAllTotalAssignment();


  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  getAllTotalAssignment(){
    this.api.getAllTotalAssignment().subscribe({
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
//       this.getAllTotalAssignment();
//     }
//   })
// }


editAssignment(data:any){
  this.dialog.open(TotalAssignmentModelComponent,{
    width:'60%',
    data:{edit:data}
  }).afterClosed().subscribe(val=>{
    if(val=='Update'){
      this.getAllTotalAssignment();
    }
  })

}

deleteAssignment(id:any){
  this.api.deleteTotalAssignment(id).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'Assignment Deleted Successfully',
        'success'
      )
      this.getAllTotalAssignment();
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

totalTask(data:any){
  this.dialog.open(AddTaskModelComponent,{
    width:'60%',
    data:{add:data}
  })
}

}



