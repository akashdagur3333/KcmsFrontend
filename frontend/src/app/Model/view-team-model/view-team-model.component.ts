import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-team-model',
  templateUrl: './view-team-model.component.html',
  styleUrls: ['./view-team-model.component.css']
})
export class ViewTeamModelComponent implements OnInit{
res:any;
constructor(@Inject(MAT_DIALOG_DATA) private editData:any){}
ngOnInit(): void {
    this.res=this.editData;
}

}
