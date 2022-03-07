import { map } from 'rxjs/operators';
import { APPOINTMENT_API } from './../api.constant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url='http://localhost:3000/users';
  constructor(private http:HttpClient) { }

  sign_up(data){
    return this.http
    .post<any>(`${APPOINTMENT_API}` + "users", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getUserByEmail(email:string){
    return this.http.get<any[]>(`${this.url}?email=${email}`);
  }

  loggingin(){
    return this.http.get<any>(`${APPOINTMENT_API}` + 'users')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getUserDetails(){
    return this.http
    .get<any>(`${APPOINTMENT_API}` + "users"
    )
  }

  isLoggedIn(){
    return localStorage.getItem('token');
  }

  approveUser(id, aprove){
    return this.http.put<any>(`${APPOINTMENT_API}` + "users/" + id, aprove)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteUser(id:any){
    return this.http.delete<any>(`${APPOINTMENT_API}`+"users/" + id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  // book room
  addRoom(data){
    return this.http
    .post<any>(`${APPOINTMENT_API}` + "roomlist", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getRoomList(){
    return this.http
    .get<any>(`${APPOINTMENT_API}` + "roomlist")
    .pipe(map((res:any)=>{
      return res;
    }))

  }

  updateRoom(update){
    return this.http.put<any>(`${APPOINTMENT_API}` + "roomlist/" + update.id, update)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteRoomList(id){
    return this.http.delete<any>(`${APPOINTMENT_API}`+"roomlist/" + id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


// user
  getUserRoomList(){
    return this.http.get<any>(`${APPOINTMENT_API}` + "roomlist")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createAppointment(data){
    return this.http
    .post<any>(`${APPOINTMENT_API}` + "appointment", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getAppointmentLists(){
    return this.http.get<any>(`${APPOINTMENT_API}` + "appointment")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getAppointmentList(){
    return this.http.get<any>(`${APPOINTMENT_API}` + "appointment")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateAppointment(data){
    return this.http.put<any>(`${APPOINTMENT_API}` + "appointment/" + data.id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteAppointment(id:any){
    return this.http.delete<any>(`${APPOINTMENT_API}`+"appointment/" + id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  checkDublicatedData(){
   return this.http
   .get<any>(`${APPOINTMENT_API}` +"appointment")
   .pipe(map((res:any)=>{
    return res;
  }))
  }


}
