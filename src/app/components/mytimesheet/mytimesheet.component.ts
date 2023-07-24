import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mytimesheet',
  templateUrl: './mytimesheet.component.html',
  styleUrls: ['./mytimesheet.component.css']
})
export class MytimesheetComponent {

  dateRange: any;
  fromDate: string;
  toDate: string;
  selectedProject: string;
  selectedStatus: string;


  constructor(private router: Router) {
 // Initialize the form fields if needed
 this.fromDate = '';
 this.toDate = '';
 this.selectedProject = '';
 this.selectedStatus = '';
}


  
openCalendar(field: string) {
  // Implement your logic to open the calendar for the respective field.
  // This function will be called when the calendar icon or the input field is clicked.
  // You can use any date picker library or a custom implementation.
}

 // Cancel button
 goToDashboard() {
  this.router.navigate(['/dashboard']);
}

//search button
goToSearch() {
  this.router.navigate(['/search']);
}

}
