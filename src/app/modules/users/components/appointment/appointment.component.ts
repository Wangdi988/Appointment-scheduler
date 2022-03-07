import { Router } from '@angular/router';
import { Appointment } from './../../../../model/appointment/appointment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../../../service/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  roomList:any;
  selected: any;
  is_submitted:boolean=false
  selectedRoom :boolean =false
  ToBookTime:boolean=false;
  user_id:any
  userDetails:any
  appointmentDetails:any;

  bookedroom: any;
  bookedDate: any;
  bookTime:any
  bookedTime:any

  morning:any;
  beforeNoon:any;
  afterNoon:any;
  evening:any;
  roomWasBook:boolean=false

  roomWasBooked:boolean=false

  Appointments:FormGroup
  editAppointmentForm:FormGroup
  editData ={
    agenda:'',
    bookDate:'',
    bookTime:'',
    roomloc:'',
    id: ''
  };

  appointmentObj: Appointment = new Appointment()

  constructor(private apiService:ApiService, private formbuilder:FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.getAppointmentList();

    this.Appointments = this.formbuilder.group({
      agenda: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+$')]],
      roomloc: ['', Validators.required],
      bookDate: ['', Validators.required],
      bookTime: ['', Validators.required]
    })
    this. currentUser();
    this.getAppointment_Lists();
  }

  get errorControl(){ 
    return this.Appointments.controls;
  }

  selectRoom(event){
    const room = event.target.value
    this.bookedroom = room
    console.log('Booked Room', room);
    this.roomWasBooked=false
    this.roomWasBook=false
    
    if(room !=null){
      this.selectedRoom = true
    }
    this.checkDublicatedData();
    this. checkDublicatedDataForEdit();
  }

  showTime(event){
    
    const time = event.target.value
    this.bookedDate = time
    console.log('test', time);

    if(time != null){
      this.ToBookTime = true;
    }

    this.roomWasBooked=false
    this.roomWasBook=false
    this.checkDublicatedData();
    this. checkDublicatedDataForEdit();

  }

  bookTimeForMeeting(event){
    this.roomWasBook=false
    const data = event.target.value;
    this.bookTime = data
    this.roomWasBooked=false
    this. checkDublicatedDataForEdit();
    
  }

  checkDublicatedData(){
   
    this.apiService.checkDublicatedData().subscribe(response=>{
      response.forEach(e => {
        if(e.roomloc == this.bookedroom && this.bookedDate==e.bookDate && e.bookTime=="9 AM - 11 AM"){
          this.morning = "9 AM - 11 AM";
          console.log(this.morning);
        }

        else if(e.roomloc == this.bookedroom && this.bookedDate==e.bookDate && e.bookTime=="11 AM - 1 PM"){
          this.beforeNoon = "11 AM - 1 PM"
          console.log(this.beforeNoon);
        }
        
        else if(e.roomloc == this.bookedroom && this.bookedDate==e.bookDate && e.bookTime=="2 PM - 4 PM"){
          this.afterNoon = "2 PM - 4 PM"
          console.log(this.afterNoon);
        }
        
        else if(e.roomloc == this.bookedroom && this.bookedDate==e.bookDate && e.bookTime=="4 PM - 6 PM"){
          this.evening = "4 PM - 6 PM"
          console.log(this.evening );
        }

      })
    })

  }

  checkDublicatedDataForEdit(){
   
    this.apiService.checkDublicatedData().subscribe(response=>{
     
      response.forEach(e => {
        if(e.id != this.editData.id){
          if(e.roomloc == this.editData.roomloc && this.editData.bookDate==e.bookDate && e.bookTime=="9 AM - 11 AM"){
            this.morning = "9 AM - 11 AM";
            console.log(this.morning);
            
          }else if(e.roomloc == this.editData.roomloc && this.editData.bookDate==e.bookDate && e.bookTime=="11 AM - 1 PM"){
            this.beforeNoon = "11 AM - 1 PM"
            console.log(this.beforeNoon);
    
          }else if(e.roomloc == this.editData.roomloc && this.editData.bookDate==e.bookDate && e.bookTime=="2 PM - 4 PM"){
            this.afterNoon = "2 PM - 4 PM"
            console.log(this.afterNoon);
    
          }else if(e.roomloc == this.editData.roomloc && this.editData.bookDate==e.bookDate && e.bookTime=="4 PM - 6 PM"){
            this.evening = "4 PM - 6 PM"
            console.log(this.evening );
    
          }
        }
      })
    })

  }

  currentUser(){
    this.userDetails = JSON.parse(localStorage.getItem('currentuser'));
    this.user_id = this.userDetails.id;
  }

  getAppointmentList(){

    this.apiService.getUserRoomList().subscribe(response=>{
    this.roomList = response;
    console.log('room list:::', response);
    var string1 = JSON.stringify(response);

    response.forEach(e => {
      if(e.roomList == "Admin Room"){
        console.log('Test::::', e.roomList);
      }
    })
   })
  }

  appSubmit(){
    this.is_submitted = true;
    if(this.Appointments.valid){
      this.appointmentObj.agenda = this.Appointments.value.agenda
      this.appointmentObj.roomloc = this.Appointments.value.roomloc
      this.appointmentObj.bookDate = this.Appointments.value.bookDate
      this.appointmentObj.bookTime = this.Appointments.value.bookTime
      this.appointmentObj.user_id = this.user_id

      if(this.morning == this.bookTime){
        this.roomWasBooked = true
      }

      else if (this.beforeNoon == this.bookTime){
        this.roomWasBooked = true
      }

      else if(this.afterNoon == this.bookTime){
        this.roomWasBooked = true
      }

      else if(this.evening == this.bookTime){
        this.roomWasBooked = true
      }

      else{
        this.apiService.createAppointment(this.appointmentObj).subscribe(response=>{
          alert("Added Successful")
          this.is_submitted =false
          this.Appointments.reset();
  
          this.getAppointment_Lists()
          this.getAppointmentList();
        })
      }
    }
  }

  getAppointment_Lists(){
    this.apiService.getAppointmentLists().subscribe(response=>{
      console.log('testttttttttt:', response);
      this.appointmentDetails = response;
    })
  }

  editAppointment(edit){
    this.editData = edit
    this. checkDublicatedDataForEdit();
  }

  editAppSubmit(){
    this.is_submitted =true  

    if(this.morning == this.editData.bookTime){
      this.bookedTime = this.editData.bookTime
      this.roomWasBook=true
    }
    
    else if (this.beforeNoon == this.editData.bookTime){
    this.bookedTime = this.editData.bookTime
     this.roomWasBook=true
    }
    
    else if(this.afterNoon == this.editData.bookTime){
      this.bookedTime = this.editData.bookTime
     this.roomWasBook=true
    }
    
    else if(this.evening == this.editData.bookTime){
     this.bookedTime = this.editData.bookTime
     this.roomWasBook=true
    }
    
    else{
      this.apiService.updateAppointment(this.editData).subscribe(response=>{
        alert('Update the appointment successful')
        this.is_submitted =false
          this.Appointments.reset();
          this.getAppointment_Lists()
          this.getAppointmentList();
      })
    }

    this.getAppointmentList()
  }

  deleteAppointment(appoint){
    this.apiService. deleteAppointment(appoint.id).subscribe(response=>{
      alert("Deleted the appointment successfully")
      this.getAppointment_Lists()
    })
  }
}
