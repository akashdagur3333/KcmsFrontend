import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarOptions  } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import jwtDecode from 'jwt-decode';
import { LoginStatusService } from 'src/app/services/login-status.service';
@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.css']
})
export class AttendenceComponent implements OnInit{
  constructor(private api:LoginStatusService){
    this.getAllLoginStatus()
  }
  EventData:any=[]
  token:any;
  Data:any
  calendarOptions!: CalendarOptions;
  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    this.token=jwtDecode(this.token);
   this.Data=this.token.rpt_id;
    this.getAllLoginStatus();
   this.calender()
  }




 

handleDateClick(args:any){
  alert(args.event.title)
}
data:any;
getAllLoginStatus(){
  
  this.api.getAllStatus(this.Data).subscribe({
    next:(res)=>{
     this.data=res
    }
    ,error:(err)=>{
      console.log(err)
    }
  })



}

calender(){
  this.calendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    selectable:true,
    eventClick:this.handleDateClick.bind(this)
  };
}
}
