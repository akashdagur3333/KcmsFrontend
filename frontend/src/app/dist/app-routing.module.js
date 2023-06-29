"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./Pages/home/home.component");
var login_component_1 = require("./Pages/login/login.component");
var user_component_1 = require("./Pages/Admin/user/user.component");
var training_batches_component_1 = require("./Pages/training-batches/training-batches.component");
var colleges_component_1 = require("./Pages/colleges/colleges.component");
var drive_component_1 = require("./Pages/drive/drive.component");
var route_guard_service_1 = require("./services/route-guard.service");
var student_component_1 = require("./Pages/student/student.component");
var setting_component_1 = require("./Pages/setting/setting.component");
var reporting_component_1 = require("./Pages/reporting/reporting.component");
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
var trainings_component_1 = require("./Pages/trainings/trainings.component");
var test_questions_component_1 = require("./Pages/test-questions/test-questions.component");
var training_tests_component_1 = require("./Pages/training-tests/training-tests.component");
var joinings_component_1 = require("./Pages/joinings/joinings.component");
var batch_size_component_1 = require("./Pages/batch-size/batch-size.component");
var trainers_component_1 = require("./Pages/trainers/trainers.component");
var other_waiver_component_1 = require("./Pages/other-waiver/other-waiver.component");
var other_charge_component_1 = require("./Pages/other-charge/other-charge.component");
var in_pool_component_1 = require("./Pages/in-pool/in-pool.component");
var loamodel_component_1 = require("./Model/loamodel/loamodel.component");
var hr_activity_component_1 = require("./Pages/Metting/hr-activity/hr-activity.component");
var hr_meeting_component_1 = require("./Pages/Metting/hr-meeting/hr-meeting.component");
var director_meeting_component_1 = require("./Pages/Metting/director-meeting/director-meeting.component");
var emp_service_record_component_1 = require("./Pages/emp-service-record/emp-service-record.component");
var leave_bucket_component_1 = require("./Pages/leave-bucket/leave-bucket.component");
var refunds_component_1 = require("./Pages/refunds/refunds.component");
var orders_component_1 = require("./Pages/orders/orders.component");
var invoice_component_1 = require("./Pages/invoice/invoice.component");
var team_component_1 = require("./Pages/team/team.component");
var total_project_component_1 = require("./Pages/total-project/total-project.component");
var total_task_component_1 = require("./Pages/total-task/total-task.component");
var assigned_task_component_1 = require("./Pages/assigned-task/assigned-task.component");
var completed_task_component_1 = require("./Pages/completed-task/completed-task.component");
var failed_task_component_1 = require("./Pages/failed-task/failed-task.component");
var timeset_component_1 = require("./Pages/Timer/timeset/timeset.component");
var enviroment_1 = require("./enviroment");
var total_assignment_component_1 = require("./Pages/total-assignment/total-assignment.component");
var emp_performance_component_1 = require("./Pages/emp-performance/emp-performance.component");
var index_component_1 = require("./Pages/User/index/index.component");
var main_admin_full_component_1 = require("./Component/main-admin-full/main-admin-full.component");
var main_user_full_component_1 = require("./Component/main-user-full/main-user-full.component");
var assign_component_1 = require("./Pages/Common/assign/assign.component");
var complete_component_1 = require("./Pages/Common/complete/complete.component");
var fail_component_1 = require("./Pages/Common/fail/fail.component");
var system_attendence_component_1 = require("./Pages/system-attendence/system-attendence.component");
var attendence_component_1 = require("./Pages/Common/attendence/attendence.component");
var routes = [
    {
        path: 'home',
        component: home_component_1.HomeComponent,
        pathMatch: 'full',
        canActivate: [route_guard_service_1.RouteGuardService],
        data: {
            expectedRole: enviroment_1.environment.AdminRole
        }
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'Admin',
        component: main_admin_full_component_1.MainAdminFullComponent,
        canActivate: [route_guard_service_1.RouteGuardService],
        data: {
            expectedRole: enviroment_1.environment.BothAdmin
        },
        children: [
            {
                path: 'user',
                component: user_component_1.UserComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'trainingBatches',
                component: training_batches_component_1.TrainingBatchesComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'colleges',
                component: colleges_component_1.CollegesComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'drive',
                component: drive_component_1.DriveComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'student',
                component: student_component_1.StudentComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'setting',
                component: setting_component_1.SettingComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'reporting',
                component: reporting_component_1.ReportingComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'reciept',
                component: reciept_component_1.RecieptComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'fine',
                component: fine_component_1.FineComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'otherCharges',
                component: other_charge_component_1.OtherChargeComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'fineWaiver',
                component: fine_waiver_component_1.FineWaiverComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'VSRWaiver',
                component: vsrwaiver_component_1.VSRWaiverComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'otherWaiver',
                component: other_waiver_component_1.OtherWaiverComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'jobStatus',
                component: job_status_component_1.JobStatusComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'awaited',
                component: awaited_component_1.AwaitedComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'InTraining',
                component: in_training_component_1.InTrainingComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'TrainingCompleted',
                component: training_completed_component_1.TrainingCompletedComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'Joined',
                component: joined_component_1.JoinedComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'Left',
                component: left_component_1.LeftComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'Client',
                component: client_component_1.ClientComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'trainings',
                component: trainings_component_1.TrainingsComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'testQuestions',
                component: test_questions_component_1.TestQuestionsComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'trainingTests',
                component: training_tests_component_1.TrainingTestsComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'joinings',
                component: joinings_component_1.JoiningsComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'batchSize',
                component: batch_size_component_1.BatchSizeComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'trainer',
                component: trainers_component_1.TrainersComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'inPool',
                component: in_pool_component_1.InPoolComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'letterOfAppointment',
                component: loamodel_component_1.LOAModelComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'HrActivity',
                component: hr_activity_component_1.HrActivityComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'HrMeeting',
                component: hr_meeting_component_1.HrMeetingComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'DirectorMeeting',
                component: director_meeting_component_1.DirectorMeetingComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'emp_service_records',
                component: emp_service_record_component_1.EmpServiceRecordComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'leave_bucket',
                component: leave_bucket_component_1.LeaveBucketComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'refunds',
                component: refunds_component_1.RefundsComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'Order',
                component: orders_component_1.OrdersComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'Invoice',
                component: invoice_component_1.InvoiceComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'Team',
                component: team_component_1.TeamComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'TotalProject',
                component: total_project_component_1.TotalProjectComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'TotalAssignment',
                component: total_assignment_component_1.TotalAssignmentComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'TotalTask',
                component: total_task_component_1.TotalTaskComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'AssignedTask',
                component: assigned_task_component_1.AssignedTaskComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'CompletedTask',
                component: completed_task_component_1.CompletedTaskComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'FailedTask',
                component: failed_task_component_1.FailedTaskComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'time',
                component: timeset_component_1.TimesetComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'EmpPerformance',
                component: emp_performance_component_1.EmpPerformanceComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            },
            {
                path: 'SystemAttendence',
                component: system_attendence_component_1.SystemAttendenceComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.BothAdmin
                }
            }
        ]
    },
    {
        path: 'User',
        component: main_user_full_component_1.MainUserFullComponent,
        canActivate: [route_guard_service_1.RouteGuardService],
        data: {
            expectedRole: enviroment_1.environment.common
        },
        children: [
            {
                path: 'index',
                component: index_component_1.IndexComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.common
                }
            },
            {
                path: 'assign',
                component: assign_component_1.AssignComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.common
                }
            },
            {
                path: 'attendence',
                component: attendence_component_1.AttendenceComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.common
                }
            },
            {
                path: 'complete',
                component: complete_component_1.CompleteComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.common
                }
            },
            {
                path: 'fail',
                component: fail_component_1.FailComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.common
                }
            },
            {
                path: 'EmpPerformance',
                component: emp_performance_component_1.EmpPerformanceComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Technical
                }
            },
            {
                path: 'Team',
                component: team_component_1.TeamComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Technical
                }
            },
            {
                path: 'TotalProject',
                component: total_project_component_1.TotalProjectComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Technical
                }
            },
            {
                path: 'TotalAssignment',
                component: total_assignment_component_1.TotalAssignmentComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Technical
                }
            },
            {
                path: 'TotalTask',
                component: total_task_component_1.TotalTaskComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Technical
                }
            },
            {
                path: 'AssignedTask',
                component: assigned_task_component_1.AssignedTaskComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Technical
                }
            },
            {
                path: 'CompletedTask',
                component: completed_task_component_1.CompletedTaskComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Technical
                }
            },
            {
                path: 'FailedTask',
                component: failed_task_component_1.FailedTaskComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Technical
                }
            },
            {
                path: 'trainings',
                component: trainings_component_1.TrainingsComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'testQuestions',
                component: test_questions_component_1.TestQuestionsComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'trainingTests',
                component: training_tests_component_1.TrainingTestsComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'joinings',
                component: joinings_component_1.JoiningsComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'batchSize',
                component: batch_size_component_1.BatchSizeComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'trainer',
                component: trainers_component_1.TrainersComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'inPool',
                component: in_pool_component_1.InPoolComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'letterOfAppointment',
                component: loamodel_component_1.LOAModelComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'HrActivity',
                component: hr_activity_component_1.HrActivityComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'HrMeeting',
                component: hr_meeting_component_1.HrMeetingComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'DirectorMeeting',
                component: director_meeting_component_1.DirectorMeetingComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'emp_service_records',
                component: emp_service_record_component_1.EmpServiceRecordComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'leave_bucket',
                component: leave_bucket_component_1.LeaveBucketComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'refunds',
                component: refunds_component_1.RefundsComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'trainingBatches',
                component: training_batches_component_1.TrainingBatchesComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'colleges',
                component: colleges_component_1.CollegesComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'drive',
                component: drive_component_1.DriveComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'student',
                component: student_component_1.StudentComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'setting',
                component: setting_component_1.SettingComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'reporting',
                component: reporting_component_1.ReportingComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'reciept',
                component: reciept_component_1.RecieptComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'fine',
                component: fine_component_1.FineComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'otherCharges',
                component: other_charge_component_1.OtherChargeComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'fineWaiver',
                component: fine_waiver_component_1.FineWaiverComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'VSRWaiver',
                component: vsrwaiver_component_1.VSRWaiverComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'otherWaiver',
                component: other_waiver_component_1.OtherWaiverComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'jobStatus',
                component: job_status_component_1.JobStatusComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'awaited',
                component: awaited_component_1.AwaitedComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'InTraining',
                component: in_training_component_1.InTrainingComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'TrainingCompleted',
                component: training_completed_component_1.TrainingCompletedComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'Joined',
                component: joined_component_1.JoinedComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            },
            {
                path: 'Left',
                component: left_component_1.LeftComponent,
                pathMatch: 'full',
                canActivate: [route_guard_service_1.RouteGuardService],
                data: {
                    expectedRole: enviroment_1.environment.Hr
                }
            }
        ]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
