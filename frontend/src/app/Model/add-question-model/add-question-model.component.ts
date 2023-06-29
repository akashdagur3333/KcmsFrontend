import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { QuesrionService } from 'src/app/services/quesrion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question-model',
  templateUrl: './add-question-model.component.html',
  styleUrls: ['./add-question-model.component.css']
})
export class AddQuestionModelComponent implements OnInit{
res:any;
x:any
question:any=[];
  ngOnInit(): void {
      this.getAllQuestion();
      // localStorage.removeItem('addQuestion');
  }
  constructor(private api:QuesrionService,private dialog1:MatDialogRef<AddQuestionModelComponent>){}
  getAllQuestion(){
    this.api.getAllQuestion().subscribe({
      next:(res)=>{
        res.map((x:any)=>{
          var question= x.question.split("\n");
          x.question=question
            })
            this.res=res;
      },
      error:(err)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: err
        })
      }
    })
      }

  

      // dialog(){
      //   this.dialog1.close("question");
      // }
      // addquestion(data:{},id:any){
      //   if(this.question==''){
      //     this.question.push(data)
      //     localStorage.setItem('addQuestion',JSON.stringify(this.question));
      //   }
      //   else{
      //    this.question.find((x:any)=>{
      //       if(x._id==id){
      //       alert('already exist')
      //       }
      //       else{
      //         this.question.push(data)
      //         localStorage.setItem('addQuestion',JSON.stringify(this.question));
      //       }
      //         });
      //   // if(!this.x){
      //   //       this.question.push(data)
      //   //       console.log(this.question)
      //   //       }
      //   }
      //    console.log(this.question)
    

      // }
      questionChange($event:any,data1:any,id:any){
      const data=data1
      const isChecked=$event.target.checked;
      // console.log(data,isChecked)
      if(isChecked==true){
        
        this.question.push(data);
        console.log(this.question)
      }
      else{
    const index= this.question.findIndex((x:any)=>x._id==id);
    if (index > -1) {
      this.question.splice(index, 1);
    }
    console.log(this.question)
    return this.question;
   
  }
  }

  addQuestion(){
    let data=this.question
    this.dialog1.close(data);

  }
    }
     
//         this.question.findIndex((x:any)=>{
//                 if(x._id==id){
// console.log(x)
//                 }
            
//                   });      }
    
      // console.log(this.question)
      // }

