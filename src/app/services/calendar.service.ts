import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  calendarData: string = '/assets/dummy.json';

  constructor(private http: HttpClient) {
  }

  getTimeTableData() {
    return this.http.get(this.calendarData);
  }
}
