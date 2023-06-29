import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
constructor(private router:Router){}
  username:any;
  ngOnInit(): void {

      this.username=localStorage.getItem('token');
      if(this.username){
        this.username=jwtDecode(this.username);
        this.username=this.username.username;
      }
    
  }
  
  logout(){
    this.router.navigate(['/']);
    localStorage.removeItem('token');
  }
}
