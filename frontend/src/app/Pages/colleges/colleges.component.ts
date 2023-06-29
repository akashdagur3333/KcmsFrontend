import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { CollegeModelComponent } from 'src/app/Model/college-model/college-model.component';
import { DriveModelComponent } from 'src/app/Model/drive-model/drive-model.component';
import { CollegesService } from 'src/app/services/colleges.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.css']
})
export class CollegesComponent implements OnInit{
  // displayedColumns: string[] = ['id','college_id','college_name','city','state','pin_code','type','tnp_head','date','add','action'];
  // dataSource!: MatTableDataSource<any>;
  // displayedColumns1: string[] = ['id','college_id','college_name','city','state','pin_code','type','tnp_head','date','add','action'];
  // dataSource1!: MatTableDataSource<any>;
  displayedColumns2: string[] = ['id','category','college_id','college_name','city','state','pin_code','type','tnp_head','date','add','action'];
  dataSource2!: MatTableDataSource<any>;


  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatPaginator) paginator1!: MatPaginator;
  // @ViewChild(MatSort) sort1!: MatSort;
  @ViewChild(MatPaginator) paginator2!: MatPaginator;
  @ViewChild(MatSort) sort2!: MatSort;
  



  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  // applyFilter1(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource1.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource1.paginator) {
  //     this.dataSource1.paginator.firstPage();
  //   }
  // }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  date:any
  allColleges:any;
  tnpHead:any;
  panelCollege:any;
  proposedCollege:any;
  
 ngOnInit(): void {
     this.getallColleges()
 }
constructor(private dialog:MatDialog,private api:CollegesService){}
  OpenModel(){
    this.dialog.open(CollegeModelComponent,{
      width:'50%'
    }).afterClosed().subscribe(val=>{
      if(val=='Add'){
        this.getallColleges()
      }
    })
  }

// addPanel(data:any){
//   this.dialog.open(CollegeModelComponent,{
//     width:'30%',
//     data:data
//   }).afterClosed().subscribe(val=>{
//     if(val=='Panel'){
//       this.getallColleges();
//     }
//   })
// }

openDrive(id:any){
  var id1=id._id
  this.dialog.open(DriveModelComponent,{
    width:'30%',
    data:{id1,college:id},
    
  })
}

  getallColleges(){
    this.api.getAllColleges().subscribe({
      next:(res)=>{
      this.allColleges=res;
      this.proposedCollege=res.filter((X:any)=>
        X.status===1
      )
      this.panelCollege=res.filter((X:any)=>
      X.status===2
    )
    this.panelCollege.reverse();
    // this.dataSource = new MatTableDataSource(this.panelCollege);
    // this.dataSource.paginator= this.paginator;
    // this.dataSource.sort =this.sort;
    // this.proposedCollege.reverse();
    // this.dataSource1 = new MatTableDataSource(this.proposedCollege);
    // this.dataSource1.paginator= this.paginator1;
    // this.dataSource1.sort =this.sort1;
    this.allColleges.reverse();
    this.dataSource2 = new MatTableDataSource(this.allColleges);
    this.dataSource2.paginator= this.paginator2;
    this.dataSource2.sort =this.sort2;
    res.filter((x:any)=>{
      if(x.status==1){
        x.status="Perposed College"
        // var id = document.getElementById('addDrive');
        //  console.log(id)
      }
      else{
        x.status="Panel College"
      }
    })
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
}
