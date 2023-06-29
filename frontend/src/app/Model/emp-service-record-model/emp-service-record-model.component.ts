import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-service-record-model',
  templateUrl: './emp-service-record-model.component.html',
  styleUrls: ['./emp-service-record-model.component.css']
})
export class EmpServiceRecordModelComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) private editData:any){}
  ReportingData:any
  ngOnInit(): void {
      this.ReportingData=this.editData
  }
}
