"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var home_component_1 = require("./Pages/home/home.component");
var header_component_1 = require("./Component/header/header.component");
var sidebar_component_1 = require("./Component/sidebar/sidebar.component");
var panel_component_1 = require("./Component/panel/panel.component");
var login_component_1 = require("./Pages/login/login.component");
var http_1 = require("@angular/common/http");
var user_component_1 = require("./Pages/Admin/user/user.component");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var user_model_component_1 = require("./Model/user-model/user-model.component");
var dialog_1 = require("@angular/material/dialog");
var home1_component_1 = require("./Pages/User/home1/home1.component");
var header_user_component_1 = require("./Component/header-user/header-user.component");
var sidebar_user_component_1 = require("./Component/sidebar-user/sidebar-user.component");
var training_batches_component_1 = require("./Pages/training-batches/training-batches.component");
var training_model_component_1 = require("./Model/training-model/training-model.component");
var colleges_component_1 = require("./Pages/colleges/colleges.component");
var college_model_component_1 = require("./Model/college-model/college-model.component");
var drive_component_1 = require("./Pages/drive/drive.component");
var drive_model_component_1 = require("./Model/drive-model/drive-model.component");
var token_interceptor_1 = require("./services/token.interceptor");
var student_model_component_1 = require("./Model/student-model/student-model.component");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var icon_1 = require("@angular/material/icon");
var student_component_1 = require("./Pages/student/student.component");
var student1_model_component_1 = require("./Model/student1-model/student1-model.component");
var setting_component_1 = require("./Pages/setting/setting.component");
var location_model_component_1 = require("./Model/location-model/location-model.component");
var financial_model_component_1 = require("./Model/financial-model/financial-model.component");
var headdepartment_model_component_1 = require("./Model/headdepartment-model/headdepartment-model.component");
var subdepartment_model_component_1 = require("./Model/subdepartment-model/subdepartment-model.component");
var designation_model_component_1 = require("./Model/designation-model/designation-model.component");
var qualification_model_component_1 = require("./Model/qualification-model/qualification-model.component");
var stream_model_component_1 = require("./Model/stream-model/stream-model.component");
var package_model_component_1 = require("./Model/package-model/package-model.component");
var shift_break_model_component_1 = require("./Model/shift-break-model/shift-break-model.component");
var vsr_value_model_component_1 = require("./Model/vsr-value-model/vsr-value-model.component");
var ledgers_model_component_1 = require("./Model/ledgers-model/ledgers-model.component");
var menu_1 = require("@angular/material/menu");
var reporting_component_1 = require("./Pages/reporting/reporting.component");
var reporting_model_component_1 = require("./Model/reporting-model/reporting-model.component");
var reciept_model_component_1 = require("./Model/reciept-model/reciept-model.component");
var fine_model_component_1 = require("./Model/fine-model/fine-model.component");
var fine_waiver_model_component_1 = require("./Model/fine-waiver-model/fine-waiver-model.component");
var vsrwaiver_model_component_1 = require("./Model/vsrwaiver-model/vsrwaiver-model.component");
var reciept_component_1 = require("./Pages/reciept/reciept.component");
var fine_component_1 = require("./Pages/fine/fine.component");
var fine_waiver_component_1 = require("./Pages/fine-waiver/fine-waiver.component");
var vsrwaiver_component_1 = require("./Pages/vsrwaiver/vsrwaiver.component");
var job_status_component_1 = require("./Pages/EmpStatus/job-status/job-status.component");
var awaited_component_1 = require("./Pages/EmpStatus/awaited/awaited.component");
var in_training_component_1 = require("./Pages/EmpStatus/in-training/in-training.component");
var training_completed_component_1 = require("./Pages/EmpStatus/training-completed/training-completed.component");
var joined_component_1 = require("./Pages/EmpStatus/joined/joined.component");
var left_component_1 = require("./Pages/EmpStatus/left/left.component");
var client_component_1 = require("./Pages/Client/client.component");
var client_model_component_1 = require("./Model/client-model/client-model.component");
var trainings_component_1 = require("./Pages/trainings/trainings.component");
var test_questions_component_1 = require("./Pages/test-questions/test-questions.component");
var training_tests_component_1 = require("./Pages/training-tests/training-tests.component");
var joinings_component_1 = require("./Pages/joinings/joinings.component");
var question_model_component_1 = require("./Model/question-model/question-model.component");
var ckeditor5_angular_1 = require("@ckeditor/ckeditor5-angular");
var training_test_model_component_1 = require("./Model/training-test-model/training-test-model.component");
var add_question_model_component_1 = require("./Model/add-question-model/add-question-model.component");
var add_user_model_component_1 = require("./Model/add-user-model/add-user-model.component");
var batch_size_component_1 = require("./Pages/batch-size/batch-size.component");
var batch_size_model_component_1 = require("./Model/batch-size-model/batch-size-model.component");
var trainers_component_1 = require("./Pages/trainers/trainers.component");
var trainers_model_component_1 = require("./Model/trainers-model/trainers-model.component");
var other_charge_component_1 = require("./Pages/other-charge/other-charge.component");
var other_charge_model_component_1 = require("./Model/other-charge-model/other-charge-model.component");
var other_waiver_component_1 = require("./Pages/other-waiver/other-waiver.component");
var other_waiver_model_component_1 = require("./Model/other-waiver-model/other-waiver-model.component");
var in_pool_component_1 = require("./Pages/in-pool/in-pool.component");
var add_intraining_model_component_1 = require("./Model/add-intraining-model/add-intraining-model.component");
var add_training_complete_model_component_1 = require("./Model/add-training-complete-model/add-training-complete-model.component");
var add_joined_model_component_1 = require("./Model/add-joined-model/add-joined-model.component");
var add_left_model_component_1 = require("./Model/add-left-model/add-left-model.component");
var loamodel_component_1 = require("./Model/loamodel/loamodel.component");
var intraining_component_1 = require("./Pages/intraining/intraining.component");
var trainingcompleted_component_1 = require("./Pages/trainingcompleted/trainingcompleted.component");
var left_status_component_1 = require("./Pages/left-status/left-status.component");
var joined_status_component_1 = require("./Pages/joined-status/joined-status.component");
var awaited_status_component_1 = require("./Pages/awaited-status/awaited-status.component");
var hr_meeting_component_1 = require("./Pages/Metting/hr-meeting/hr-meeting.component");
var director_meeting_component_1 = require("./Pages/Metting/director-meeting/director-meeting.component");
var hr_activity_component_1 = require("./Pages/Metting/hr-activity/hr-activity.component");
var hr_activity_model_component_1 = require("./Model/hr-activity-model/hr-activity-model.component");
var hr_meeting_model_component_1 = require("./Model/hr-meeting-model/hr-meeting-model.component");
var director_meeting_model_component_1 = require("./Model/director-meeting-model/director-meeting-model.component");
var relieving_component_1 = require("./Pages/relieving/relieving.component");
var relieving_model_component_1 = require("./Model/relieving-model/relieving-model.component");
var emp_service_record_component_1 = require("./Pages/emp-service-record/emp-service-record.component");
var leave_bucket_component_1 = require("./Pages/leave-bucket/leave-bucket.component");
var refunds_component_1 = require("./Pages/refunds/refunds.component");
var refunds1_component_1 = require("./Pages/refunds1/refunds1.component");
var refund1_model_component_1 = require("./Model/refund1-model/refund1-model.component");
var refund2_model_component_1 = require("./Model/refund2-model/refund2-model.component");
var refund3_model_component_1 = require("./Model/refund3-model/refund3-model.component");
var refund_payment_model_component_1 = require("./Model/refund-payment-model/refund-payment-model.component");
var add_project_component_1 = require("./Model/add-project/add-project.component");
var add_order_component_1 = require("./Model/add-order/add-order.component");
var add_invoice_component_1 = require("./Model/add-invoice/add-invoice.component");
var view_invoice_component_1 = require("./Model/view-invoice/view-invoice.component");
var orders_component_1 = require("./Pages/orders/orders.component");
var invoice_component_1 = require("./Pages/invoice/invoice.component");
var team_component_1 = require("./Pages/team/team.component");
var team_model_component_1 = require("./Model/team-model/team-model.component");
var teammember_model_component_1 = require("./Model/teammember-model/teammember-model.component");
var view_team_model_component_1 = require("./Model/view-team-model/view-team-model.component");
var total_project_component_1 = require("./Pages/total-project/total-project.component");
var total_assignment_model_component_1 = require("./Model/total-assignment-model/total-assignment-model.component");
var total_task_component_1 = require("./Pages/total-task/total-task.component");
var total_assignment_component_1 = require("./Pages/total-assignment/total-assignment.component");
var add_task_model_component_1 = require("./Model/add-task-model/add-task-model.component");
var add_assign_task_model_component_1 = require("./Model/add-assign-task-model/add-assign-task-model.component");
var assigned_task_component_1 = require("./Pages/assigned-task/assigned-task.component");
var completed_task_component_1 = require("./Pages/completed-task/completed-task.component");
var failed_task_component_1 = require("./Pages/failed-task/failed-task.component");
var timeset_component_1 = require("./Pages/Timer/timeset/timeset.component");
var header_final_component_1 = require("./Component/header-final/header-final.component");
var change_state_model_component_1 = require("./Model/change-state-model/change-state-model.component");
var emp_performance_component_1 = require("./Pages/emp-performance/emp-performance.component");
var emp_performance_model_component_1 = require("./Model/emp-performance-model/emp-performance-model.component");
var emp_service_record_model_component_1 = require("./Model/emp-service-record-model/emp-service-record-model.component");
var main_admin_full_component_1 = require("./Component/main-admin-full/main-admin-full.component");
var main_user_full_component_1 = require("./Component/main-user-full/main-user-full.component");
var index_component_1 = require("./Pages/User/index/index.component");
var usertotal_assignment_component_1 = require("./Pages/User/usertotal-assignment/usertotal-assignment.component");
var user_assigned_task_component_1 = require("./Pages/User/user-assigned-task/user-assigned-task.component");
var user_completed_task_component_1 = require("./Pages/User/user-completed-task/user-completed-task.component");
var user_failed_task_component_1 = require("./Pages/User/user-failed-task/user-failed-task.component");
var assign_component_1 = require("./Pages/Common/assign/assign.component");
var complete_component_1 = require("./Pages/Common/complete/complete.component");
var fail_component_1 = require("./Pages/Common/fail/fail.component");
var add_popup_component_1 = require("./Pages/Popup/add-popup/add-popup.component");
var add_normal_component_1 = require("./Model/add-normal/add-normal.component");
var add_normal_user_model_component_1 = require("./Model/add-normal-user-model/add-normal-user-model.component");
var system_attendence_component_1 = require("./Pages/system-attendence/system-attendence.component");
var attandance_data_model_component_1 = require("./Model/attandance-data-model/attandance-data-model.component");
var angular_1 = require("@fullcalendar/angular");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                header_component_1.HeaderComponent,
                sidebar_component_1.SidebarComponent,
                panel_component_1.PanelComponent,
                login_component_1.LoginComponent,
                user_component_1.UserComponent,
                user_model_component_1.UserModelComponent,
                home1_component_1.Home1Component,
                header_user_component_1.HeaderUserComponent,
                sidebar_user_component_1.SidebarUserComponent,
                training_batches_component_1.TrainingBatchesComponent,
                training_model_component_1.TrainingModelComponent,
                colleges_component_1.CollegesComponent,
                college_model_component_1.CollegeModelComponent,
                drive_component_1.DriveComponent,
                drive_model_component_1.DriveModelComponent,
                student_model_component_1.StudentModelComponent,
                student_component_1.StudentComponent,
                student1_model_component_1.Student1ModelComponent,
                setting_component_1.SettingComponent,
                location_model_component_1.LocationModelComponent,
                financial_model_component_1.FinancialModelComponent,
                headdepartment_model_component_1.HeaddepartmentModelComponent,
                subdepartment_model_component_1.SubdepartmentModelComponent,
                designation_model_component_1.DesignationModelComponent,
                qualification_model_component_1.QualificationModelComponent,
                stream_model_component_1.StreamModelComponent,
                package_model_component_1.PackageModelComponent,
                shift_break_model_component_1.ShiftBreakModelComponent,
                vsr_value_model_component_1.VsrValueModelComponent,
                ledgers_model_component_1.LedgersModelComponent,
                reporting_component_1.ReportingComponent,
                reporting_model_component_1.ReportingModelComponent,
                reciept_model_component_1.RecieptModelComponent,
                fine_model_component_1.FineModelComponent,
                fine_waiver_model_component_1.FineWaiverModelComponent,
                vsrwaiver_model_component_1.VSRWaiverModelComponent,
                reciept_component_1.RecieptComponent,
                fine_component_1.FineComponent,
                fine_waiver_component_1.FineWaiverComponent,
                vsrwaiver_component_1.VSRWaiverComponent,
                job_status_component_1.JobStatusComponent,
                awaited_component_1.AwaitedComponent,
                in_training_component_1.InTrainingComponent,
                training_completed_component_1.TrainingCompletedComponent,
                joined_component_1.JoinedComponent,
                left_component_1.LeftComponent,
                client_component_1.ClientComponent,
                client_model_component_1.ClientModelComponent,
                trainings_component_1.TrainingsComponent,
                test_questions_component_1.TestQuestionsComponent,
                training_tests_component_1.TrainingTestsComponent,
                joinings_component_1.JoiningsComponent,
                question_model_component_1.QuestionModelComponent,
                training_test_model_component_1.TrainingTestModelComponent,
                add_question_model_component_1.AddQuestionModelComponent,
                add_user_model_component_1.AddUserModelComponent,
                batch_size_component_1.BatchSizeComponent,
                batch_size_model_component_1.BatchSizeModelComponent,
                trainers_component_1.TrainersComponent,
                trainers_model_component_1.TrainersModelComponent,
                other_charge_component_1.OtherChargeComponent,
                other_charge_model_component_1.OtherChargeModelComponent,
                other_waiver_component_1.OtherWaiverComponent,
                other_waiver_model_component_1.OtherWaiverModelComponent,
                in_pool_component_1.InPoolComponent,
                add_intraining_model_component_1.AddIntrainingModelComponent,
                add_training_complete_model_component_1.AddTrainingCompleteModelComponent,
                add_joined_model_component_1.AddJoinedModelComponent,
                add_left_model_component_1.AddLeftModelComponent,
                loamodel_component_1.LOAModelComponent,
                intraining_component_1.IntrainingComponent,
                trainingcompleted_component_1.TrainingcompletedComponent,
                left_status_component_1.LeftStatusComponent,
                joined_status_component_1.JoinedStatusComponent,
                awaited_status_component_1.AwaitedStatusComponent,
                hr_meeting_component_1.HrMeetingComponent,
                director_meeting_component_1.DirectorMeetingComponent,
                hr_activity_component_1.HrActivityComponent,
                hr_activity_model_component_1.HrActivityModelComponent,
                hr_meeting_model_component_1.HrMeetingModelComponent,
                director_meeting_model_component_1.DirectorMeetingModelComponent,
                relieving_component_1.RelievingComponent,
                relieving_model_component_1.RelievingModelComponent,
                emp_service_record_component_1.EmpServiceRecordComponent,
                leave_bucket_component_1.LeaveBucketComponent,
                refunds_component_1.RefundsComponent,
                refunds1_component_1.Refunds1Component,
                refund1_model_component_1.Refund1ModelComponent,
                refund2_model_component_1.Refund2ModelComponent,
                refund3_model_component_1.Refund3ModelComponent,
                refund_payment_model_component_1.RefundPaymentModelComponent,
                add_project_component_1.AddProjectComponent,
                add_order_component_1.AddOrderComponent,
                add_invoice_component_1.AddInvoiceComponent,
                view_invoice_component_1.ViewInvoiceComponent,
                orders_component_1.OrdersComponent,
                invoice_component_1.InvoiceComponent,
                team_component_1.TeamComponent,
                team_model_component_1.TeamModelComponent,
                teammember_model_component_1.TeammemberModelComponent,
                view_team_model_component_1.ViewTeamModelComponent,
                total_project_component_1.TotalProjectComponent,
                total_assignment_model_component_1.TotalAssignmentModelComponent,
                total_task_component_1.TotalTaskComponent,
                total_assignment_component_1.TotalAssignmentComponent,
                add_task_model_component_1.AddTaskModelComponent,
                add_assign_task_model_component_1.AddAssignTaskModelComponent,
                assigned_task_component_1.AssignedTaskComponent,
                completed_task_component_1.CompletedTaskComponent,
                failed_task_component_1.FailedTaskComponent,
                timeset_component_1.TimesetComponent,
                header_final_component_1.HeaderFinalComponent,
                change_state_model_component_1.ChangeStateModelComponent,
                emp_performance_component_1.EmpPerformanceComponent,
                emp_performance_model_component_1.EmpPerformanceModelComponent,
                emp_service_record_model_component_1.EmpServiceRecordModelComponent,
                main_admin_full_component_1.MainAdminFullComponent,
                main_user_full_component_1.MainUserFullComponent,
                index_component_1.IndexComponent,
                usertotal_assignment_component_1.UsertotalAssignmentComponent,
                user_assigned_task_component_1.UserAssignedTaskComponent,
                user_completed_task_component_1.UserCompletedTaskComponent,
                user_failed_task_component_1.UserFailedTaskComponent,
                assign_component_1.AssignComponent,
                complete_component_1.CompleteComponent,
                fail_component_1.FailComponent,
                add_popup_component_1.AddPopupComponent,
                add_normal_component_1.AddNormalComponent,
                add_normal_user_model_component_1.AddNormalUserModelComponent,
                system_attendence_component_1.SystemAttendenceComponent,
                attandance_data_model_component_1.AttandanceDataModelComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                table_1.MatTableModule,
                input_1.MatInputModule,
                form_field_1.MatFormFieldModule,
                icon_1.MatIconModule,
                animations_1.BrowserAnimationsModule,
                http_1.HttpClientModule,
                paginator_1.MatPaginatorModule,
                sort_1.MatSortModule,
                dialog_1.MatDialogModule,
                menu_1.MatMenuModule,
                ckeditor5_angular_1.CKEditorModule,
                angular_1.FullCalendarModule
            ],
            providers: [http_1.HttpClientModule, { provide: http_1.HTTP_INTERCEPTORS, useClass: token_interceptor_1.TokenInterceptor, multi: true }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
