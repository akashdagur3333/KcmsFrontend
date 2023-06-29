import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LOAModelComponent } from 'src/app/Model/loamodel/loamodel.component';
import { StudentModelComponent } from 'src/app/Model/student-model/student-model.component';
import { Student1ModelComponent } from 'src/app/Model/student1-model/student1-model.component';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{
constructor(private api:StudentService,private dialog:MatDialog){}
ngOnInit(): void {
    this.getAllStudents()
}
  displayedColumns: string[] = ['id','str_id','drv_id','college_id','category','status','college_name','student_name','sex','type','branch','stream','package','mobile','alt_mobile','aadhar','view_offer_letter','action'];
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

  getAllStudents(){
    this.api.getAllStudents().subscribe({
  next:(res)=>{
    this.dataSource = new MatTableDataSource(res);
         this.dataSource.paginator= this.paginator;
         this.dataSource.sort =this.sort;
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
    this.dialog.open(StudentModelComponent,{
      width:'50%',
      height:'80%',
      data:{message:"addStudent"}
    })
    .afterClosed().subscribe(val=>{
      if(val=='Add'){
        this.getAllStudents();
      }
    })
  }

  editStudent(data:any){
    this.dialog.open(StudentModelComponent,{
      width:'50%',
      data:{data}
    }).afterClosed().subscribe(val=>{
      if(val=='Update'){
        this.getAllStudents();
      }
    })
  }
  loaModel(data:any){
    this.dialog.open(LOAModelComponent,{
      width:'60%',
      height:'70%',
      data
    })
  }

  deleteStudent(id:any){
    this.api.deleteStudents(id).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'Student Deleted Successfully',
          'success'
        )
        this.getAllStudents();
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
