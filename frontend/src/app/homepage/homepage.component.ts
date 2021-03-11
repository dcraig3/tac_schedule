import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
// import { Timestamp, scheduled } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'moment-timezone';
import { EmployeesService } from '../services/employees.service';
import { ScheduleService } from '../services/schedule.service';
// import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';
// import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Router } from '@angular/router';
import { SelectedWeekService } from '../services/selected-week.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})
export class HomepageComponent implements OnInit {

  TODAY = new Date();
  monday = new Date();
  tuesday = new Date();
  wednesday = new Date();
  thursday = new Date();
  friday = new Date();
  saturday = new Date();
  sunday = new Date();
  DAYS_OF_THE_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  employees = [{
    id: null,
    name: null,
    hours: 0,
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null
  }];
  changingDates = false;
  editingSchedule = false;
  daySchedule = { employeeId: null, startTime: '', endTime: '' };
  employeesNextWeek = [{
    id: null,
    name: null,
    hours: 0,
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null
  }];

  constructor(
    private employeeService: EmployeesService,
    private scheduleService: ScheduleService,
    private modalService: NgbModal,
    private router: Router,
    private printWeek: SelectedWeekService,
  ) { }


  ngOnInit() {
    this.setThisWeek(this.TODAY);
  }

  setThisWeek(date) {
    if (!this.changingDates) {
      this.changingDates = true;
      const MONDAY = this.getMonday(date);
      // Moment is needed due to a weird bug with Date()
      this.monday = moment(MONDAY).zone('+0600').toDate();
      this.tuesday = moment(MONDAY).zone('+0600').add(1, 'days').toDate();
      this.wednesday = moment(MONDAY).zone('+0600').add(2, 'days').toDate();
      this.thursday = moment(MONDAY).zone('+0600').add(3, 'days').toDate();
      this.friday = moment(MONDAY).zone('+0600').add(4, 'days').toDate();
      this.saturday = moment(MONDAY).zone('+0600').add(5, 'days').toDate();
      this.sunday = moment(MONDAY).zone('+0600').add(6, 'days').toDate();
      this.changingDates = false;
      this.getActiveEmployees();
    }
  }

  async getActiveEmployees() {
    this.employees = [{
      id: null,
      name: null,
      hours: 0,
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null
    }];
    await this.employeeService.getAllActiveEmployees().toPromise().then(res => {
      this.employees = res as any;
    });
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.employees.length; i++) {
      this.employees[i].hours = 0;
      // set times as blank by default, used to stop errors when creating placeholders for editing
      this.employees[i].monday = { id: null, employeeId: this.employees[i].id, startTime: '', endTime: '' };
      this.employees[i].tuesday = { id: null, employeeId: this.employees[i].id, startTime: '', endTime: '' };
      this.employees[i].wednesday = { id: null, employeeId: this.employees[i].id, startTime: '', endTime: '' };
      this.employees[i].thursday = { id: null, employeeId: this.employees[i].id, startTime: '', endTime: '' };
      this.employees[i].friday = { id: null, employeeId: this.employees[i].id, startTime: '', endTime: '' };
      this.employees[i].saturday = { id: null, employeeId: this.employees[i].id, startTime: '', endTime: '' };
      this.employees[i].sunday = { id: null, employeeId: this.employees[i].id, startTime: '', endTime: '' };
      // get schedules and reassign them to something easy to display and manipulate on the frontend
      this.scheduleService.getAllScheduledByWeekByEmployee(moment(this.monday).format('YYYY-MM-DD'),
        moment(this.sunday).format('YYYY-MM-DD'), this.employees[i].id).subscribe(res => {
          // tslint:disable-next-line: prefer-for-of
          for (let r = 0; r < res.length; r++) {
            // LT format looks like '1:00 PM'
            if (moment(res[r].startTime).format('dddd') === 'Monday') {
              this.employees[i].monday = {
                id: res[r].id, employeeId: this.employees[i].id, startTime: moment(res[r].startTime).format('LT'),
                endTime: moment(res[r].endTime).format('LT')
              };
              this.calculateEmployeeWeeklyHours(i,
                res[r].startTime, res[r].endTime);
            }
            if (moment(res[r].startTime).format('dddd') === 'Tuesday') {
              this.employees[i].tuesday = {
                id: res[r].id, employeeId: this.employees[i].id, startTime: moment(res[r].startTime).format('LT'),
                endTime: moment(res[r].endTime).format('LT')
              };
              this.calculateEmployeeWeeklyHours(i,
                res[r].startTime, res[r].endTime);
            }
            if (moment(res[r].startTime).format('dddd') === 'Wednesday') {
              this.employees[i].wednesday = {
                id: res[r].id, employeeId: this.employees[i].id,
                startTime: moment(res[r].startTime).format('LT'), endTime: moment(res[r].endTime).format('LT')
              };
              this.calculateEmployeeWeeklyHours(i,
                res[r].startTime, res[r].endTime);
            }
            if (moment(res[r].startTime).format('dddd') === 'Thursday') {
              this.employees[i].thursday = {
                id: res[r].id, employeeId: this.employees[i].id,
                startTime: moment(res[r].startTime).format('LT'), endTime: moment(res[r].endTime).format('LT')
              };
              this.calculateEmployeeWeeklyHours(i,
                res[r].startTime, res[r].endTime);
            }
            if (moment(res[r].startTime).format('dddd') === 'Friday') {
              this.employees[i].friday = {
                id: res[r].id, employeeId: this.employees[i].id, startTime: moment(res[r].startTime).format('LT'),
                endTime: moment(res[r].endTime).format('LT')
              };
              this.calculateEmployeeWeeklyHours(i,
                res[r].startTime, res[r].endTime);
            }
            if (moment(res[r].startTime).format('dddd') === 'Saturday') {
              this.employees[i].saturday = {
                id: res[r].id, employeeId: this.employees[i].id,
                startTime: moment(res[r].startTime).format('LT'), endTime: moment(res[r].endTime).format('LT')
              };
              this.calculateEmployeeWeeklyHours(i,
                res[r].startTime, res[r].endTime);
            }
            if (moment(res[r].startTime).format('dddd') === 'Sunday') {
              this.employees[i].sunday = {
                id: res[r].id, employeeId: this.employees[i].id, startTime: moment(res[r].startTime).format('LT'),
                endTime: moment(res[r].endTime).format('LT')
              };
              this.calculateEmployeeWeeklyHours(i,
                res[r].startTime, res[r].endTime);
            }
          }
        });
    }
    // console.log(this.employees);
  }

  getMonday(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(date.setDate(diff));
  }

  weekBack() {
    this.monday.setDate(this.monday.getDate() - 7);
    this.setThisWeek(this.monday);
  }

  weekAhead() {
    this.monday.setDate(this.monday.getDate() + 7);
    this.setThisWeek(this.monday);
  }

  toggleEdit() {
    this.changingDates = !this.changingDates;
  }

  undoEdit() {
    this.getActiveEmployees();
    this.toggleEdit();
  }

  saveEdit() {
    // tslint:disable-next-line: prefer-for-of
    for (let e = 0; e < this.employees.length; e++) {
      // debugger;
      this.uploadSchedule(this.employees[e].monday, this.monday);
      this.uploadSchedule(this.employees[e].tuesday, this.tuesday);
      this.uploadSchedule(this.employees[e].wednesday, this.wednesday);
      this.uploadSchedule(this.employees[e].thursday, this.thursday);
      this.uploadSchedule(this.employees[e].friday, this.friday);
      this.uploadSchedule(this.employees[e].saturday, this.saturday);
      this.uploadSchedule(this.employees[e].sunday, this.sunday);
    }
    this.getActiveEmployees();
    this.toggleEdit();
  }

  async uploadSchedule(employeeDay, day) {
    if (employeeDay.startTime !== `` && employeeDay.endTime !== ``) {
      if (employeeDay.startTime === '0') {
        // console.log(employeeDay);
        await this.scheduleService.removeFromSchedule(employeeDay.id).toPromise().then();
      } else {
        // console.log(`day`, day);
        const newStartDate = this.convertToHoursAndMinutes(employeeDay.startTime, day);
        const newEndDate = this.convertToHoursAndMinutes(employeeDay.endTime, day);
        if (employeeDay.id != null) {
          const updateSchedule = { id: employeeDay.id, employeeId: employeeDay.employeeId, startTime: newStartDate, endTime: newEndDate };
          await this.scheduleService.updateScheduleById(updateSchedule).toPromise().then(res => {
            // console.log(updateSchedule);
          });
        } else {
          const createSchedule = { employeeId: employeeDay.employeeId, startTime: newStartDate, endTime: newEndDate };
          await this.scheduleService.createScheduleById(createSchedule).toPromise().then(res => {
            // console.log(createSchedule);
          });
        }
      }
    }
  }

  convertToHoursAndMinutes(time, day) {
    const dayOfTheWeek = day;
    // console.log(`dayOfTheWeek`, dayOfTheWeek);
    time.replace(/\s/g, '');
    let hour = time.split(`:`)[0];
    if (time.substring(time.length - 2, time.length).toUpperCase() === `PM`) {
      hour = (parseInt(hour) + 12).toString();
    } else if (time.substring(time.length - 2, time.length).toUpperCase() !== `PM`
      || time.substring(time.length - 2, time.length).toUpperCase() !== `AM`) {
      if (hour < 7) {
        hour = (parseInt(hour) + 12).toString();
      }
    }
    let minutes;
    if (time.split(`:`)[1]) {
      minutes = time.split(`:`)[1].substring(0, 2);
    } else {
      minutes = `00`;
    }
    const date = moment(dayOfTheWeek).format('YYYY-MM-DD');
    return moment(`${date} ${hour}:${minutes}:00`, 'YYYY-MM-DD H:mm').toDate();
  }

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'ngbd-modal-confirm' }).result.then((result) => {
    }, (reason) => {
      this.getActiveEmployees();
    });
  }

  calculateEmployeeWeeklyHours(id, startTime, endTime) {
    const start = moment(startTime);
    const end = moment(endTime);
    // console.log(end.diff(start, 'hours'));
    this.employees[id].hours = this.employees[id].hours + end.diff(start, 'hours');
  }

  async printPage() {
    await this.getActiveEmployeesNextWeek();
    console.log(this.employees);
    this.printWeek.setWeekToPrint(this.employees, this.employeesNextWeek);
    // debugger;
    this.printWeek.setWeek({
      monday: this.monday,
      tuesday: this.tuesday,
      wednesday: this.wednesday,
      thursday: this.thursday,
      friday: this.friday,
      saturday: this.saturday,
      sunday: this.sunday
    });
    let monday = new Date(), tuesday = new Date(), wednesday = new Date(), thursday = new Date(),
      friday = new Date(), saturday = new Date(), sunday = new Date()
    this.printWeek.setNextWeek({
      monday: monday.setDate(this.monday.getDate() + 7),
      tuesday: tuesday.setDate(this.tuesday.getDate() + 7),
      wednesday: wednesday.setDate(this.wednesday.getDate() + 7),
      thursday: thursday.setDate(this.thursday.getDate() + 7),
      friday: friday.setDate(this.friday.getDate() + 7),
      saturday: saturday.setDate(this.saturday.getDate() + 7),
      sunday: sunday.setDate(this.sunday.getDate() + 7)
    });
  }

  async getActiveEmployeesNextWeek() {
    let newMonday = new Date();
    newMonday.setDate(this.monday.getDate() + 7);
    let newSunday = new Date();
    newSunday.setDate(this.sunday.getDate() + 7);
    this.employeesNextWeek = [{
      id: null,
      name: null,
      hours: 0,
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null
    }];
    await this.employeeService.getAllActiveEmployees().toPromise().then(res => {
      this.employeesNextWeek = res as any;
    });
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.employeesNextWeek.length; i++) {
      this.employeesNextWeek[i].hours = 0;
      // set times as blank by default, used to stop errors when creating placeholders for editing
      this.employeesNextWeek[i].monday = { id: null, employeeId: this.employeesNextWeek[i].id, startTime: '', endTime: '' };
      this.employeesNextWeek[i].tuesday = { id: null, employeeId: this.employeesNextWeek[i].id, startTime: '', endTime: '' };
      this.employeesNextWeek[i].wednesday = { id: null, employeeId: this.employeesNextWeek[i].id, startTime: '', endTime: '' };
      this.employeesNextWeek[i].thursday = { id: null, employeeId: this.employeesNextWeek[i].id, startTime: '', endTime: '' };
      this.employeesNextWeek[i].friday = { id: null, employeeId: this.employeesNextWeek[i].id, startTime: '', endTime: '' };
      this.employeesNextWeek[i].saturday = { id: null, employeeId: this.employeesNextWeek[i].id, startTime: '', endTime: '' };
      this.employeesNextWeek[i].sunday = { id: null, employeeId: this.employeesNextWeek[i].id, startTime: '', endTime: '' };
      // get schedules and reassign them to something easy to display and manipulate on the frontend
      this.scheduleService.getAllScheduledByWeekByEmployee(moment(newMonday).format('YYYY-MM-DD'),
        moment(newSunday).format('YYYY-MM-DD'), this.employeesNextWeek[i].id).subscribe(res => {
          // tslint:disable-next-line: prefer-for-of
          for (let r = 0; r < res.length; r++) {
            // LT format looks like '1:00 PM'
            if (moment(res[r].startTime).format('dddd') === 'Monday') {
              this.employeesNextWeek[i].monday = {
                id: res[r].id, employeeId: this.employeesNextWeek[i].id, startTime: moment(res[r].startTime).format('LT'),
                endTime: moment(res[r].endTime).format('LT')
              };
              this.calculateEmployeeWeeklyHours(i,
                res[r].startTime, res[r].endTime);
            }
            if (moment(res[r].startTime).format('dddd') === 'Tuesday') {
              this.employeesNextWeek[i].tuesday = {
                id: res[r].id, employeeId: this.employeesNextWeek[i].id, startTime: moment(res[r].startTime).format('LT'),
                endTime: moment(res[r].endTime).format('LT')
              };
              this.calculateEmployeeWeeklyHours(i,
                res[r].startTime, res[r].endTime);
            }
            if (moment(res[r].startTime).format('dddd') === 'Wednesday') {
              this.employeesNextWeek[i].wednesday = {
                id: res[r].id, employeeId: this.employeesNextWeek[i].id,
                startTime: moment(res[r].startTime).format('LT'), endTime: moment(res[r].endTime).format('LT')
              };
              this.calculateEmployeeWeeklyHours(i,
                res[r].startTime, res[r].endTime);
            }
            if (moment(res[r].startTime).format('dddd') === 'Thursday') {
              this.employeesNextWeek[i].thursday = {
                id: res[r].id, employeeId: this.employeesNextWeek[i].id,
                startTime: moment(res[r].startTime).format('LT'), endTime: moment(res[r].endTime).format('LT')
              };
              this.calculateEmployeeWeeklyHours(i,
                res[r].startTime, res[r].endTime);
            }
            if (moment(res[r].startTime).format('dddd') === 'Friday') {
              this.employeesNextWeek[i].friday = {
                id: res[r].id, employeeId: this.employeesNextWeek[i].id, startTime: moment(res[r].startTime).format('LT'),
                endTime: moment(res[r].endTime).format('LT')
              };
              this.calculateEmployeeWeeklyHours(i,
                res[r].startTime, res[r].endTime);
            }
            if (moment(res[r].startTime).format('dddd') === 'Saturday') {
              this.employeesNextWeek[i].saturday = {
                id: res[r].id, employeeId: this.employeesNextWeek[i].id,
                startTime: moment(res[r].startTime).format('LT'), endTime: moment(res[r].endTime).format('LT')
              };
              this.calculateEmployeeWeeklyHours(i,
                res[r].startTime, res[r].endTime);
            }
            if (moment(res[r].startTime).format('dddd') === 'Sunday') {
              this.employeesNextWeek[i].sunday = {
                id: res[r].id, employeeId: this.employeesNextWeek[i].id, startTime: moment(res[r].startTime).format('LT'),
                endTime: moment(res[r].endTime).format('LT')
              };
              this.calculateEmployeeWeeklyHours(i,
                res[r].startTime, res[r].endTime);
            }
          }
        });
    }
    console.log(this.employeesNextWeek);
  }
}
