"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TeamComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var team_model_component_1 = require("src/app/Model/team-model/team-model.component");
var view_team_model_component_1 = require("src/app/Model/view-team-model/view-team-model.component");
var sweetalert2_1 = require("sweetalert2");
var TeamComponent = /** @class */ (function () {
    function TeamComponent(dialog, api) {
        this.dialog = dialog;
        this.api = api;
        this.displayedColumns = ['id', 'team_id', 'team_lead', 'team_member', 'action'];
    }
    TeamComponent.prototype.ngOnInit = function () {
        this.getAllTeam();
    };
    TeamComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    TeamComponent.prototype.getAllTeam = function () {
        var _this = this;
        this.api.getAllTeam().subscribe({
            next: function (res) {
                _this.dataSource = new table_1.MatTableDataSource(res);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
            },
            error: function (err) {
                sweetalert2_1["default"].fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: err
                });
            }
        });
    };
    TeamComponent.prototype.OpenModel = function () {
        var _this = this;
        this.dialog.open(team_model_component_1.TeamModelComponent, {
            width: '60%',
            height: '70%'
        }).afterClosed().subscribe(function (val) {
            if (val == 'Add') {
                _this.getAllTeam();
            }
        });
    };
    TeamComponent.prototype.deleteTeam = function (id) {
        var _this = this;
        this.api.deleteTeam(id).subscribe({
            next: function (res) {
                sweetalert2_1["default"].fire('Good job!', 'Team Deleted Successfully', 'success');
                _this.getAllTeam();
            },
            error: function (err) {
                sweetalert2_1["default"].fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: err
                });
            }
        });
    };
    TeamComponent.prototype.viewTeam = function (data) {
        this.dialog.open(view_team_model_component_1.ViewTeamModelComponent, {
            width: '60%',
            data: data
        });
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], TeamComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], TeamComponent.prototype, "sort");
    TeamComponent = __decorate([
        core_1.Component({
            selector: 'app-team',
            templateUrl: './team.component.html',
            styleUrls: ['./team.component.css']
        })
    ], TeamComponent);
    return TeamComponent;
}());
exports.TeamComponent = TeamComponent;
