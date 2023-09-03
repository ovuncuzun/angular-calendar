import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewChild, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;
  subscription: Subscription | undefined;
  calendarData: any;
  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date('2023-07-09');

  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;

  refresh = new Subject<void>();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;

  constructor(private calendarService: CalendarService, private modal: NgbModal) {
  }

  ngOnInit() {
    this.getTimeTableData();
  }

  getTimeTableData() {
    this.subscription = this.calendarService.getTimeTableData().subscribe(data => {
      this.calendarData = data;
      this.addTimeTableDataEvents();
      this.refresh.next();
    })
  }

  addTimeTableDataEvents() {
    this.calendarData.map((event: any) => (
      this.events.push({
        title: event.display_value.toString(),
        start: new Date(event.date_time),
        draggable: false,
        resizable: {
          beforeStart: false,
          afterEnd: false,
        }
      })
    ));
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
