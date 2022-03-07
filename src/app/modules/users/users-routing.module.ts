import { AppointmentComponent } from './components/appointment/appointment.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path:'', component:UserDashboardComponent, children:[
    {path:'appointment-list', component:AppointmentComponent},
    {path:'', redirectTo:'/users/appointment-list', pathMatch: 'full'}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
