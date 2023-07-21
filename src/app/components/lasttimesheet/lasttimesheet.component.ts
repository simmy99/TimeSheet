import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lasttimesheet',
  templateUrl: './lasttimesheet.component.html',
  styleUrls: ['./lasttimesheet.component.css']
})
export class LasttimesheetComponent implements OnInit, AfterViewInit {
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef<HTMLInputElement>>;

  selectedOption: string = '';

  isLeftSectionVisible: boolean = false;
  rows: any[] = [];
  weekDays: string[] = ['Mon 3 july', 'Tue 4 july', 'Wed 5 july', 'Thu 6 july', 'Fri 7 july', 'Sat 8 july', 'sun 9 july'];

  daysOfWeek: Date[] = [];
  showFirstHalf: boolean = false;
  selectedDate: NgbDateStruct;
  minDate: NgbDate;
  maxDate: NgbDate;
  weeks: { start: number; end: number, month: string }[] = [];  profileContent: string = '';
  totalSumAll: string = '0.00';
  columnSums: number[] = [];

  
  constructor(private calendar: NgbCalendar, private router: Router) {
    const today = this.calendar.getToday();
    this.selectedDate = today;

    this.showFirstHalf = true;
    this.minDate = this.calendar.getPrev(this.calendar.getToday(), 'y', 5) as NgbDate;
    this.maxDate = this.calendar.getNext(this.calendar.getToday(), 'y', 5) as NgbDate;
  }

  ngOnInit() {
    this.addRow();
    this.generateWeekButtons();

    const currentDate = this.selectedDate.day;
    const currentWeek = this.weeks.find(week => week.start <= currentDate && week.end >= currentDate);

    if (currentWeek) {
      this.showDays(currentWeek);
    }
  }

  toggleLeftSection() {
    this.isLeftSectionVisible = !this.isLeftSectionVisible;
  }

  ngAfterViewInit() {
    this.calculateTotalSum();
  }

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
    console.log(event.value);
  }

  selectFirstHalf() {
    this.showFirstHalf = true;
  }

  selectSecondHalf() {
    this.showFirstHalf = false;
  }

  isFirstHalfSelected(): boolean {
    return this.showFirstHalf;
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

  // Update the generateWeekButtons() function
  generateWeekButtons() {
    const startDate = this.getDaysOfWeek(this.selectedDate);
    const weeks: { start: number; end: number; month: string }[] = [];
    const currentDate = new Date();
    let currentDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    currentDay.setDate(currentDay.getDate() - currentDay.getDay() + 1); // Start from the first day of the week
    while (weeks.length < 6 && currentDay.getMonth() === startDate.getMonth()) {
      const weekStart = currentDay.getDate();
      currentDay.setDate(currentDay.getDate() + 6); // Set to the last day of the week
      const weekEnd = currentDay.getDate();
      const monthName = this.getMonthName(currentDay.getMonth() + 1);
      weeks.push({ start: weekStart, end: weekEnd, month: monthName });
      currentDay.setDate(currentDay.getDate() + 1); // Move to the next day

    }
    this.weeks = weeks;
    const currentWeek = weeks.find(
      (week) =>
        week.start <= currentDate.getDate() &&
        week.end >= currentDate.getDate() &&
        week.month === this.getCurrentMonthName().substr(0, 3)
    );
    if (currentWeek) {
      this.showDays(currentWeek)
    }
  }

  getDaysOfWeek(date: NgbDateStruct): Date {
    const weekStartDay = 1;
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

  // Back button
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}