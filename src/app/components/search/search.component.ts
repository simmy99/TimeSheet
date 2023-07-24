import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  headers1to15: string[] = Array.from({ length: 14 }, (_, i) => ` ${i + 1}`);
  headers16to31: string[] = Array.from({ length: 16 }, (_, i) => `${i + 16}`);

  rows: any[] = [
    {
      project: 'Project 1',
      data1to15: Array.from({ length: 14 }, () => '0'),
    },
    {
      project: 'Project 2',
      data1to15: Array.from({ length: 14 }, () => '0'),
    },
    {
      project: 'Project 3',
      data1to15: Array.from({ length: 14 }, () => '0'),
    },
    {
      project: 'Project 4',
      data1to15: Array.from({ length: 14 }, () => '0'),
    }
  ];

  constructor(private router: Router) {
  }

 // Cancel button
 goToDashboard() {
  this.router.navigate(['/dashboard']);
}

//search button
goToMytimesheet() {
  this.router.navigate(['/mytimesheet']);
}


}
