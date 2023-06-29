import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{

hrOpen(){
var x=document.getElementById("hrm");
if(x?.classList.value=='menu-item has-sub inactive'){
  x?.classList.replace('inactive','active');
}
else{
  x?.classList.replace('active','inactive');
}

}
value:any;
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

clientOpen(){
  var x=document.getElementById("client");
if(x?.classList.value=='menu-item has-sub inactive'){
  x?.classList.replace('inactive','active');
}
else{
  x?.classList.replace('active','inactive');
}
}

techOpen(){
  var x=document.getElementById("tech");
  if(x?.classList.value=='menu-item has-sub inactive'){
    x?.classList.replace('inactive','active');
  }
  else{
    x?.classList.replace('active','inactive');
  }
}


}
