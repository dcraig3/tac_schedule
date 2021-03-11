import { Component, OnInit } from '@angular/core';
import { SelectedWeekService } from '../services/selected-week.service';

@Component({
  selector: 'app-print-view',
  templateUrl: './print-view.component.html',
  styleUrls: ['./print-view.component.sass']
})
export class PrintViewComponent implements OnInit {
  employees: any;
  weekdays: any;
  employeesNextWeek: any;
  weekdaysNextWeek: any;
  isLoading: boolean;

  constructor(
    private printWeek: SelectedWeekService,
  ) { }

  async ngOnInit() {
    await this.printWeek.getEmployeesToPrintAsObservable().subscribe(res => {
      if (res) {
        this.employees = res as any;
        // console.log(`employees`, this.employees);
      }
    });
    await this.printWeek.getEmployeesToPrintNextWeekAsObservable().subscribe(res => {
      if (res) {
        this.employeesNextWeek = res as any;
        console.log(`employeesNextWeek`, this.employeesNextWeek);
      }
    });
    await this.printWeek.getWeekAsObservable().subscribe(res => {
      if (res) {
        this.weekdays = res as any;
        // console.log(`weekdays`, this.weekdays);
      }
    });
    await this.printWeek.getNextWeekAsObservable().subscribe(res => {
      if (res) {
        this.weekdaysNextWeek = res as any;
        console.log(`weekdaysNextWeek`, this.weekdaysNextWeek);
      }
    });
  }

}
