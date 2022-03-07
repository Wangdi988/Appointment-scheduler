import { Addroom } from './../../../../model/addroom/addroom';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './../../../../service/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-add-list',
  templateUrl: './room-add-list.component.html',
  styleUrls: ['./room-add-list.component.scss']
})
export class RoomAddListComponent implements OnInit {
  is_submitted:boolean;
  isEdit=false;
  roomList:any;
  roomObj = {
    roomList:'',
    id:''
  }
  addRoomForm:FormGroup;
  roomModel: Addroom = new Addroom();

  constructor(private api:ApiService,private http:HttpClient,private fb:FormBuilder) { }

  ngOnInit(): void {

    this.addRoomForm = this.fb.group({
      roomList: ['', [Validators.required]]
    })

    this.getRoomList();
  }


  get errorControl(){ 
    return this.addRoomForm.controls;
  }
  

  onAddRoom(data){

    this.is_submitted =true
    if(this.addRoomForm.valid){
      this.roomModel.roomList = data.value.roomList;
      this.api.addRoom(this.roomModel).subscribe(res=>{
        alert("You have added new room list")
        this.is_submitted = false
        this.addRoomForm.reset();
        this. getRoomList();
      })
    }

  }


  getRoomList(){
    this.api.getRoomList().subscribe(res=>{

      this.roomList = res;
      console.log("room details", res);
    })
  }


  editList(room){
    this.isEdit = true
    this.roomObj= room;
    console.log('room',room);
    
  }

  deleteRoomList(room){
    this.api.deleteRoomList(room.id).subscribe(response=>{
      alert("Deleted successfully")
      this.getRoomList();
    })
  }


  updateRoom(){
    this.is_submitted =true
    if(this.addRoomForm.valid){
      this.api.updateRoom(this.roomObj).subscribe(res=>{
        alert("Update Successful")
        this.is_submitted = false
        this.addRoomForm.reset();
        this.isEdit=false;
        this. getRoomList();
      })
    }
  }


}
