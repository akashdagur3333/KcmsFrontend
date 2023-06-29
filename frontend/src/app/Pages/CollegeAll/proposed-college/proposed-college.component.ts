import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CollegeModelComponent } from 'src/app/Model/college-model/college-model.component';
import { DriveModelComponent } from 'src/app/Model/drive-model/drive-model.component';
import { CollegesService } from 'src/app/services/colleges.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-proposed-college',
  templateUrl: './proposed-college.component.html',
  styleUrls: ['./proposed-college.component.css']
})
export class ProposedCollegeComponent implements OnInit{
  constructor(private api:CollegesService,private dialog:MatDialog){}
  ngOnInit(): void {
    this.getallColleges();
  }
    displayedColumns: string[] = ['id','college_id','college_name','city','state','pin_code','type','tnp_head','date','add','action'];
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

    addPanel(data:any){
      this.dialog.open(CollegeModelComponent,{
        width:'30%',
        data:data
      }).afterClosed().subscribe(val=>{
        if(val=='Panel'){
          this.getallColleges();
        }
      })
    }
PerposedCollege:any=[];
    getallColleges(){
      this.api.getAllColleges().subscribe({
        next:(res)=>{
      this.PerposedCollege=res.filter((X:any)=>
        X.status===1
      )
      this.PerposedCollege.reverse();
      this.dataSource = new MatTableDataSource(this.PerposedCollege);
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
    editColleges(data:any){
      this.dialog.open(CollegeModelComponent,{
        width:'30%',
        data:data
      }).afterClosed().subscribe(val=>{
        if(val=='Update'){
          this.getallColleges();
        }
      })
    }
    deleteColleges(id:any){
      this.api.deleteColleges(id).subscribe({
        next:(res)=>{
          Swal.fire(
            'Good job!',
            'college Deleted Successfully',
            'success'
          )
          this.getallColleges();
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
//     openDialog(){
//       this.dialog.open(DesignationModelComponent,{
//         width:'30%'
//       }).afterClosed().subscribe(val=>{
//         if(val=='Add'){
//           this.getAllDesignation();
//         }
//       })
//  }


}



