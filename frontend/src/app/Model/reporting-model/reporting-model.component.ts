import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { BatchesService } from 'src/app/services/batches.service';
import {
  ReportingService
} from 'src/app/services/reporting.service';
import {
  SettingService
} from 'src/app/services/setting.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reporting-model',
  templateUrl: './reporting-model.component.html',
  styleUrls: ['./reporting-model.component.css']
})
export class ReportingModelComponent implements OnInit {
  reportingForm!: FormGroup;
  Submit = 'Add Reporting';
  token: any;
  createdBy: any;
  errors: any;
  date: any;
  adharData: any;
  data: any;
  AllLocation: any;
  AllDesignation: any;
  AllQualification: any;
  AllStream: any;
  AllFinancialYear: any;
  targetValue: any;
  AllVSR:any;
  AllBatches:any;
  findBatch:any
  constructor(private formbuilder: FormBuilder,private api3:BatchesService,private dialog:MatDialogRef<ReportingModelComponent> , @Inject(MAT_DIALOG_DATA) private editData:any, private api:ReportingService, private api2:SettingService) {}

  ngOnInit(): void {
    this.getAllBatches();
    this.getAllVSR();
    this.getallDepartment();
    this.getallSubDepartment();
    this.getAllDesignation();
    this.getAllFinancial();
    this.getAllLocation();
    this.getAllQualification();
    this.getAllStream();
    this.token = localStorage.getItem('token');
    this.token = jwtDecode(this.token);
    this.createdBy = this.token.username;
    this.reportingForm = this.formbuilder.group({
      aadhar_number: ['', Validators.required],
      college_name: ['', Validators.required],
      employee_type: ['', Validators.required],
      total_vsr: ['', Validators.required],
      paid_vsr: ['', Validators.required],
      fine: ['', Validators.required],
      paid_fine: ['', Validators.required],
      paid_other: ['', Validators.required],
      fineWaiver: ['', Validators.required],
      otherWaiver: ['', Validators.required],
      select_batch: [],
      other:['', Validators.required],
      vsrWaiver: ['', Validators.required],
      pending_value: ['', Validators.required],
      selection_type: ['', Validators.required],
      reported_at: ['', Validators.required],
      batch_starting_date: ['', Validators.required],
      employee_name: ['', Validators.required],
      father_name: ['', Validators.required],
      mother_name: ['', Validators.required],
      package: ['', Validators.required],
      gender: ['', Validators.required],
      blood_group: ['', Validators.required],
      contact_no1: ['', Validators.required],
      contact_no2: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      identity_mark: ['', Validators.required],
      maritial_status: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      subDepartment: ['', Validators.required],
      nationality: ['', Validators.required],
      religion: ['', Validators.required],
      college_city: ['', Validators.required],
      college_state: ['', Validators.required],
      qualification: ['', Validators.required],
      stream: ['', Validators.required],
      financial_year: ['', Validators.required],
      offer_letter_account: ['', Validators.required],
      band: ['', Validators.required],
      offer_letter_date: ['', Validators.required],
      reported_by: ['', Validators.required],
      status:1,
      created_by: this.createdBy
    })


    if (this.editData) {
      console.log(this.editData)
      var hide = document.getElementById('hidden');
      hide?.setAttribute('hidden', '');
      var report=document.getElementById('report');
      report?.removeAttribute('hidden')
      var btn1=document.getElementById('btn1');
      var btn2=document.getElementById('btn2');
      btn1?.removeAttribute('hidden')
      btn2?.removeAttribute('hidden')


      this.Submit = "Update Reporting"
      this.reportingForm.controls['aadhar_number'].setValue(this.editData.aadhar_number);
      this.reportingForm.controls['employee_type'].setValue(this.editData.employee_type);
      this.reportingForm.controls['total_vsr'].setValue(this.editData.total_vsr);
      this.reportingForm.controls['selection_type'].setValue(this.editData.selection_type);
      this.reportingForm.controls['reported_at'].setValue(this.editData.reported_at);
      this.reportingForm.controls['batch_starting_date'].setValue(this.editData.batch_starting_date);
      this.reportingForm.controls['employee_name'].setValue(this.editData.employee_name);
      this.reportingForm.controls['father_name'].setValue(this.editData.father_name);
      this.reportingForm.controls['mother_name'].setValue(this.editData.mother_name);
      this.reportingForm.controls['gender'].setValue(this.editData.gender);
      this.reportingForm.controls['blood_group'].setValue(this.editData.blood_group);
      this.reportingForm.controls['contact_no1'].setValue(this.editData.contact_no1);
      this.reportingForm.controls['contact_no2'].setValue(this.editData.contact_no2);
      this.reportingForm.controls['dob'].setValue(this.editData.dob);
      this.reportingForm.controls['address'].setValue(this.editData.address);
      this.reportingForm.controls['email'].setValue(this.editData.email);
      this.reportingForm.controls['identity_mark'].setValue(this.editData.identity_mark);
      this.reportingForm.controls['maritial_status'].setValue(this.editData.maritial_status);
      this.reportingForm.controls['designation'].setValue(this.editData.designation);
      this.reportingForm.controls['department'].setValue(this.editData.department);
      this.reportingForm.controls['subDepartment'].setValue(this.editData.subDepartment);
      this.reportingForm.controls['nationality'].setValue(this.editData.nationality);
      this.reportingForm.controls['religion'].setValue(this.editData.religion);
      this.reportingForm.controls['college_name'].setValue(this.editData.college_name);
      this.reportingForm.controls['college_city'].setValue(this.editData.college_city);
      this.reportingForm.controls['college_state'].setValue(this.editData.college_state);
      this.reportingForm.controls['qualification'].setValue(this.editData.qualification);
      this.reportingForm.controls['stream'].setValue(this.editData.stream);
      this.reportingForm.controls['financial_year'].setValue(this.editData.financial_year);
      this.reportingForm.controls['offer_letter_account'].setValue(this.editData.offer_letter_account);
      this.reportingForm.controls['band'].setValue(this.editData.band);
      this.reportingForm.controls['offer_letter_date'].setValue(this.editData.offer_letter_date);
      this.reportingForm.controls['reported_by'].setValue(this.editData.reported_by);
      this.reportingForm.controls['select_batch'].setValue(this.editData.select_batch[0]._id);

    }
  }

  batch(){
    const id=this.reportingForm.value.select_batch;
    this.AllBatches.find((x:any)=>{
     if(x._id==id){
    this.findBatch=x;
     }

    })
    this.reportingForm.controls['select_batch'].setValue(this.findBatch);
  }
  getAllVSR(){
    this.api2.getAllVsrValue().subscribe({
      next:(res)=>{
        this.AllVSR=res;
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

  getAllBatches(){
    this.api3.getAllBateches().subscribe({
      next:(res)=>{
        this.AllBatches=res;
      },
      error:(err)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Oops Something Went Wrong!',
        })
      }
    })
  }
  validate() {
    var adhar = this.reportingForm.value;
    this.api.validate(adhar).subscribe({
      next: (res) => {
            if (res.message == "Student Not Found") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Student Not Found!',
          })
        } 
        else{
          this.data = res;
          Swal.fire(
            this.data.name + '!',
            'Student Found Successfully',
            'success'
          );

          
          var hide = document.getElementById('hidden');
          hide?.setAttribute('hidden', '')


          var report =document.getElementById('report');
          report?.removeAttribute('hidden')

          var button1 =document.getElementById('btn1');
          button1?.removeAttribute('hidden')

          var button2 =document.getElementById('btn2');
          button2?.removeAttribute('hidden')
          this.reportingForm.controls['employee_type'].setValue(this.data.type);
          this.reportingForm.controls['aadhar_number'].setValue(this.data.aadhar_number);
          this.reportingForm.controls['college_name'].setValue(this.data.college_name);
          this.reportingForm.controls['college_city'].setValue(this.data.college_city);
          this.reportingForm.controls['college_state'].setValue(this.data.college_state);
          this.reportingForm.controls['package'].setValue(this.data.package);
          this.reportingForm.controls['gender'].setValue(this.data.sex);
          this.reportingForm.controls['employee_name'].setValue(this.data.name);
          this.reportingForm.controls['contact_no1'].setValue(this.data.contact_no1);
          this.reportingForm.controls['contact_no2'].setValue(this.data.contact_no2);
          this.reportingForm.controls['qualification'].setValue(this.data.qualification);
          this.reportingForm.controls['stream'].setValue(this.data.stream);
          this.reportingForm.controls['selection_type'].setValue(this.data.category);



          this.reportingForm.controls['paid_vsr'].setValue(0);
          this.reportingForm.controls['fine'].setValue(0);
          this.reportingForm.controls['paid_fine'].setValue(0);
          this.reportingForm.controls['paid_other'].setValue(0);
          this.reportingForm.controls['fineWaiver'].setValue(0);
          this.reportingForm.controls['vsrWaiver'].setValue(0);
          this.reportingForm.controls['other'].setValue(0);
          this.reportingForm.controls['otherWaiver'].setValue(0);

        var total_vsr=document.getElementById('total_vsr');
        var batch =document.getElementById('batch');
        if(this.reportingForm.value.employee_type!='vsr'){
          total_vsr?.setAttribute('hidden','');
          batch?.setAttribute('hidden','');
        }
        }
        // }
      },
      error: (err) => {
        console.log(err)
      }
    })
    this.ngOnInit();
  }

  type(){
    var total_vsr=document.getElementById('total_vsr');
    var batch =document.getElementById('batch');
    if(this.reportingForm.value.employee_type=='exp'){
        total_vsr?.setAttribute('hidden','');
        batch?.setAttribute('hidden','');
    }
    else{
      total_vsr?.removeAttribute('hidden');
        batch?.removeAttribute('hidden');
    }
  }

  getAllLocation() {
    this.api2.getAllLocation().subscribe({
      next: (res) => {
        this.AllLocation = res;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: err
        })
      }
    })
  }

  getAllDesignation() {
    this.api2.getAllDesignation().subscribe({
      next: (res) => {
        this.AllDesignation = res;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: err
        })
      }
    })
  }
 SubDepartment:any=[]
 designationSelect:any=[]
  DepartmentChange(event:Event){
    const val=(event.target as HTMLInputElement).value;
   this.SubDepartment= this.AllSubDepartment.filter((x:any)=>
      x.head_department==val
    )


    this.designationSelect= this.AllDesignation.filter((y:any)=>
    y.head_department==val
  )
  
  }
  
AllSubDepartment:any=[]
  getallSubDepartment(){
    this.api2.getAllSubdepartment().subscribe({
      next: (res) => {
        this.AllSubDepartment = res;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: err
        })
      }
    })
  }

  AllDepartment:any=[]
  getallDepartment(){
    this.api2.getAllDepartment().subscribe({
      next: (res) => {
        this.AllDepartment = res;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: err
        })
      }
    })
  }

  getAllQualification() {
    this.api2.getAllQualification().subscribe({
      next: (res) => {
        this.AllQualification = res;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: err
        })
      }
    })
  }

  getAllStream() {
    this.api2.getAllStream().subscribe({
      next: (res) => {
        this.AllStream = res;

      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: err
        })
      }
    })
  }

  getAllFinancial() {
    this.api2.getAllFinancial().subscribe({
      next: (res) => {
        this.AllFinancialYear = res;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: err
        })
      }
    })
  }

  addReporting() {
    console.log(this.reportingForm.value)
        if(!this.editData){
          this.api.addReporting(this.reportingForm.value).subscribe({
            next: (res) => {
              if(res.message=='Reporting Exist'){
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Reporting Exist!',
                })
              }
              Swal.fire(
                'Good job!',
                'Reporting Added Successfully',
                'success'
              )
          this.reportingForm.reset();
          this.dialog.close("Add");
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: err
              })
            }
          })       
        }
    else{
      this.updateReporting()
    }

  }

  updateReporting(){
    this.api.updateReporting(this.editData._id,this.reportingForm.value).subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'Reporting Updated Successfully',
          'success'
        )
        this.reportingForm.reset();
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




}
