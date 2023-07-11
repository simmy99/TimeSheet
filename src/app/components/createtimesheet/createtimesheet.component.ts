import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $: any; // Import jQuery

@Component({
  selector: 'app-createtimesheet',
  templateUrl: './createtimesheet.component.html',
  styleUrls: ['./createtimesheet.component.css']
})
export class CreatetimesheetComponent implements OnInit, AfterViewInit {
  selectedOption: string = '';
  dropdownOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];

  ngOnInit() {
    // Initialize popover after the component is initialized
    $(document).ready(() => {
      $('[data-bs-toggle="popover"]').popover();
    });
  }

  ngAfterViewInit() {
    // Destroy popover when the component is destroyed to prevent memory leaks
    $(document).ready(() => {
      $('[data-bs-toggle="popover"]').on('hidden.bs.popover', () => {
        $(this).popover('dispose');
      });
    });
  }

  onSelectionChange(event: any) {
    // Do something with the selected option
    console.log(event.value);
  }
}