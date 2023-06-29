import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DriveModelComponent } from 'src/app/Model/drive-model/drive-model.component';
import { StudentModelComponent } from 'src/app/Model/student-model/student-model.component';
import { DriveService } from 'src/app/services/drive.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.css']
})
export class DriveComponent  implements OnInit{
  date:any
  displayedColumns: string[] = ['id','drive_id','clg_id','college_name','drive_type','team_lead','hr_name','technical_person','mode_of_travel','travel_type','submit_by','add','action'];
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

  
 ngOnInit(): void {
  this.Activate();
     this.getallDrives()
 }
constructor(private dialog:MatDialog,private api:DriveService,private route:ActivatedRoute){}

// openDrive(data:any){
//   console.log(data)
//   this.dialog.open(DriveModelComponent,{
//     width:'30%',
//     data:{data}
//   })
// }

  getallDrives(){
    this.api.getAllDrives().subscribe({
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
  editDrive(data:any){
    this.dialog.open(DriveModelComponent,{
      width:'30%',
      data:{data}
    }).afterClosed().subscribe(val=>{
      if(val=='Update'){
        this.getallDrives();
      }
    })
  }
  deleteDrive(id:any){
    this.api.deleteDrives(id).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'Drive Deleted Successfully',
          'success'
        )
        this.getallDrives();
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

addStudent(add:any){
  this.dialog.open(StudentModelComponent,{
    width:'50%',
    data:{
      add
    }
  })
}

Activate(){
  let hrm=document.getElementById('hrm');
  let hrm1=document.getElementById('hrm1');
  hrm?.classList.add("active");
  hrm1?.classList.add("active");

}

}

