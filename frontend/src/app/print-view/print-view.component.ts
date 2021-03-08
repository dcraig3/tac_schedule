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

  constructor(
    private printWeek: SelectedWeekService,
  ) { }

  ngOnInit(): void {
    this.employees = this.printWeek.getWeekToPrint()
    this.weekdays = this.printWeek.getWeek();
    console.log(this.employees);
  }

}
