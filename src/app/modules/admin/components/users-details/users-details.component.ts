import { Approve } from './../../../../model/approve';
import { ApiService } from './../../../../service/api.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit {
  users:any;
  udateApprove: Approve = new Approve();
  constructor(
    private http:HttpClient, 
    private api:ApiService) { }

  ngOnInit(): void {
    this.getUsers();
  }


  getUsers(){
    this.api.getUserDetails().subscribe(res=>{
      this.users = res;
      console.log('users',res);
    })
  }
  // getAllBillquery(){
  //   this.api.getUsers().subscribe( reponse =>{
  //     this.tashi_cell_bill_query = reponse;
  //     console.log("api data", reponse)
  //   })
  // }

  approveUser(data){

    this.udateApprove.fname = data.fname
    this.udateApprove.lname = data.lname
    this.udateApprove.email = data.email
    this.udateApprove.userType = data.userType
    this.udateApprove.password = data.password
    this.udateApprove.isApprove = 1

    let id = data.id
    this.api.approveUser(id, this.udateApprove).subscribe(res=>{
        this. getUsers();
    })

  }

  deleteUserDetails(data){
    this.api.deleteUser(data.id).subscribe(res=>{
      this. getUsers();
    })
  }
  
}