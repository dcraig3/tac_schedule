import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../services/employees.service';
import { ScheduleService } from '../services/schedule.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';

@Component({
  selector: 'app-admin-modal',
  templateUrl: './admin-modal.component.html',
  styleUrls: ['./admin-modal.component.sass']
})
export class AdminModalComponent implements OnInit {
  activeEmployees: any;
  newEmployee: { name: string; };
  editingActiveEmployees = false;

  constructor(
    private employeeService: EmployeesService,
    private scheduleService: ScheduleService,
    private snotifyService: SnotifyService,
  ) { }

  ngOnInit(): void {
    this.getActiveEmployees();
  }

  getActiveEmployees() {
    this.employeeService.getAllActiveEmployees().subscribe(res => {
      this.activeEmployees = res as any;
    });
  }

  addNewEmployee() {
    this.newEmployee = { name: '' };
  }

  removeNewEmployee() {
    this.newEmployee = null;
  }

  saveNewEmployee() {
    const newEmployee = {
      inactive: 'N',
      name: this.newEmployee.name
    };
    this.employeeService.createEmployee(newEmployee).toPromise().then( res => {
      this.newEmployee = null;
      this.getActiveEmployees();
    });
  }

  editActiveEmployees() {
    this.editingActiveEmployees = !this.editingActiveEmployees;
  }

  setEmployeeInactiveWarn(id) {
    this.snotifyService.warning('Are you sure you want to mark inactive?', {
      timeout: 100000,
      closeOnClick: true,
      buttons: [
        { text: 'Yes', action: () => this.setEmployeeInactive(id), bold: true },
        { text: 'No', action: null },
      ],
      showProgressBar: false,
      pauseOnHover: false,
      position: SnotifyPosition.centerBottom,
    });
  }

  setEmployeeInactive(id) {
    this.employeeService.markUnemployeed(id).toPromise().then( res => {
      this.getActiveEmployees();
    });
  }

}
