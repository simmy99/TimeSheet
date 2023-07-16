import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-createtimesheet',
  templateUrl: './createtimesheet.component.html',
  styleUrls: ['./createtimesheet.component.css']
})
export class CreatetimesheetComponent implements OnInit, AfterViewInit {
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef<HTMLInputElement>>;

  selectedOption: string = '';
  // dropdownOptions: string[] = ['1-Jul-23 to 7-Jul-23', '8-Jul-23 to 14-Jul-23', '15-Jul-23 to 21-Jul-23','22-Jul-23 to 28-Jul-23', '29-Jul-23 to 31-Jul-23'];

  rows: any[] = [];
  weekDays: string[] = ['mon 3 july', 'tue 4 july', 'wed 5 july', 'thu 6 july', 'fri 7 july', 'sat 8 july', 'sun 9 july'];

  daysOfWeek: Date[] = [];
  showFirstHalf: boolean = true;
  selectedDate: NgbDateStruct;
  minDate: NgbDate;
  maxDate: NgbDate;
  weeks: { start: number; end: number }[] = [];
  profileContent: string = '';
  totalSumAll: string = '0.00'; // Declare totalSumAll as a string
  columnSums: number[] = [];
  // for displaying dropdown options
  selectedProject: string = '';
  projects: string[] = [
    'Uprime',
    'Uprime R&D',
    'Open Therapeutics',
    'Vacations',
    'Holidays'
  ];

  constructor(private calendar: NgbCalendar) {
    const today = this.calendar.getToday();
    this.selectedDate = today;

    this.showFirstHalf = true;
    this.minDate = this.calendar.getPrev(this.calendar.getToday(), 'y', 5) as NgbDate; // Update to 10 years before current year
    this.maxDate = this.calendar.getNext(this.calendar.getToday(), 'y', 5) as NgbDate;
  }

  ngOnInit() {
    this.addRow();
    this.generateWeekButtons();

    const currentDate = this.selectedDate.day;

    // Find the week range that includes the current date
    const currentWeek = this.weeks.find(week => week.start <= currentDate && week.end >= currentDate);

    if (currentWeek) {
      this.showDays(currentWeek); // Display the days for the current week range
    }
  }

  ngAfterViewInit() {
    this.calculateTotalSum();
  }


  // Above contents added my me 

  addRow() {
    const newRow = {
      values: this.weekDays.map(() => '0.00')
    };
    this.rows.push(newRow);
  }

  deleteRow(index: number) {
    if (index > 0) {
      this.rows.splice(index, 1);
    }
    this.calculateTotalSum();
  }

  calculateTotalSum() {
    setTimeout(() => {
      let totalSum = 0;
      this.rows.forEach((row, rowIndex) => {
        const inputFields = this.inputFields.toArray();
        const totalSumElement = document.getElementById(`totalSum-${rowIndex}`);

        let rowSum = 0;

        inputFields.forEach((inputField: ElementRef<HTMLInputElement>, index) => {
          const value = parseFloat(inputField.nativeElement.value);
          if (!isNaN(value) && index >= rowIndex * this.weekDays.length && index < (rowIndex + 1) * this.weekDays.length) {
            rowSum += value;
            inputField.nativeElement.classList.remove('invalid-input');
          }
        });

        totalSum += rowSum;

        if (totalSumElement) {
          totalSumElement.innerText = rowSum.toFixed(2);
        }
      });

      this.totalSumAll = totalSum.toFixed(2);
    });
  }

  onSelectionChange(event: any) {
    // Do something with the selected option
    console.log(event.value);
  }

  selectFirstHalf() {
    this.showFirstHalf = true;
  }

  selectSecondHalf() {
    this.showFirstHalf = false;
  }

  getCurrentMonthName(): string {
    const month = this.selectedDate?.month;
    return this.getMonthName(month);
  }

  getMonthName(month: number): string {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month - 1];
  }

  getLastDayOfMonth(): string {
    const lastDayOfMonth = new Date(this.selectedDate.year, this.selectedDate.month, 0).getDate();
    return lastDayOfMonth.toString().padStart(2, '0');
  }

  getDropdownLabel(): string {
    const startDay = 1;
    const lastDayOfMonth = new Date(this.selectedDate.year, this.selectedDate.month, 0).getDate();
    const monthName = this.getMonthName(this.selectedDate.month);

    if (this.showFirstHalf) {
      const startDate = '01';
      const endDate = '15';
      return `${startDate}-${monthName.substr(0, 3)}-${this.selectedDate.year} to ${endDate}-${monthName.substr(0, 3)}-${this.selectedDate.year}`;
    } else {
      const startDate = '16';
      const endDate = lastDayOfMonth.toString().padStart(2, '0');
      return `${startDate}-${monthName.substr(0, 3)}-${this.selectedDate.year} to ${endDate}-${monthName.substr(0, 3)}-${this.selectedDate.year}`;
    }
  }

  generateWeekButtons() {
    const startDate = this.getDaysOfWeek(this.selectedDate);
    const weeks: { start: number; end: number; month: string }[] = [];
  
    const lastDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
    let weekStart = 1;
    let weekEnd = 7;
  
    while (weekStart <= lastDayOfMonth) {
      const monthName = this.getMonthName(startDate.getMonth() + 1);
      weeks.push({ start: weekStart, end: weekEnd, month: monthName });
  
      weekStart = weekEnd + 1;
      weekEnd = Math.min(weekStart + 6, lastDayOfMonth);
    }
    this.weeks = weeks;
  
    // Check if the currently selected week is within the generated weeks
    const currentWeek = weeks.find(week => week.start <= this.selectedDate.day && week.end >= this.selectedDate.day);
  
    if (currentWeek) {
      this.showDays(currentWeek); // Display the days for the current week range
    }
  }
  

  getDaysOfWeek(date: NgbDateStruct): Date {
    const weekStartDay = 1; // Assuming week starts on Monday
    const selectedDate = new Date(date.year, date.month - 1, date.day);
    const selectedDay = selectedDate.getDay();

    const diff = selectedDay >= weekStartDay ? selectedDay - weekStartDay : 7 - (weekStartDay - selectedDay);
    const weekStartDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - diff);

    return weekStartDate;
  }

  isHighlighted(date: NgbDate): boolean {
    const day = date.day;
    const currentMonth = date.month;
    const isFirstHalf = day >= 1 && day <= 15;
    return isFirstHalf && currentMonth === this.selectedDate.month;
  }

  isCurrentDate(date: NgbDate): boolean {
    const currentDate = new Date();
    return (
      date.year === currentDate.getFullYear() &&
      date.month === currentDate.getMonth() + 1 &&
      date.day === currentDate.getDate()
    );
  }

  showDays(week: { start: number, end: number }) {
    const startDate = this.getDaysOfWeek(this.selectedDate);
    const startDay = week.start;
    const endDay = week.end;
    const daysOfWeek: Date[] = [];
  
    for (let i = startDay; i <= endDay; i++) {
      const date = new Date(startDate.getFullYear(), startDate.getMonth(), i);
      daysOfWeek.push(date);
    }
  
    this.daysOfWeek = daysOfWeek;
  }
  
}