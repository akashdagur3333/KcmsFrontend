import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import jwtDecode from 'jwt-decode';
import { QuesrionService } from 'src/app/services/quesrion.service';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-question-model',
  templateUrl: './question-model.component.html',
  styleUrls: ['./question-model.component.css']
})
export class QuestionModelComponent implements OnInit{

  title = 'angular-template-ckeditor5-classic';
  public Editor = ClassicEditorBuild;
  questionForm!:FormGroup;
    Submit='Add Question';
    token:any;
    createdBy:any;
    errors:any; 
    date:any;
    allQuestion:any;
    constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<QuestionModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:QuesrionService){}
    public onReady(editor: any) {
      console.log("CKEditor5 Angular Component is ready to use!", editor);
    }
    public onChange({ editor }: ChangeEvent) {
      const data = editor.data.get();
     this.questionForm.controls['question'].setValue(data);
      console.log(data);
    }
    ngOnInit(): void {
  this.token=localStorage.getItem('token');
  this.token=jwtDecode(this.token);
  this.createdBy=this.token.username;
  
    this.questionForm=this.formbuilder.group({
      questionType:['',Validators.required],
      name:['',Validators.required],
      question:['',Validators.required],
      opt1:['',Validators.required],
      opt2:['',Validators.required],
      opt3:['',Validators.required],
      opt4:['',Validators.required],
      answere:['',Validators.required],
      status:['',Validators.required],
      created_by:this.createdBy
    })
  
  
  if(this.editData){
    this.Submit="Update Sub Department",
    this.questionForm.controls['head_department'].setValue(this.editData.head_department);
    this.questionForm.controls['Sub_department'].setValue(this.editData.Sub_department);
    }
    }
    addQuestion(){
      console.log(this.questionForm.value)
      if(!this.editData){
        if(this.questionForm.value.head_department=='' || this.questionForm.value.Sub_department==''){
          console.log('Fill All the fields')
        }
        else{
          this.api.addQuestion(this.questionForm.value).subscribe({
            next:(res)=>{
              console.log(res)
              // if(res.name=='ValidationError'){
              //   this.errors=res.errors    
              //   console.log(res)
              //   //  this.errors=res.errors;
              //   // this.errors.sort((x:any)=>{
              //   //   console.log(x.message);
              //   // })
              // }
              Swal.fire(
                'Good job!',
                'Question Added Successfully',
                'success'
              )
              this.questionForm.reset();
              this.dialog.close("Add");
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
      }
 
     
    }
  


  }