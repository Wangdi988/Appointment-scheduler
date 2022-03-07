import { ApiService } from './../../../../service/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.scss']
})
export class AppointmentsListComponent implements OnInit {

  appointList:any;
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this. getAppointmentList();
  }

  getAppointmentList(){
    this.apiService.getAppointmentList().subscribe(response=>{
      this.appointList = response;
    })
  }
  
}
