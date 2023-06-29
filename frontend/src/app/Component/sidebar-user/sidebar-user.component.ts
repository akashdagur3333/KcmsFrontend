import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css']
})
export class SidebarUserComponent{
 
    value:any;

    techOpen(){
      var x=document.getElementById("tech");
      console.log(x?.classList[2])
      if(x?.classList[2]=='active'){
      x?.classList.replace('active','inactive')
      }
      else{
        x?.classList.replace('inactive','active')
        console.log(x?.classList)
      }
    }
    hrOpen(){
      var x=document.getElementById("hrm");
      if(x?.classList.value=='menu-item has-sub inactive'){
        x?.classList.replace('inactive','active');
      }
      else{
        x?.classList.replace('active','inactive');
      }
      
      }
    
      getiddata(){
        this.value=document.getElementById("hrm");
      }
      
      openReporting(){
        var x=document.getElementById("hrm2");
        x?.classList.add('active');
      }
      openhrm(id:any){
        
      var x=document.getElementById(id);
      // this.value?.classList.replace('inactive','active')
      // this.value?.classList.add('expand')
      x?.classList.add('active')
      console.log(x?.classList.value)
      }
      
      openplacement(){
        var x=document.getElementById("hrm1");
      x?.classList.add('active');
      }
      
      openEmpStatus(){
        var x=document.getElementById("hrm3");
      x?.classList.add('active');
      }
    
    }
    
