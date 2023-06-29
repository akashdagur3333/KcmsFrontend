import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarOptions  } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { LoginStatusService } from 'src/app/services/login-status.service';

@Component({
  selector: 'app-attandance-data-model',
  templateUrl: './attandance-data-model.component.html',
  styleUrls: ['./attandance-data-model.component.css']
})
export class AttandanceDataModelComponent implements OnInit{
  constructor(private api:LoginStatusService,@Inject(MAT_DIALOG_DATA) private Data:any){
    this.getAllLoginStatus()
  }
  EventData:any=[]
  Events:any;
  calendarOptions!: CalendarOptions;
  ngOnInit(): void {
    this.getAllLoginStatus();
   this.calender()
  }




 

handleDateClick(args:any){
  alert(args.event.title)
}
data:any;
getAllLoginStatus(){
  
  this.api.getAllStatus(this.Data._id).subscribe({
    next:(res)=>{
     this.data=res
  //  this.EventData.push(res)
  //   this.EventData.map((X:any)=>{
  //     X.date=moment(X.date).format('YYYY-MM-DD')
  //     this.data={
  //       title:'mohit',
  //       date:'2023-06-16'
  //     }

  //   })

    }
    ,error:(err)=>{
      console.log(err)
    }
  })

  // this.Events.push({
  //   title:'mohit',
  //   date:'2023-06-16'
  // })

}

calender(){
  this.calendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    selectable:true,
    events:this.Events,
    eventClick:this.handleDateClick.bind(this)
   
  };
}
}
