import { RoomAddListComponent } from './components/room-add-list/room-add-list.component';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersDetailsComponent } from './components/users-details/users-details.component';

const routes: Routes = [

  {path:'', component:AdminDashboardComponent, children:[
    {path:'user-details', component:UsersDetailsComponent},
    {path:'appointment-list', component:AppointmentsListComponent},
    {path:'add-room-list', component:RoomAddListComponent},
    {path:'', redirectTo:'/admin/user-details', pathMatch: 'full'}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
