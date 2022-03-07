import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userDetails:any;
  fname:any
  lname:any
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.currentUser();
  }

  logout(){
    window.alert('Logout Successfull')
    localStorage.removeItem('currentuser');
    this.router.navigate(['/login']);
  }

  currentUser(){
    this.userDetails = JSON.parse(localStorage.getItem('currentuser'));
    this.fname = this.userDetails.fname;
    this.lname = this.userDetails.lname;
  }

}