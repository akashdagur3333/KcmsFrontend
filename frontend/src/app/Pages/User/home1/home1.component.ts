import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css']
})
export class Home1Component implements OnInit{
  username:any;
  ngOnInit(): void {

     var header=document.getElementById('header');
  var sidebar=document.getElementById('sidebar');
  header?.setAttribute('hidden','');
  sidebar?.setAttribute('hidden','')

  
  }


}
