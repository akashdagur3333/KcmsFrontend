import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-main-user-full',
  templateUrl: './main-user-full.component.html',
  styleUrls: ['./main-user-full.component.css']
})
export class MainUserFullComponent implements OnInit{

  token:any
  ngOnInit(): void {
    var technical=document.getElementById('tech');
    var hr=document.getElementById('hrm');
    this.token=localStorage.getItem('token');
    this.token=jwtDecode(this.token)
    var role=this.token.role;
    if(role=='technical'){
      technical?.removeAttribute('hidden')
    }
    else if(role=='hr'){
      hr?.removeAttribute('hidden')
    }


  }
}
