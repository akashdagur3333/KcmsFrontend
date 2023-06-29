import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
import { AddQuestionModelComponent } from '../add-question-model/add-question-model.component';
import { AddUserModelComponent } from '../add-user-model/add-user-model.component';
import { QuesrionService } from 'src/app/services/quesrion.service';
import * as moment from 'moment';



@Component({
  selector: 'app-training-test-model',
  templateUrl: './training-test-model.component.html',
  styleUrls: ['./training-test-model.component.css']
})
export class TrainingTestModelComponent implements OnInit{
  testForm!:FormGroup;
    Submit='Add Test';
    token:any;
    createdBy:any;
    errors:any; 
    date:any;
    allDepartment:any;
    allQuestion!:any;
    res:any;
    constructor(private formbuilder:FormBuilder,private dialog1:MatDialog,private dialog:MatDialogRef<TrainingTestModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:QuesrionService){}
  
    ngOnInit(): void {
      // localStorage.removeItem('addQuestion');
  this.token=localStorage.getItem('token');
  this.token=jwtDecode(this.token);
  this.createdBy=this.token.username;
  
    this.testForm=this.formbuilder.group({
      test_name:['',Validators.required],
      test_date:['',Validators.required],
      test_start:['',Validators.required],
      test_timing:['',Validators.required],
      test_status:['',Validators.required],
      question:[],
      user:[],
      created_by:this.createdBy
    })
  
  
  if(this.editData){
    // var date=this.editData.data.test_date;
    // date=moment.utc(date).format('DD/MM/YYYY')
    this.Submit="Update Test",
    this.allQuestion=this.editData.data.question;
    this.res=this.editData.data.user;
    this.testForm.controls['test_name'].setValue(this.editData.data.test_name);
    this.testForm.controls['test_date'].setValue(this.editData.data.test_date);
    this.testForm.controls['test_start'].setValue(this.editData.data.test_start);
    this.testForm.controls['test_timing'].setValue(this.editData.data.test_timing);
    this.testForm.controls['test_status'].setValue(this.editData.data.test_status);
    this.testForm.controls['question'].setValue(this.allQuestion);
    this.testForm.controls['user'].setValue(this.res);
    }
    }
    addTest(){
      this.testForm.controls['question'].setValue(this.allQuestion);
      this.testForm.controls['user'].setValue(this.res);

      // console.log(this.testForm.value)
      if(!this.editData){
        if(this.testForm.value.test_name=='' || this.testForm.value.test_date==''){
          console.log('Fill All the fields')
        }
        else{
          this.api.addTest(this.testForm.value).subscribe({
            next:(res)=>{
              Swal.fire(
                'Good job!',
                'Test Added Successfully',
                'success'
              )
              this.testForm.reset();
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
  else{
    this.updatetrainingTest()
  }
     
    }

updatetrainingTest(){
      this.api.updateTest(this.editData.data._id,this.testForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          Swal.fire(
            'Good job!',
            'Test Updated Successfully',
            'success'
          )
          this.testForm.reset();
          this.dialog.close("Update");
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

    openAddQuestion(){
      this.dialog1.open(AddQuestionModelComponent,{
        width:'60%'
      }).afterClosed().subscribe(
        (res)=>{
          this.allQuestion=res;
        }
      )
    }

    openAddUser(){
      this.dialog1.open(AddUserModelComponent,{
        width:'60%',
      }).afterClosed().subscribe(
        (res)=>{
          this.res=res;
        }
      )
    }

    deleteQuestion(id:any){
      const index= this.allQuestion.findIndex((x:any)=>x._id==id);
      if (index > -1) {
        this.allQuestion.splice(index, 1);
      }
      console.log(this.allQuestion)
    }

    deleteUser(id:any){
      const index= this.res.findIndex((x:any)=>x._id==id);
      if (index > -1) {
        this.res.splice(index, 1);
      }
      console.log(this.res)
    }
  }