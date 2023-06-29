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
import { TeamModelComponent } from 'src/app/Model/team-model/team-model.component';
import { ViewTeamModelComponent } from 'src/app/Model/view-team-model/view-team-model.component';
import { ClientManagementService } from 'src/app/services/client-management.service';
import { TechnicalManagementService } from 'src/app/services/technical-management.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit{

  token:any;
  displayedColumns: string[] = ['id','team_id','team_lead','team_member','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private api:TechnicalManagementService){}
  ngOnInit(): void {
this.getAllTeam()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  getAllTeam(){
    this.api.getAllTeam().subscribe({
      next:(res)=>{
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
OpenModel(){
  this.dialog.open(TeamModelComponent,{
    width:'60%',
    height:'70%',
  }).afterClosed().subscribe(val=>{
    if(val=='Add'){
      this.getAllTeam();
    }
  })
}


deleteTeam(id:any){
  this.api.deleteTeam(id).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'Team Deleted Successfully',
        'success'
      )
      this.getAllTeam();
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


viewTeam(data:any){
  this.dialog.open(ViewTeamModelComponent,{
    width:'60%',
    data
  })

}

}

