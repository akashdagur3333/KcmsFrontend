import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jwtDecode from 'jwt-decode';
import { ReportingService } from 'src/app/services/reporting.service';
import { TechnicalManagementService } from 'src/app/services/technical-management.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-teammember-model',
  templateUrl: './teammember-model.component.html',
  styleUrls: ['./teammember-model.component.css']
})
export class TeammemberModelComponent implements OnInit{

  token:any;
  allData:any;
  Allmember:any=[];
  member:any=[];
  teamForm!:FormGroup;
  createdBy:any;
  saveTeamMember:any=[];
  displayedColumns: string[] = ['id','rpt_id','type','name','sex','trn_start','trn_end','doj','job_status','action'];
  dataSource!: MatTableDataSource<any>;
  dataSource1!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<TeammemberModelComponent>,private api2:TechnicalManagementService,private api:ReportingService,@Inject(MAT_DIALOG_DATA) private editData:any){}
  ngOnInit(): void {
    this.allData=this.editData;
this.getAllJoined();

this.token=localStorage.getItem('token');
this.token=jwtDecode(this.token);
this.createdBy=this.token.username;

    this.teamForm=this.formbuilder.group({
      team_lead_rpt_id:['',Validators.required],
      team_lead_name:['',Validators.required],
      team_lead_department:['',Validators.required],
      team_member:[],
      created_by:this.createdBy
  })
  this.teamForm.controls['team_lead_rpt_id'].setValue(this.editData._id);
  this.teamForm.controls['team_lead_name'].setValue(this.editData.employee_name);
  this.teamForm.controls['team_lead_department'].setValue(this.editData.subDepartment);

}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }


  getAllJoined() {
    this.api.getAllReporting().subscribe({
      next: (res) => {
        var data = res.filter((x: any) => {
          if (x.pending_value == 0 && x.status == 4  && x._id!=this.editData._id) {
            x.status = 'Joined'
            return x
          }
        })
        this.Allmember=data;
        this.dataSource = new MatTableDataSource(this.Allmember);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
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




  AddMember(data:any){    
  const index= this.Allmember.findIndex((x:any)=>x._id==data._id);
  if (index > -1) {
    this.Allmember.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.Allmember);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
   }
    this.member.push(data);
    this.dataSource1 = new MatTableDataSource(this.member);
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
      
}
removeMember(data:any){
  const index= this.member.findIndex((x:any)=>x._id==data._id);
  if (index > -1) {
    this.member.splice(index, 1);
    this.dataSource1 = new MatTableDataSource(this.member);
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort;
   }
   this.Allmember.push(data);
   this.dataSource = new MatTableDataSource(this.Allmember);
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort; 
}

addTeam(){
 this.member.map((x:any)=>{
  this.saveTeamMember.push({_id:x._id,name:x.employee_name,department:x.designation})
  this.teamForm.controls['team_member'].setValue(this.saveTeamMember);
  })
  this.api2.addTeam(this.teamForm.value).subscribe({
    next:(res)=>{
      Swal.fire(
        'Good job!',
        'Team Added Successfully',
        'success'
      )
      this.teamForm.reset();
  this.dialog.close('Add');
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

