import { Injectable } from '@angular/core';
// import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {


  constructor(
    private http: HttpClient,
    // public datepipe: DatePipe,
  ) { }

  getAllScheduled(): Observable<any> {
    return this.http.get(`${environment.mainAPIUrl}/Schedule/all`);
  }

  getAllScheduledByWeek(startDate, endDate): Observable<any> {
    return this.http.get(`${environment.mainAPIUrl}/Schedule/getByWeek?startDate=${startDate}&endDate=${endDate}`);
  }

  getAllScheduledByWeekByEmployee(startDate, endDate, employeeId): Observable<any> {
    return this.http.get(`${environment.mainAPIUrl}/Schedule/getByWeekByEmployee?startDate=${startDate}&endDate=${endDate}&id=${employeeId}`);
  }

  updateScheduleById(schedule): Observable<any> {
    return this.http.post(`${environment.mainAPIUrl}/Schedule/updateSchedule`, schedule);
  }

  createScheduleById(schedule): Observable<any> {
    return this.http.post(`${environment.mainAPIUrl}/Schedule/createSchedule`, schedule);
  }

  removeFromSchedule(scheduleId): Observable<any> {
    return this.http.delete(`${environment.mainAPIUrl}/Schedule/removeFromSchedule?id=${scheduleId}`);
  }

}
