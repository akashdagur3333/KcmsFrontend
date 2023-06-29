import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { SettingComponent } from 'src/app/Pages/setting/setting.component';
import { CollegesService } from 'src/app/services/colleges.service';
import { DropdownService } from 'src/app/services/dropdown.service';
import { SettingService } from 'src/app/services/setting.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-model',
  templateUrl: './student-model.component.html',
  styleUrls: ['./student-model.component.css']
})
export class StudentModelComponent {
  studentForm!:FormGroup;
  submit='Add Student';
  token:any;
  createdBy:any;
  errors:any; 
  date:any;
  qualification:any;
  stream:any;
  targetValue:any;
  AllColleges:any;
  filterData:any;
  allPackage:any;
  packageData:any;
  constructor(private formbuilder:FormBuilder,private dialog:MatDialogRef<StudentModelComponent>,@Inject(MAT_DIALOG_DATA) private editData:any,private api:StudentService,private api2:SettingService,private api3:CollegesService){}

  ngOnInit(): void {
    this.getAllPackage();
    this.getAllColleges();
this.getQualification()

this.token=localStorage.getItem('token');
this.token=jwtDecode(this.token);
this.createdBy=this.token.username;



this.studentForm=this.formbuilder.group({
  category:['',Validators.required],
  type:['',Validators.required],
  aadhar_number:['',Validators.required],
  name:['',Validators.required],
  sex:['',Validators.required],
  qualification:['',Validators.required],
  stream:['',Validators.required],
  package:['',Validators.required],
  contact_no1:['',Validators.required],
  contact_no2:['',Validators.required],
  refrence_name:['',Validators.required],
  refrence_contact:['',Validators.required],
  status:['',Validators.required],
  hr_remarks:['',Validators.required],
  college:['',Validators.required],
  college_name:['',Validators.required],
  college_city:['',Validators.required],
  college_state:['',Validators.required],
  college_pin_code:['',Validators.required],
  college_type:['',Validators.required],
  created_by:this.createdBy
})

 
 if(this.editData.add){
  this.studentForm=this.formbuilder.group({
    drv_id:'DRV'+this.editData.add._id,
    clg_id:this.editData.add.clg_id,
    college_name:this.editData.add.clg_name,
    college_city:this.editData.add.college_city,
    college_state:this.editData.add.college_state,
    college_pin_code:this.editData.add.college_pin_code,
    college_type:this.editData.add.college_type,
    drive_type:this.editData.add.drive_type,
    aadhar_number:['',Validators.required],
    name:['',Validators.required],
    sex:['',Validators.required],
    qualification:['',Validators.required],
    stream:['',Validators.required],
    package:[],
    contact_no1:['',Validators.required],
    contact_no2:['',Validators.required],
    status:['',Validators.required],
    hr_remarks:['',Validators.required],
    college:['',Validators.required],
    type:'vsr',
    category:'Drive',
    created_by:this.createdBy
  })

 }

if(this.editData.data){
  var category=document.getElementById('category');
  var type=document.getElementById('type');
  category?.removeAttribute('hidden');
  type?.removeAttribute('hidden');

  this.targetValue=this.editData.data.qualification
  this.getAllStream();
console.log(this.editData.data.package,this.editData.data.category)
  this.submit='Update Student'
  this.studentForm.controls['category'].setValue(this.editData.data.category);
  this.studentForm.controls['type'].setValue(this.editData.data.type);
  this.studentForm.controls['aadhar_number'].setValue(this.editData.data.aadhar_number);
  this.studentForm.controls['name'].setValue(this.editData.data.name);
  this.studentForm.controls['sex'].setValue(this.editData.data.sex);
  this.studentForm.controls['qualification'].setValue(this.editData.data.qualification);
  this.studentForm.controls['stream'].setValue(this.editData.data.stream);
  this.studentForm.controls['package'].setValue(this.editData.data.package[0]._id);
  this.studentForm.controls['contact_no1'].setValue(this.editData.data.contact_no1);
  this.studentForm.controls['contact_no2'].setValue(this.editData.data.contact_no2);
  this.studentForm.controls['status'].setValue(this.editData.data.status);
  this.studentForm.controls['hr_remarks'].setValue(this.editData.data.hr_remarks);
  this.studentForm.controls['college_type'].setValue(this.editData.data.college_type);

  }

  if(this.editData.message){
    var category=document.getElementById('category');
    var type=document.getElementById('type');
    var college=document.getElementById('college');
    var college_name=document.getElementById('college_name');
    var college_city=document.getElementById('college_city');
    var college_state=document.getElementById('college_state');
    var college_pin_code=document.getElementById('college_pin_code');
    var college_type=document.getElementById('college_type');
  
    category?.removeAttribute('hidden');
    type?.removeAttribute('hidden');
    college?.removeAttribute('hidden');
    college_name?.removeAttribute('hidden');
    college_city?.removeAttribute('hidden');
    college_state?.removeAttribute('hidden');
    college_pin_code?.removeAttribute('hidden');
    college_type?.removeAttribute('hidden');
  }

  }

  changeCategory(){
    var refrence_name=document.getElementById('refrence_name');
    var refrence_contact=document.getElementById('refrence_contact');
    if(this.studentForm.value.category=='reference'){
      refrence_name?.removeAttribute('hidden');
      refrence_contact?.removeAttribute('hidden')
    } 
  else{
    refrence_name?.setAttribute('hidden','');
    refrence_contact?.setAttribute('hidden','');

  }
  }


  Packagedata(){
 const id= this.studentForm.value.package;
  this.allPackage.find((x:any)=>{
if(x._id==id){
this.packageData=x;
}
  })
  this.studentForm.controls['package'].setValue(this.packageData);

  }

  collegeData(){
    if(this.studentForm.value.college=='other'){
      this.studentForm.controls['college_name'].reset();
      this.studentForm.controls['college_city'].reset();
      this.studentForm.controls['college_state'].reset();
      this.studentForm.controls['college_pin_code'].reset();
      this.studentForm.controls['college_type'].reset();

    }
  
    
   else{
    var filter= this.AllColleges.filter((x:any)=>
    x._id==this.studentForm.value.college)
    this.filterData=filter;
    this.studentForm.controls['college_name'].setValue(this.filterData[0].college_name);
    this.studentForm.controls['college_city'].setValue(this.filterData[0].college_city);
    this.studentForm.controls['college_state'].setValue(this.filterData[0].college_state);
    this.studentForm.controls['college_pin_code'].setValue(this.filterData[0].college_pin_code_code);
    this.studentForm.controls['college_type'].setValue(this.filterData[0].college_type);
   }
  }

  target(data:any) {
    // this.targetValue=(event.target as HTMLInputElement).value;
    // console.log(data)
    this.targetValue=this.studentForm.value.qualification
    console.log(this.targetValue)
    this.getAllStream();
  }

  getAllColleges(){
this.api3.getAllColleges().subscribe({
  next:(res)=>{
this.AllColleges=res;
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

  addStudents(){    
if(this.editData.message){
 this.api.addStudents(this.studentForm.value).subscribe({
  next:(res)=>{
    Swal.fire(
      'Good job!',
      'Student Added Successfully',
      'success'
    )
    this.studentForm.reset();
    this.dialog.close("Add");
  },
  error:(err)=>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something Went Wrong!',
      footer: err
    })
  }
 })
 if(this.studentForm.value.college=='other'){
this.api3.addColleges(this.studentForm.value).subscribe({
  next:(res)=>{
    console.log(res);
  }
  ,error:(err)=>{
    console.log(err);
  }
})
 }
} 
else if(this.editData.data){
  this.updateColleges()
}
else{
    if(this.studentForm.value.aadhar_number=='' ||this.studentForm.value.name=='' ||this.studentForm.value.sex=='' ||this.studentForm.value.stream==''){
      console.log('Fill All the fields')
    }
    else{
      this.api.addStudents(this.studentForm.value).subscribe({
        next:(res)=>{
          if(res.name=='ValidationError'){
            this.errors=res.errors    
            console.log(res.errors)
            //  this.errors=res.errors;
            // this.errors.sort((x:any)=>{
            //   console.log(x.message);
            // })
          }
          console.log(res)
          if(res.message=='Student already Saved'){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Student Already Exist!'
            })
          }
          else{
            Swal.fire(
              'Good job!',
              'Student Added Successfully',
              'success'
            )
          }
        
          this.studentForm.reset();
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

  updateColleges(){
    this.api.updateStudents(this.editData.data._id,this.studentForm.value).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'Student Updated Successfully',
          'success'
        )
        this.studentForm.reset();
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


  getQualification(){
   this.api2.getAllQualification().subscribe({
    next:(res)=>{
      this.qualification=res;
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

  getAllStream(){
    this.api2.getAllStream().subscribe({
      next:(res)=>{
      var data=res.filter((x:any)=>
      x.qualification_name==this.targetValue
)
this.stream=data;

console.log(this.stream)
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

  getAllPackage(){
    this.api2.getAllPackage().subscribe({
      next:(res)=>{
        this.allPackage=res;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
