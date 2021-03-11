import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedWeekService {
  WeekDays: any;
  WeekDaysObservable: BehaviorSubject<any> = new BehaviorSubject(this.WeekDays);
  NextWeekDays: any;
  NextWeekDaysObservable: BehaviorSubject<any> = new BehaviorSubject(this.NextWeekDays);
  EmployeesToPrintNextWeek: any;
  EmployeesToPrint: any;
  EmployeesToPrintObservable: BehaviorSubject<any> = new BehaviorSubject(this.EmployeesToPrint);
  EmployeesToPrintNextWeekObservable: BehaviorSubject<any> = new BehaviorSubject(this.EmployeesToPrintNextWeek);

  constructor() { }

  
  setWeekToPrint(employees, employeesNextWeek) {
    this.EmployeesToPrintObservable.next(employees);
    this.EmployeesToPrintNextWeekObservable.next(employeesNextWeek);
  }
  
  public getEmployeesToPrintAsObservable(): Observable<any> {
    return this.EmployeesToPrintObservable.asObservable();
  }
  
  public getEmployeesToPrintNextWeekAsObservable(): Observable<any> {
    return this.EmployeesToPrintNextWeekObservable.asObservable();
  }
  
  public getWeekAsObservable(): Observable<any> {
    return this.WeekDaysObservable.asObservable();
  }
  
  public getNextWeekAsObservable(): Observable<any> {
    return this.NextWeekDaysObservable.asObservable();
  }

  setWeek(week) {
    this.WeekDaysObservable.next(week);
  }

  setNextWeek(week) {
    this.NextWeekDaysObservable.next(week);
  }

  getWeekToPrint() {
    return this.EmployeesToPrint;
  }

  getWeek() {
    return this.WeekDays;
  }
}
