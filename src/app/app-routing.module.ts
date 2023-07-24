import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreatetimesheetComponent } from './components/createtimesheet/createtimesheet.component';
import { LasttimesheetComponent } from './components/lasttimesheet/lasttimesheet.component';
import { SubmittedtimesheetComponent } from './components/submittedtimesheet/submittedtimesheet.component';
import { MytimesheetComponent } from './components/mytimesheet/mytimesheet.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
 
const routes: Routes = [

  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'createtimesheet', component: CreatetimesheetComponent},
  {path:'lasttimesheet', component: LasttimesheetComponent},
  {path:'submittedtimesheet', component: SubmittedtimesheetComponent},
  {path:'mytimesheet', component: MytimesheetComponent},
  {path:'search', component: SearchComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
