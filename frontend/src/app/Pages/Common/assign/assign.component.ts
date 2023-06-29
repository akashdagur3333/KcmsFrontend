import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jwtDecode from 'jwt-decode';
import { ChangeStateModelComponent } from 'src/app/Model/change-state-model/change-state-model.component';
import { TechnicalManagementService } from 'src/app/services/technical-management.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit{

  token:any;
  displayedColumns: string[] = ['id','tsk_id','ast_id','prt_id_name','clt_id_name','assign_to_dep','team_manager','task_description','task_expiry_date','assign_by','page_name','remarks','status'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  rpt_id:any;
  constructor(private dialog:MatDialog,private api:TechnicalManagementService){}
  ngOnInit(): void {
this.getAllAssignedTask()
this.token=localStorage.getItem('token');
this.token=jwtDecode(this.token);
this.rpt_id=this.token.rpt_id;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

data:any=[]
finalData:any=[]
  getAllAssignedTask(){

    this.api.getAllAssignedtask().subscribe({
      next:(res)=>{
       this.data= res.filter((x:any)=>{
          if(x.status==1 || x.status==2 ||x.status==3 ||x.status==4){
            return x
          }
        })
       this.data.map((x:any)=>{
        if(x.status==1){
          x.status='Assigned';
        }
        else if( x.status==2){
          x.status='Performing'
        }
        else if( x.status==3){
          x.status='Re-Assigned'
        }
        else if(x.status==4){
          x.status='Applied For Check'
        }
        // else if(x.status==5){
        //   x.status='Completed'
        // }
        // else if(x.status==6){
        //   x.status='Failed'
        // }
        const val= x.task_assign_to.split(",");
        const id =val[1];
        const name=val[0];
        x.task_assign_to=id+' ('+name+')'
        x['rpt']=id
       })
       this.finalData=[]
      this.data.filter((y:any)=>{
        if(y.rpt==this.rpt_id){
          this.finalData.push(y)
        }
       })
        this.dataSource = new MatTableDataSource(this.finalData);
        this.dataSource.paginator= this.paginator;
        this.dataSource.sort =this.sort;
        this.changeDropdown(res.status)
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

      changeDropdown(id:any){
        const x=id;
        var assign=document.getElementById('1');
        var perform=document.getElementById('2');
        var reasign=document.getElementById('3');
        var applied=document.getElementById('4');
        var completed=document.getElementById('5');
        var failed=document.getElementById('6');
        if(x=='Assigned'){
        assign?.setAttribute('hidden','');   
        }
        else if(x=='Performing'){
          perform?.setAttribute('hidden','');   
        }
        else if( x=='Re-Assigned'){
          reasign?.setAttribute('hidden','');   
        }
        else if(x=='Applied For Check'){
          applied?.setAttribute('hidden','');   
        }
        else if(x=='Completed'){
          completed?.setAttribute('hidden','');   
        }
        else if(x=='Failed'){
          failed?.setAttribute('hidden','');   
        }
      }

changestate(event:Event,data:any){
const Value = (event.target as HTMLInputElement).value;
 this.dialog.open(ChangeStateModelComponent,{
  width:'60%',
  data:{add:data,Status:Value}
}).afterClosed().subscribe(val=>{
  if(val=='Add'){
    this.getAllAssignedTask();
  }
})
      }




// editAssignment(data:any){
//   this.dialog.open(ChangeStateModelComponent,{
//     width:'60%',
//     data:{editAssign:data}
//   }).afterClosed().subscribe(val=>{
//     if(val=='Add'){
//       this.getAllAssignedTask();
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
//       this.getAllAssignedTask();
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





