import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userDetails:any;
  fname:any;
  lname:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.currentUser();
  }

  currentUser(){
    this.userDetails = JSON.parse(localStorage.getItem('currentuser'));
    this.fname = this.userDetails.fname;
    this.lname = this.userDetails.lname;
  }

  logout(){
    window.alert('Logout Successfull')
    localStorage.removeItem('currentuser');
    this.router.navigate(['/login']);
  }

}
