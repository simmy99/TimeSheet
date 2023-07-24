import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatetimesheetComponent } from './components/createtimesheet/createtimesheet.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LasttimesheetComponent } from './components/lasttimesheet/lasttimesheet.component';
import { SubmittedtimesheetComponent } from './components/submittedtimesheet/submittedtimesheet.component';
import { MytimesheetComponent } from './components/mytimesheet/mytimesheet.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';




@NgModule({
  declarations: [
    AppComponent,
    CreatetimesheetComponent,
    DashboardComponent,
    LasttimesheetComponent,
    SubmittedtimesheetComponent,
    MytimesheetComponent,
    HomeComponent,
    SearchComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbDropdownModule,
    NoopAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
