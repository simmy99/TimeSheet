import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-createtimesheet',
  templateUrl: './createtimesheet.component.html',
  styleUrls: ['./createtimesheet.component.css']
})
export class CreatetimesheetComponent implements OnInit, AfterViewInit {
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef<HTMLInputElement>>;

  selectedOption: string = '';
  dropdownOptions: string[] = ['26-6-23 to 2-7-23', '3-7-23 to 9-7-23', '10-7-23 to 16-7-23', '17-7-23 to 23-7-23', '24-7-23 to 30-7-23', '31-7-23 to 6-8-23'];

  rows: any[] = [];
  weekDays: string[] = ['mon 3 july', 'tue 4 july', 'wed 5 july', 'thu 6 july', 'fri 7 july', 'sat 8 july', 'sun 9 july'];

  ngOnInit() {
    this.addRow();
  }

  ngAfterViewInit() {
    this.calculateTotalSum();
  }

  addRow() {
    this.rows.push({});
  }

  deleteRow(index: number) {
    if (index > 0) {
      this.rows.splice(index, 1);
    }
    this.calculateTotalSum();
  }

  calculateTotalSum() {
    setTimeout(() => {
      const inputFields = this.inputFields.toArray();
      const totalSumElement = document.getElementById('totalSum');

      let totalSum = 0;

      inputFields.forEach((inputField: ElementRef<HTMLInputElement>) => {
        const value = parseFloat(inputField.nativeElement.value);
        if (!isNaN(value)) {
          totalSum += value;
          inputField.nativeElement.classList.remove('invalid-input');
        } else {
          inputField.nativeElement.classList.add('invalid-input');
        }
      });

      if (totalSumElement) {
        totalSumElement.innerText = totalSum.toFixed(2);
      }
    });
  }

  onSelectionChange(event: any) {
    // Do something with the selected option
    console.log(event.value);
  }
}