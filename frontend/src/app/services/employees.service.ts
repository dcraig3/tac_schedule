import { Injectable } from '@angular/core';
import {DatePipe} from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private http: HttpClient,
    public datepipe: DatePipe,
  ) { }

  getAllEmployees(): Observable<any> {
    return this.http.get(`${environment.mainAPIUrl}/Employees/all`);
  }

  getAllActiveEmployees(): Observable<any> {
    return this.http.get(`${environment.mainAPIUrl}/Employees/getAllEmployeed`);
  }

  getAllInactiveEmployees(): Observable<any> {
    return this.http.get(`${environment.mainAPIUrl}/Employees/getAllUnemployeed`);
  }

  markUnemployeed(employeeId): Observable<any> {
    return this.http.get(`${environment.mainAPIUrl}/Employees/markUnemployeed?id=${employeeId}`);
  }

  createEmployee(employee): Observable<any> {
    return this.http.post(`${environment.mainAPIUrl}/Employees/createEmployee`, employee);
  }
}