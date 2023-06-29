import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { QuesrionService } from 'src/app/services/quesrion.service';
import { ReportingService } from 'src/app/services/reporting.service';
import Swal from 'sweetalert2';
import { Refund2ModelComponent } from '../refund2-model/refund2-model.component';
@Component({
  selector: 'app-refund1-model',
  templateUrl: './refund1-model.component.html',
  styleUrls: ['./refund1-model.component.css']
})
export class Refund1ModelComponent implements OnInit{
  res:any;
  x:any
  user:any=[];
    ngOnInit(): void {
        this.getAllUser();
    }
    constructor(private api:ReportingService,private dialog:MatDialog,private dialog1:MatDialogRef<Refund1ModelComponent>){}
    getAllUser(){
      this.api.getAllReporting().subscribe({
        next:(res)=>{
          this.res=res;
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
  
        addRefund(data:any){
          this.dialog.open(Refund2ModelComponent,{
            width:'60%',
            data
          }).afterClosed().subscribe(val=>{
            if(val='Add'){
              this.dialog1.close('Add');
            }
          })
        }
      }
  