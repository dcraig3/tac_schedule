// Good luck debugging fam, you did not know how this worked when you wrote it
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'moment-timezone';
import { EmployeesService } from '../services/employees.service';
import { ScheduleService } from '../services/schedule.service';
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
  holidays: any[];
  isHoliday = [false, false, false, false, false, false, false];

  constructor(
    private employeeService: EmployeesService,
    private scheduleService: ScheduleService,
    private modalService: NgbModal,
    private printWeek: SelectedWeekService,
  ) { }


  ngOnInit() {
    this.getHolidays();
    this.setThisWeek(this.TODAY);
  }

  getHolidays() {
    // All information was used in a prior excel spreadsheet and converted into angular for use in determining holidays
    // calculation from excel are as follows
    //
    // New Years Day - =WORKDAY(DATE(CalendarYear,1,1),--(WEEKDAY(DATE(CalendarYear,1,1),2)>5))
    // Martin Luther King, Jr. Birthday - =DATE(CalendarYear,1,1)+14+CHOOSE(WEEKDAY(DATE(CalendarYear,1,1)),1,0,6,5,4,3,2)
    // President's Day - =DATE(CalendarYear,2,1)+14+CHOOSE(WEEKDAY(DATE(CalendarYear,2,1)),1,0,6,5,4,3,2)
    // Memorial Day - =DATE(CalendarYear,6,1)-WEEKDAY(DATE(CalendarYear,6,6))
    // Independence Day - =DATE(CalendarYear,7,4)
    // Labor Day - =DATE(CalendarYear,9,1)+CHOOSE(WEEKDAY(DATE(CalendarYear,9,1)),1,0,6,5,4,3,2)
    // Columbus Day - =DATE(CalendarYear,10,1)+7+CHOOSE(WEEKDAY(DATE(CalendarYear,10,1)),1,0,6,5,4,3,2)
    // Veterans Day - =DATE(CalendarYear,11,11)
    // Thanksgiving Day - =DATE(CalendarYear,11,1)+21+CHOOSE(WEEKDAY(DATE(CalendarYear,11,1)),4,3,2,1,0,6,5)
    // Christmas Day - =DATE(CalendarYear,12,25)
    const THIS_YEAR = this.TODAY.getFullYear();
    const NewYearsDay = moment().set({
      year: THIS_YEAR,
      hour: 12,
      minute: 0,
      second: 0,
      millisecond: 0,
      date: 1,
      month: 0
    }).toDate();
    const MartinLutherKingJrBirthday = moment().set({
      year: THIS_YEAR,
      hour: 12,
      minute: 0,
      second: 0,
      millisecond: 0,
      date: NewYearsDay.getDate() + this.chooseDay(NewYearsDay.getDay(), [1, 0, 6, 5, 4, 3, 2], 14),
      month: 0
    }).toDate();
    const PresidentsDay = moment().set({
      year: THIS_YEAR,
      hour: 12,
      minute: 0,
      second: 0,
      millisecond: 0,
      date: moment().set({ year: THIS_YEAR, month: 1, date: 1 }).toDate().getDate() +
        this.chooseDay(moment().set({ year: THIS_YEAR, month: 1, date: 1 }).toDate().getDay(),
          [1, 0, 6, 5, 4, 3, 2], 14),
      month: 1
    }).toDate();
    const MemorialDay = moment().set({
      year: THIS_YEAR,
      hour: 12,
      minute: 0,
      second: 0,
      millisecond: 0,
      date: moment().set({ year: THIS_YEAR, month: 5, date: 1 }).toDate().getDate(),
      month: 5
    }).subtract(moment().set({ year: THIS_YEAR, month: 5, date: 6 }).toDate().getDay() + 1, 'days').toDate();
    const IndependenceDay = moment().set({
      year: THIS_YEAR,
      hour: 12,
      minute: 0,
      second: 0,
      millisecond: 0,
      date: 4,
      month: 6
    }).toDate();
    const LaborDay = moment().set({
      year: THIS_YEAR,
      hour: 12,
      minute: 0,
      second: 0,
      millisecond: 0,
      date: moment().set({ year: THIS_YEAR, month: 8, date: 1 }).toDate().getDate() +
        this.chooseDay(moment().set({ year: THIS_YEAR, month: 8, date: 1 }).toDate().getDay(),
          [1, 0, 6, 5, 4, 3, 2], 0),
      month: 8
    }).toDate();
    const ColumbusDay = moment().set({
      year: THIS_YEAR,
      hour: 12,
      minute: 0,
      second: 0,
      millisecond: 0,
      date: moment().set({ year: THIS_YEAR, month: 9, date: 1 }).toDate().getDate() +
        this.chooseDay(moment().set({ year: THIS_YEAR, month: 9, date: 1 }).toDate().getDay(),
          [1, 0, 6, 5, 4, 3, 2], 7),
      month: 9
    }).toDate();
    const VeteransDay = moment().set({
      year: THIS_YEAR,
      hour: 12,
      minute: 0,
      second: 0,
      millisecond: 0,
      date: 11,
      month: 10
    }).toDate();
    const ThanksgivingDay = moment().set({
      year: THIS_YEAR,
      hour: 12,
      minute: 0,
      second: 0,
      millisecond: 0,
      date: moment().set({ year: THIS_YEAR, month: 10, date: 1 }).toDate().getDate() +
        this.chooseDay(moment().set({ year: THIS_YEAR, month: 10, date: 1 }).toDate().getDay(),
          [4, 3, 2, 1, 0, 6, 5], 21),
      month: 10
    }).toDate();
    const ChristmasDay = moment().set({
      year: THIS_YEAR,
      hour: 12,
      minute: 0,
      second: 0,
      millisecond: 0,
      date: 25,
      month: 11
    }).toDate();
    this.holidays = [
      NewYearsDay, MartinLutherKingJrBirthday, PresidentsDay, MemorialDay, IndependenceDay,
      LaborDay, ColumbusDay, VeteransDay, ThanksgivingDay, ChristmasDay
    ];
  }

  chooseDay(weekday, numArray, extraDays) {
    const day = numArray[weekday] + extraDays;
    return day;
  }

  setThisWeek(date) {
    if (!this.changingDates) {
      this.changingDates = true;
      const MONDAY = this.getMonday(date);
      // Moment is needed due to a weird bug with Date()
      this.monday = moment(MONDAY).set({ hour: 12, minute: 0, second: 0, millisecond: 0, }).toDate();
      this.tuesday = moment(MONDAY).set({ hour: 12, minute: 0, second: 0, millisecond: 0, }).add(1, 'days').toDate();
      this.wednesday = moment(MONDAY).set({ hour: 12, minute: 0, second: 0, millisecond: 0, }).add(2, 'days').toDate();
      this.thursday = moment(MONDAY).set({ hour: 12, minute: 0, second: 0, millisecond: 0, }).add(3, 'days').toDate();
      this.friday = moment(MONDAY).set({ hour: 12, minute: 0, second: 0, millisecond: 0, }).add(4, 'days').toDate();
      this.saturday = moment(MONDAY).set({ hour: 12, minute: 0, second: 0, millisecond: 0, }).add(5, 'days').toDate();
      this.sunday = moment(MONDAY).set({ hour: 12, minute: 0, second: 0, millisecond: 0, }).add(6, 'days').toDate();
      this.determineHolidays();
      this.changingDates = false;
      this.getActiveEmployees();
    }
  }

  determineHolidays() {
    this.isHoliday = [false, false, false, false, false, false, false];
    for (let i = 0; this.holidays.length > i; i++) {
      if (this.monday.toString() === this.holidays[i].toString()) {
        this.isHoliday[0] = true;
      }
      if (this.tuesday.toString() === this.holidays[i].toString()) {
        this.isHoliday[1] = true;
      }
      if (this.wednesday.toString() === this.holidays[i].toString()) {
        this.isHoliday[2] = true;
      }
      if (this.thursday.toString() === this.holidays[i].toString()) {
        this.isHoliday[3] = true;
      }
      if (this.friday.toString() === this.holidays[i].toString()) {
        this.isHoliday[4] = true;
      }
      if (this.saturday.toString() === this.holidays[i].toString()) {
        this.isHoliday[5] = true;
      }
      if (this.sunday.toString() === this.holidays[i].toString()) {
        this.isHoliday[6] = true;
      }
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
        moment(this.monday).add(7, 'days').format('YYYY-MM-DD'), this.employees[i].id).subscribe(res => {
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

  removeFromSchedule(employeeId, day) {
    for (let i = 0; this.employees.length > i; i++) {
      if (this.employees[i].id === employeeId) {
        if (day === 'monday') {
          this.employees[i].monday.startTime = '0';
          this.employees[i].monday.endTime = '0';
          break;
        }
        if (day === 'tuesday') {
          this.employees[i].tuesday.startTime = '0';
          this.employees[i].tuesday.endTime = '0';
          break;
        }
        if (day === 'wednesday') {
          this.employees[i].wednesday.startTime = '0';
          this.employees[i].wednesday.endTime = '0';
          break;
        }
        if (day === 'thursday') {
          this.employees[i].thursday.startTime = '0';
          this.employees[i].thursday.endTime = '0';
          break;
        }
        if (day === 'friday') {
          this.employees[i].friday.startTime = '0';
          this.employees[i].friday.endTime = '0';
          break;
        }
        if (day === 'saturday') {
          this.employees[i].saturday.startTime = '0';
          this.employees[i].saturday.endTime = '0';
          break;
        }
        if (day === 'sunday') {
          this.employees[i].sunday.startTime = '0';
          this.employees[i].sunday.endTime = '0';
          break;
        }
      }
    }
  }

  saveEdit() {
    // tslint:disable-next-line: prefer-for-of
    for (let e = 0; e < this.employees.length; e++) {
      debugger;
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
    // debugger;
    if (employeeDay.startTime !== `` && employeeDay.endTime !== ``) {
      console.log(employeeDay.startTime);
      if (employeeDay.startTime === '0' || employeeDay.startTime === 'off') {
        await this.scheduleService.removeFromSchedule(employeeDay.id).toPromise().then();
      } else {
        const newStartDate = this.convertToHoursAndMinutes(employeeDay.startTime, day);
        const newEndDate = this.convertToHoursAndMinutes(employeeDay.endTime, day);
        if (employeeDay.id != null) {
          const updateSchedule = { id: employeeDay.id, employeeId: employeeDay.employeeId, startTime: newStartDate, endTime: newEndDate };
          await this.scheduleService.updateScheduleById(updateSchedule).toPromise().then(res => {
          });
        } else {
          const createSchedule = { employeeId: employeeDay.employeeId, startTime: newStartDate, endTime: newEndDate };
          await this.scheduleService.createScheduleById(createSchedule).toPromise().then(res => {
          });
        }
      }
    }
  }

  convertToHoursAndMinutes(time, day) {
    const dayOfTheWeek = day;
    time.replace(/\s/g, '');
    let hour = time.split(`:`)[0];
    if (time.substring(time.length - 2, time.length).toUpperCase() === `PM`) {
      // tslint:disable-next-line: radix
      hour = (parseInt(hour) + 12).toString();
    } else if (time.substring(time.length - 2, time.length).toUpperCase() !== `PM`
      || time.substring(time.length - 2, time.length).toUpperCase() !== `AM`) {
      if (hour < 7) {
        // tslint:disable-next-line: radix
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
    this.employees[id].hours = this.employees[id].hours + end.diff(start, 'hours');
  }

  async printPage() {
    await this.getActiveEmployeesNextWeek();
    this.printWeek.setWeekToPrint(this.employees, this.employeesNextWeek);
    this.printWeek.setWeek({
      monday: this.monday,
      tuesday: this.tuesday,
      wednesday: this.wednesday,
      thursday: this.thursday,
      friday: this.friday,
      saturday: this.saturday,
      sunday: this.sunday
    });
    this.printWeek.setNextWeek({
      monday: moment(this.monday).add(7, 'days').toDate(),
      tuesday: moment(this.tuesday).add(7, 'days').toDate(),
      wednesday: moment(this.wednesday).add(7, 'days').toDate(),
      thursday: moment(this.thursday).add(7, 'days').toDate(),
      friday: moment(this.friday).add(7, 'days').toDate(),
      saturday: moment(this.saturday).add(7, 'days').toDate(),
      sunday: moment(this.sunday).add(7, 'days').toDate()
    });
  }

  async getActiveEmployeesNextWeek() {
    const newMonday = new Date();
    newMonday.setDate(this.monday.getDate() + 7);
    const newSunday = new Date();
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
  }
}
