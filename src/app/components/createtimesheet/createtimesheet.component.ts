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

  constructor(){
    
  }
  ngOnInit() {
    this.addRow();
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
}