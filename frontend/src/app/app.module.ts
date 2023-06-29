import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { HeaderComponent } from './Component/header/header.component';
import { SidebarComponent } from './Component/sidebar/sidebar.component';
import { PanelComponent } from './Component/panel/panel.component';
import { LoginComponent } from './Pages/login/login.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { UserComponent } from './Pages/Admin/user/user.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModelComponent } from './Model/user-model/user-model.component';
import {MatDialogModule} from '@angular/material/dialog';
import { Home1Component } from './Pages/User/home1/home1.component';
import { HeaderUserComponent } from './Component/header-user/header-user.component';
import { SidebarUserComponent } from './Component/sidebar-user/sidebar-user.component';
import { TrainingBatchesComponent } from './Pages/training-batches/training-batches.component';
import { TrainingModelComponent } from './Model/training-model/training-model.component';
import { CollegesComponent } from './Pages/colleges/colleges.component';
import { CollegeModelComponent } from './Model/college-model/college-model.component';
import { DriveComponent } from './Pages/drive/drive.component';
import { DriveModelComponent } from './Model/drive-model/drive-model.component';
import { TokenInterceptor } from './services/token.interceptor';
import { StudentModelComponent } from './Model/student-model/student-model.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { StudentComponent } from './Pages/student/student.component';
import { Student1ModelComponent } from './Model/student1-model/student1-model.component';
import { SettingComponent } from './Pages/setting/setting.component';
import { LocationModelComponent } from './Model/location-model/location-model.component';
import { FinancialModelComponent } from './Model/financial-model/financial-model.component';
import { HeaddepartmentModelComponent } from './Model/headdepartment-model/headdepartment-model.component';
import { SubdepartmentModelComponent } from './Model/subdepartment-model/subdepartment-model.component';
import { DesignationModelComponent } from './Model/designation-model/designation-model.component';
import { QualificationModelComponent } from './Model/qualification-model/qualification-model.component';
import { StreamModelComponent } from './Model/stream-model/stream-model.component';
import { PackageModelComponent } from './Model/package-model/package-model.component';
import { ShiftBreakModelComponent } from './Model/shift-break-model/shift-break-model.component';
import { VsrValueModelComponent } from './Model/vsr-value-model/vsr-value-model.component';
import { LedgersModelComponent } from './Model/ledgers-model/ledgers-model.component';
import {MatMenuModule} from '@angular/material/menu';
import { ReportingComponent } from './Pages/reporting/reporting.component';
import { ReportingModelComponent } from './Model/reporting-model/reporting-model.component';
import { RecieptModelComponent } from './Model/reciept-model/reciept-model.component';
import { FineModelComponent } from './Model/fine-model/fine-model.component';
import { FineWaiverModelComponent } from './Model/fine-waiver-model/fine-waiver-model.component';
import { VSRWaiverModelComponent } from './Model/vsrwaiver-model/vsrwaiver-model.component';
import { RecieptComponent } from './Pages/reciept/reciept.component';
import { FineComponent } from './Pages/fine/fine.component';
import { FineWaiverComponent } from './Pages/fine-waiver/fine-waiver.component';
import { VSRWaiverComponent } from './Pages/vsrwaiver/vsrwaiver.component';
import { JobStatusComponent } from './Pages/EmpStatus/job-status/job-status.component';
import { AwaitedComponent } from './Pages/EmpStatus/awaited/awaited.component';
import { InTrainingComponent } from './Pages/EmpStatus/in-training/in-training.component';
import { TrainingCompletedComponent } from './Pages/EmpStatus/training-completed/training-completed.component';
import { JoinedComponent } from './Pages/EmpStatus/joined/joined.component';
import { LeftComponent } from './Pages/EmpStatus/left/left.component';
import { ClientComponent } from './Pages/Client/client.component';
import { ClientModelComponent } from './Model/client-model/client-model.component';
import { TrainingsComponent } from './Pages/trainings/trainings.component';
import { TestQuestionsComponent } from './Pages/test-questions/test-questions.component';
import { TrainingTestsComponent } from './Pages/training-tests/training-tests.component';
import { JoiningsComponent } from './Pages/joinings/joinings.component';
import { QuestionModelComponent } from './Model/question-model/question-model.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TrainingTestModelComponent } from './Model/training-test-model/training-test-model.component';
import { AddQuestionModelComponent } from './Model/add-question-model/add-question-model.component';
import { AddUserModelComponent } from './Model/add-user-model/add-user-model.component';
import { BatchSizeComponent } from './Pages/batch-size/batch-size.component';
import { BatchSizeModelComponent } from './Model/batch-size-model/batch-size-model.component';
import { TrainersComponent } from './Pages/trainers/trainers.component';
import { TrainersModelComponent } from './Model/trainers-model/trainers-model.component';
import { OtherChargeComponent } from './Pages/other-charge/other-charge.component';
import { OtherChargeModelComponent } from './Model/other-charge-model/other-charge-model.component';
import { OtherWaiverComponent } from './Pages/other-waiver/other-waiver.component';
import { OtherWaiverModelComponent } from './Model/other-waiver-model/other-waiver-model.component';
import { InPoolComponent } from './Pages/in-pool/in-pool.component';
import { AddIntrainingModelComponent } from './Model/add-intraining-model/add-intraining-model.component';
import { AddTrainingCompleteModelComponent } from './Model/add-training-complete-model/add-training-complete-model.component';
import { AddJoinedModelComponent } from './Model/add-joined-model/add-joined-model.component';
import { AddLeftModelComponent } from './Model/add-left-model/add-left-model.component';
import { LOAModelComponent } from './Model/loamodel/loamodel.component';
import { IntrainingComponent } from './Pages/intraining/intraining.component';
import { TrainingcompletedComponent } from './Pages/trainingcompleted/trainingcompleted.component';
import { LeftStatusComponent } from './Pages/left-status/left-status.component';
import { JoinedStatusComponent } from './Pages/joined-status/joined-status.component';
import { AwaitedStatusComponent } from './Pages/awaited-status/awaited-status.component';
import { HrMeetingComponent } from './Pages/Metting/hr-meeting/hr-meeting.component';
import { DirectorMeetingComponent } from './Pages/Metting/director-meeting/director-meeting.component';
import { HrActivityComponent } from './Pages/Metting/hr-activity/hr-activity.component';
import { HrActivityModelComponent } from './Model/hr-activity-model/hr-activity-model.component';
import { HrMeetingModelComponent } from './Model/hr-meeting-model/hr-meeting-model.component';
import { DirectorMeetingModelComponent } from './Model/director-meeting-model/director-meeting-model.component';
import { RelievingComponent } from './Pages/relieving/relieving.component';
import { RelievingModelComponent } from './Model/relieving-model/relieving-model.component';
import { EmpServiceRecordComponent } from './Pages/emp-service-record/emp-service-record.component';
import { LeaveBucketComponent } from './Pages/leave-bucket/leave-bucket.component';
import { RefundsComponent } from './Pages/refunds/refunds.component';
import { Refunds1Component } from './Pages/refunds1/refunds1.component';
import { Refund1ModelComponent } from './Model/refund1-model/refund1-model.component';
import { Refund2ModelComponent } from './Model/refund2-model/refund2-model.component';
import { Refund3ModelComponent } from './Model/refund3-model/refund3-model.component';
import { RefundPaymentModelComponent } from './Model/refund-payment-model/refund-payment-model.component';
import { AddProjectComponent } from './Model/add-project/add-project.component';
import { AddOrderComponent } from './Model/add-order/add-order.component';
import { AddInvoiceComponent } from './Model/add-invoice/add-invoice.component';
import { ViewInvoiceComponent } from './Model/view-invoice/view-invoice.component';
import { OrdersComponent } from './Pages/orders/orders.component';
import { InvoiceComponent } from './Pages/invoice/invoice.component';
import { TeamComponent } from './Pages/team/team.component';
import { TeamModelComponent } from './Model/team-model/team-model.component';
import { TeammemberModelComponent } from './Model/teammember-model/teammember-model.component';
import { ViewTeamModelComponent } from './Model/view-team-model/view-team-model.component';
import { TotalProjectComponent } from './Pages/total-project/total-project.component';
import { TotalAssignmentModelComponent } from './Model/total-assignment-model/total-assignment-model.component';
import { TotalTaskComponent } from './Pages/total-task/total-task.component';
import { TotalAssignmentComponent } from './Pages/total-assignment/total-assignment.component';
import { AddTaskModelComponent } from './Model/add-task-model/add-task-model.component';
import { AddAssignTaskModelComponent } from './Model/add-assign-task-model/add-assign-task-model.component';
import { AssignedTaskComponent } from './Pages/assigned-task/assigned-task.component';
import { CompletedTaskComponent } from './Pages/completed-task/completed-task.component';
import { FailedTaskComponent } from './Pages/failed-task/failed-task.component';
import { TimesetComponent } from './Pages/Timer/timeset/timeset.component';
import { HeaderFinalComponent } from './Component/header-final/header-final.component';
import { ChangeStateModelComponent } from './Model/change-state-model/change-state-model.component';
import { EmpPerformanceComponent } from './Pages/emp-performance/emp-performance.component';
import { EmpPerformanceModelComponent } from './Model/emp-performance-model/emp-performance-model.component';
import { EmpServiceRecordModelComponent } from './Model/emp-service-record-model/emp-service-record-model.component';
import { MainAdminFullComponent } from './Component/main-admin-full/main-admin-full.component';
import { MainUserFullComponent } from './Component/main-user-full/main-user-full.component';
import { IndexComponent } from './Pages/User/index/index.component';
import { UsertotalAssignmentComponent } from './Pages/User/usertotal-assignment/usertotal-assignment.component';
import { UserAssignedTaskComponent } from './Pages/User/user-assigned-task/user-assigned-task.component';
import { UserCompletedTaskComponent } from './Pages/User/user-completed-task/user-completed-task.component';
import { UserFailedTaskComponent } from './Pages/User/user-failed-task/user-failed-task.component';
import { AssignComponent } from './Pages/Common/assign/assign.component';
import { CompleteComponent } from './Pages/Common/complete/complete.component';
import { FailComponent } from './Pages/Common/fail/fail.component';
import { AddPopupComponent } from './Pages/Popup/add-popup/add-popup.component';
import { AddNormalComponent } from './Model/add-normal/add-normal.component';
import { AddNormalUserModelComponent } from './Model/add-normal-user-model/add-normal-user-model.component';
import { SystemAttendenceComponent } from './Pages/system-attendence/system-attendence.component';
import { AttandanceDataModelComponent } from './Model/attandance-data-model/attandance-data-model.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AttendenceTableDetailComponent } from './Model/attendence-table-detail/attendence-table-detail.component';
import { AllRecordsAttendenceModelComponent } from './Model/all-records-attendence-model/all-records-attendence-model.component';
import { FinancialYearComponent } from './Pages/SettingPages/financial-year/financial-year.component';
import { HeadDepartmentComponent } from './Pages/SettingPages/head-department/head-department.component';
import { SubDepartmentComponent } from './Pages/SettingPages/sub-department/sub-department.component';
import { DesignationsComponent } from './Pages/SettingPages/designations/designations.component';
import { QualificationComponent } from './Pages/SettingPages/qualification/qualification.component';
import { StreamComponent } from './Pages/SettingPages/stream/stream.component';
import { PackagesComponent } from './Pages/SettingPages/packages/packages.component';
import { ShiftBreakComponent } from './Pages/SettingPages/shift-break/shift-break.component';
import { VsrValueComponent } from './Pages/SettingPages/vsr-value/vsr-value.component';
import { LedgerComponent } from './Pages/SettingPages/ledger/ledger.component';
import { PanelCollegeComponent } from './Pages/CollegeAll/panel-college/panel-college.component';
import { ProposedCollegeComponent } from './Pages/CollegeAll/proposed-college/proposed-college.component';
import { AttendenceComponent } from './Pages/Common/attendence/attendence.component';



 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    PanelComponent,
    LoginComponent,
    UserComponent,
    UserModelComponent,
    Home1Component,
    HeaderUserComponent,
    SidebarUserComponent,
    TrainingBatchesComponent,
    TrainingModelComponent,
    CollegesComponent,
    CollegeModelComponent,
    DriveComponent,
    DriveModelComponent,
    StudentModelComponent,
    StudentComponent,
    Student1ModelComponent,
    SettingComponent,
    LocationModelComponent,
    FinancialModelComponent,
    HeaddepartmentModelComponent,
    SubdepartmentModelComponent,
    DesignationModelComponent,
    QualificationModelComponent,
    StreamModelComponent,
    PackageModelComponent,
    ShiftBreakModelComponent,
    VsrValueModelComponent,
    LedgersModelComponent,
    ReportingComponent,
    ReportingModelComponent,
    RecieptModelComponent,
    FineModelComponent,
    FineWaiverModelComponent,
    VSRWaiverModelComponent,
    RecieptComponent,
    FineComponent,
    FineWaiverComponent,
    VSRWaiverComponent,
    JobStatusComponent,
    AwaitedComponent,
    InTrainingComponent,
    TrainingCompletedComponent,
    JoinedComponent,
    LeftComponent,
    ClientComponent,
    ClientModelComponent,
    TrainingsComponent,
    TestQuestionsComponent,
    TrainingTestsComponent,
    JoiningsComponent,
    QuestionModelComponent,
    TrainingTestModelComponent,
    AddQuestionModelComponent,
    AddUserModelComponent,
    BatchSizeComponent,
    BatchSizeModelComponent,
    TrainersComponent,
    TrainersModelComponent,
    OtherChargeComponent,
    OtherChargeModelComponent,
    OtherWaiverComponent,
    OtherWaiverModelComponent,
    InPoolComponent,
    AddIntrainingModelComponent,
    AddTrainingCompleteModelComponent,
    AddJoinedModelComponent,
    AddLeftModelComponent,
    LOAModelComponent,
    IntrainingComponent,
    TrainingcompletedComponent,
    LeftStatusComponent,
    JoinedStatusComponent,
    AwaitedStatusComponent,
    HrMeetingComponent,
    DirectorMeetingComponent,
    HrActivityComponent,
    HrActivityModelComponent,
    HrMeetingModelComponent,
    DirectorMeetingModelComponent,
    RelievingComponent,
    RelievingModelComponent,
    EmpServiceRecordComponent,
    LeaveBucketComponent,
    RefundsComponent,
    Refunds1Component,
    Refund1ModelComponent,
    Refund2ModelComponent,
    Refund3ModelComponent,
    RefundPaymentModelComponent,
    AddProjectComponent,
    AddOrderComponent,
    AddInvoiceComponent,
    ViewInvoiceComponent,
    OrdersComponent,
    InvoiceComponent,
    TeamComponent,
    TeamModelComponent,
    TeammemberModelComponent,
    ViewTeamModelComponent,
    TotalProjectComponent,
    TotalAssignmentModelComponent,
    TotalTaskComponent,
    TotalAssignmentComponent,
    AddTaskModelComponent,
    AddAssignTaskModelComponent,
    AssignedTaskComponent,
    CompletedTaskComponent,
    FailedTaskComponent,
    TimesetComponent,
    HeaderFinalComponent,
    ChangeStateModelComponent,
    EmpPerformanceComponent,
    EmpPerformanceModelComponent,
    EmpServiceRecordModelComponent,
    MainAdminFullComponent,
    MainUserFullComponent,
    IndexComponent,
    UsertotalAssignmentComponent,
    UserAssignedTaskComponent,
    UserCompletedTaskComponent,
    UserFailedTaskComponent,
    AssignComponent,
    CompleteComponent,
    FailComponent,
    AddPopupComponent,
    AddNormalComponent,
    AddNormalUserModelComponent,
    SystemAttendenceComponent,
    AttandanceDataModelComponent,
    AttendenceTableDetailComponent,
    AllRecordsAttendenceModelComponent,
    FinancialYearComponent,
    HeadDepartmentComponent,
    SubDepartmentComponent,
    DesignationsComponent,
    QualificationComponent,
    StreamComponent,
    PackagesComponent,
    ShiftBreakComponent,
    VsrValueComponent,
    LedgerComponent,
    PanelCollegeComponent,
    ProposedCollegeComponent,
    AttendenceComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatMenuModule,
        CKEditorModule,
        FullCalendarModule
  ],
  providers: [HttpClientModule,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
