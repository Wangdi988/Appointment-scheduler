import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppointmentComponent } from './components/appointment/appointment.component';


@NgModule({
  declarations: [
    UserDashboardComponent,
    NavbarComponent,
    AppointmentComponent,
   
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
