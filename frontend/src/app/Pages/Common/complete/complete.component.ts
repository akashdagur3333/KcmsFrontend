import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jwtDecode from 'jwt-decode';

import { ChangeStateModelComponent } from 'src/app/Model/change-state-model/change-state-model.component';

import { TechnicalManagementService } from 'src/app/services/technical-management.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit{

  token:any;
  displayedColumns: string[] = ['id','tsk_id','ast_id','prt_id_name','clt_id_name','assign_to_dep','team_manager','task_description','task_expiry_date','assign_by','page_name','remarks','status'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 rpt_id:any;
  constructor(private dialog:MatDialog,private api:TechnicalManagementService){}
  ngOnInit(): void {
    this.token=localStorage.getItem('token');
this.token=jwtDecode(this.token);
this.rpt_id=this.token.rpt_id;
this.getAllCompletedTask()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  getAllCompletedTask(){
    this.api.getAllAssignedtask().subscribe({
      next:(res)=>{

      var data= res.filter((x:any)=>{
        if(x.status==5){
          x.status='Completed';
          const val= x.task_assign_to.split(",");
          const id =val[1];
          const name=val[0];
          if(id==this.rpt_id){
            x.task_assign_to=id+' ('+name+')'
            return x;
          }
          
        }
      
       })
        this.dataSource = new MatTableDataSource(data);
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



//   editTask(data:any){
//   this.dialog.open(ChangeStateModelComponent,{
//     width:'60%',
//     data:{edit:data}
//   }).afterClosed().subscribe(val=>{
//     if(val=='Add'){
//       this.getAllCompletedTask();
//     }
//   })

// }

// deleteAssignment(id:any){
//   this.api.deleteAssignedtask(id).subscribe({
//     next:(res)=>{
//       Swal.fire(
//         'Good job!',
//         'Assigned Task Deleted Successfully',
//         'success'
//       )
//       this.getAllCompletedTask();
//     },
//     error:(err)=>{
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Something went wrong!',
//         footer: err
//       })
//     }
//   })
// }

// totalTask(data:any){
//   this.dialog.open(AddTaskModelComponent,{
//     width:'60%',
//     data:{add:data}
//   })
// }

}






