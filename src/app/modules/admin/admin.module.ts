import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { RoomAddListComponent } from './components/room-add-list/room-add-list.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    SidebarComponent,
    UsersDetailsComponent,
    AppointmentsListComponent,
    RoomAddListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [AdminDashboardComponent,  UsersDetailsComponent, AppointmentsListComponent],
})
export class AdminModule { }
