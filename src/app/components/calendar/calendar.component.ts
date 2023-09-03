import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  subscription: Subscription | undefined;
  calendarData: any;

  constructor(private calendarService: CalendarService) {
  }

  ngOnInit() {
    this.getTimeTableData();
  }

  getTimeTableData() {
    this.subscription = this.calendarService.getTimeTableData().subscribe(data => {
      this.calendarData = data;
    })
  }

}
