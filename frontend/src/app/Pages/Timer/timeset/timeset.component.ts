import { Component, OnInit } from '@angular/core';
import { numbers } from '@material/dialog';
import { timer } from 'rxjs';

@Component({
  selector: 'app-timeset',
  templateUrl: './timeset.component.html',
  styleUrls: ['./timeset.component.css']
})
export class TimesetComponent  implements OnInit{
  hours:number=0;
  minutes:number=0;
  Seconds:number=0;
ngOnInit(): void {
const time=timer(1000,1000)
time.subscribe((x)=>{
  console.log(x)

this.Seconds  = Math.floor(x % 60);
this.minutes  = Math.floor((x/60) % 60);
this.hours = Math.floor((x/(60*60)));
console.log('hours: '+this.hours+' minutes: '+this.minutes+' seconds: '+this.Seconds)
})

}


y= setInterval(()=>{

},1000)


}
