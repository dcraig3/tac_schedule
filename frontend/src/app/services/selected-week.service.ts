import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedWeekService {
  WeekDays: any;

  constructor() { }

  EmployeesToPrint: any;
  
  setWeekToPrint(employees) {
    this.EmployeesToPrint = employees;
  }

  setWeek(week) {
    this.WeekDays = week;
  }

  getWeekToPrint() {
    return this.EmployeesToPrint;
  }

  getWeek() {
    return this.WeekDays;
  }
}
