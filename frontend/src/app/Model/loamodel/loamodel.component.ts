import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReportingService } from 'src/app/services/reporting.service';

@Component({
  selector: 'app-loamodel',
  templateUrl: './loamodel.component.html',
  styleUrls: ['./loamodel.component.css']
})
export class LOAModelComponent implements OnInit{
allReporting:any=[];
constructor(@Inject(MAT_DIALOG_DATA) private editData:any,private api:ReportingService){}
  ngOnInit(): void {
    this.allReporting=this.editData;
  }

}
