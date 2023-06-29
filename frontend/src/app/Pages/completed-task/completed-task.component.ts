import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddProjectComponent } from 'src/app/Model/add-project/add-project.component';
import { AddTaskModelComponent } from 'src/app/Model/add-task-model/add-task-model.component';
import { ChangeStateModelComponent } from 'src/app/Model/change-state-model/change-state-model.component';
import { ClientModelComponent } from 'src/app/Model/client-model/client-model.component';
import { TotalAssignmentModelComponent } from 'src/app/Model/total-assignment-model/total-assignment-model.component';
import { ClientManagementService } from 'src/app/services/client-management.service';
import { TechnicalManagementService } from 'src/app/services/technical-management.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.component.html',
  styleUrls: ['./completed-task.component.css']
})
export class CompletedTaskComponent implements OnInit{

  token:any;
  displayedColumns: string[] = ['id','tsk_id','ast_id','prt_id_name','clt_id_name','assign_to_dep','team_manager','task_description','task_expiry_date','assign_by','page_name','remarks','status','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private api:TechnicalManagementService){}
  ngOnInit(): void {
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
          x.task_assign_to=id+' ('+name+')'
          return x;
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



  editTask(data:any){
  this.dialog.open(ChangeStateModelComponent,{
    width:'60%',
    data:{edit:data}
  }).afterClosed().subscribe(val=>{
    if(val=='Add'){
      this.getAllCompletedTask();
    }
  })

}

deleteAssignment(id:any){
  this.api.deleteAssignedtask(id).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'Assigned Task Deleted Successfully',
        'success'
      )
      this.getAllCompletedTask();
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

// totalTask(data:any){
//   this.dialog.open(AddTaskModelComponent,{
//     width:'60%',
//     data:{add:data}
//   })
// }

}





