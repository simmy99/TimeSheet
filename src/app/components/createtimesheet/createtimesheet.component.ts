import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
declare var $: any; // Import jQuery for add sum

@Component({
  selector: 'app-createtimesheet',
  templateUrl: './createtimesheet.component.html',
  styleUrls: ['./createtimesheet.component.css']
})
export class CreatetimesheetComponent implements OnInit, AfterViewInit {
  @ViewChild('inputFields') inputFields!: ElementRef<HTMLInputElement[]>;

  selectedOption: string = '';  // left dropdown
  dropdownOptions: string[] = ['26-6-23 to 2-7-23', '3-7-23 to 9-7-23', '10-7-23 to 16-7-23', '17-7-23 to 23-7-23', '24-7-23 to 30-7-23', '31-7-23 to 6-8-23'];

  weeks: string[] = []; // weeks in tymsheet
  weekDays: number[] = [1, 2, 3, 4, 5, 6, 7];
  defaultTotalSum: string = '0.00';

  rows: any[] = []; // for add row

  ngOnInit() {
    // Initialize popover after the component is initialized
    $(document).ready(() => {
      $('[data-bs-toggle="popover"]').popover();
    });
    this.addRow();
  }

  addRow() {
    this.rows.push({}); // Add an empty row
  }

  deleteRow(i: number) {
    if (i > 0) {
      this.rows.splice(i, 1); // Delete the row 
    }
  }

  ngAfterViewInit() {
    // Destroy popover when the component is destroyed to prevent memory leaks
    $(document).ready(() => {
      $('[data-bs-toggle="popover"]').on('hidden.bs.popover', () => {
        $(this).popover('dispose');
      });
    });

    const inputs = $('input[type="text"]');
    const totalSum = $('#totalSum');

    inputs.on('input', () => {
      let sum = 0;
      inputs.each((index: number, input: HTMLInputElement) => {
        const value = parseFloat($(input).val() as string);
        if (!isNaN(value)) {
          sum += value;
        }
      });
      totalSum.text(sum.toFixed(2));
    });
  }

  onSelectionChange(event: any) {
    // Do something with the selected option
    console.log(event.value);
  }
}