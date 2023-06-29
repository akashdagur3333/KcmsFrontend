import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReportingService } from 'src/app/services/reporting.service';
import { TechnicalManagementService } from 'src/app/services/technical-management.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-emp-performance',
  templateUrl: './emp-performance.component.html',
  styleUrls: ['./emp-performance.component.css']
})
export class EmpPerformanceComponent implements OnInit{


  displayedColumns: string[] = ['id','rpt_id','name','dept','a','c','f','p','over_all'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data:any=[];
  ngOnInit(): void {
    this.getAllPerformance();
    var show=document.getElementById('jobStatus');
    show?.removeAttribute('hidden')
  }
  constructor(private dialog:MatDialog,private api:ReportingService,private api1:TechnicalManagementService){}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
assign:any=[]
rpt:any
  id:any=[]
  count:any=[];

  getAllPerformance(){
   this.api.getAllReporting().subscribe({
   
  next:(res)=>{
    this.id=[]
  this.data=res.filter((x:any)=>
   {
    if(x.status==4){
      x.status='Joined'
      this.id.push(x._id)
      return x;
    }
   
   })

//    this.api1.getAllAssignedtask().subscribe({
//     next:(res)=>{
//       this.id=[]
//       this.data.map((X:any)=>{
//         this.id.push(X._id)
//      })
//        res.map((x:any)=>
//        {
//         var data=x.task_assign_to.split(",");
//         x.task_assign_to=data[1]
//        })
//        this.assign=res;
     
//        this.id.forEach((element:any) => {
//        this.assign.find((x:any)=>{
//         if(x.task_assign_to==element){
//        this.count=this.count+1;
//        if(x.status==5){
//         this.countC+=1;
//        }
//       else if(x.status==6){
//         this.countF+=1;
//        }
//        else{
//         this.countP+=1
//        }
    
//        this.great(x.task_assign_to)
//         }
//        })
//         // for(var i=1;i<=this.assign.length;i++){
//         //  console.log('g')
//         // }
//       // if(element==this.rpt[1]){
//       //   console.log('je')
//       // }
//       })
//  // this.id.forEach((element:any) => {
     
//       // });   
      
//     },
//     error:(err)=>{
//       console.log(err)
//     }
//   })

    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator= this.paginator;
    this.dataSource.sort =this.sort;

    this.getAllAssigned()
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

 

  allAssigned:any=[];
  getAllAssigned(){
    this.api1.getAllAssignedtask().subscribe({
      next:(res)=>{
        res.map((x:any)=>{
          var data=x.task_assign_to.split(",");
         x.task_assign_to=data[1]
        })
        this.load(res);
      },
      error:(err)=>{
        console.log(err)
      }
    })
  
  }

  element:any=[]
  ele:any=[]
  load(data:any=[]){
//  this.id.forEach((element:any=[]) => {
//   element.find((x:any)=>{
//       console.log(x)
//      })
//  });
data.find((x:any)=>{
  this.id.forEach((element:any)=>{
    if(x.task_assign_to==element){
      this.count.push(x)
    }
  })
})
this.setdata();

  }

length:any=[]
countG!:number;
countP:number=0;
countF:number=0;
countC:number=0;
percentage!:number;
completeLength:any=[];
failedLength:any=[];
pendingLength:any=[];
assignLength:any=[];

setdata(){
this.data.map((x:any)=>{
   x['a']=  this.filterdata(x._id)
x.a.filter((y:any)=>{
     if(y.status==5){
      this.completeLength.push(y)
      this.countC=this.completeLength.length
     x['c']=this.countC
     x['f']=0
    }
     else if(y.status==6){
              this.failedLength.push(y)
              this.countF=this.failedLength.length
           
             x['f']=this.countF
            }
    else{ 
              this.pendingLength.push(y)
              this.countP=this.pendingLength.length
             x['p']=this.countP
           

            }
      
            this.assignLength=this.filterdata(x._id).length
            x['a']=this.assignLength

          //  console.log(this.countC,this.countG,this.countP)
          //    this.percentage=(this.countC*100)/(this.countG-this.countP);
          //     x['Per']=this.percentage+'%'
             
              
})

})
this.data.map((z:any)=>{
  console.log(z.f)
             if(z.a.length==0){
              z.a=0
             }
             
             else if(z.c==undefined){
              z.c=0
             }
             else if(!z.p){
              z.p=0
             }
             else if(z.f==undefined){
              z.f=0
             }
            
             if(z.c || z.f){
              z.p=z.a-z.c-z.f

             }
             this.percentage=(z.c*100)/(z.a-z.p);
            if(isNaN(this.percentage)){
             this.percentage=100
            }
              z['Per']=this.percentage+'%'
             
})
}


filterdata(id:any){
  var c= this.count.filter((y:any)=>y.task_assign_to==id)
  return c
}
  // finddata(data:any){
  // this.data.map((x:any)=>{
   
  // })
  // }
  // great(data:any){
  //   console.log(this.count)
  //   this.data.find((x:any)=>{
  //     if(x._id==data){
  //       this.percentage=(this.countC*100)/(this.count-this.countP);
  //       x['a']=this.count
  //       // x['c']=this.countC
  //       // x['f']=this.countF
  //       // x['p']=this.countP
  //       // x['Per']=this.percentage+'%'
  //     }
  //   }) 
  // }
  

  editReporting(data:any){
    // this.dialog.open(ReportingModelComponent,{
    //   width:'60%',
    //   height:'70%',
    //   data:data
    // }).afterClosed().subscribe(val=>{
    //   if(val=='Update'){
    //     this.getAllReporting();
    //   }
    // })
  }

  deleteReporting(id:any){
    // this.api.deleteReporting(id).subscribe({
    //   next:(res)=>{
    //     Swal.fire(
    //       'Good job!',
    //       'Reporting Deleted Successfully',
    //       'success'
    //     )
    //     this.getAllReporting();
    //   },
    //   error:(err)=>{
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: 'Something went wrong!',
    //       footer: err
    //     })
    //   }
    // })
  }


                      allPerform:any;
                      wellperform:any;
                      underpip:any;
                      notperform:any;
                    
getAllid(){
  this.allPerform=document.getElementById('allPerformance');
  this.wellperform=document.getElementById('wellPerformance');
  this.underpip=document.getElementById('undePip');
  this.notperform=document.getElementById('notPerforming');

}
     allPerformance(){
      this.getAllid();
       this.allPerform?.removeAttribute('hidden')
       this.wellperform?.setAttribute('hidden','');
       this.underpip?.setAttribute('hidden','');
       this.notperform?.setAttribute('hidden','');
       
      }
      wellPerformance(){
        this.getAllid();
        this.wellperform?.removeAttribute('hidden')
        this.allPerform?.setAttribute('hidden','');
        this.underpip?.setAttribute('hidden','');
        this.notperform?.setAttribute('hidden','');
      }
      undePip(){
        this.getAllid();
        this.underpip?.removeAttribute('hidden')
        this.wellperform?.setAttribute('hidden','');
        this.allPerform?.setAttribute('hidden','');
        this.notperform?.setAttribute('hidden','');

       }
       notPerforming(){
        this.getAllid();
        this.notperform?.removeAttribute('hidden')
        this.underpip?.setAttribute('hidden','');
        this.wellperform?.setAttribute('hidden','');
        this.allPerform?.setAttribute('hidden','');
       }
      
}

