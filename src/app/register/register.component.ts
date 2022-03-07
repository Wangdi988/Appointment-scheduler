import { Registration } from './../model/registration';
import { ApiService } from './../service/api.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm : FormGroup
  is_submitted:boolean;
  registrationModelObj: Registration = new Registration();
  constructor(
    private http:HttpClient, 
    private api:ApiService, 
    private router:Router,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fname:['',[Validators.required, Validators.pattern('[a-zA-Z ]+$')]],
      lname:['',[Validators.required, Validators.pattern('[a-zA-Z ]+$')]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
    })
  }

  signUp(){
    
    this.is_submitted = true;

    if(this.signupForm.valid){
      this.registrationModelObj.fname = this.signupForm.value.fname;
      this.registrationModelObj.lname = this.signupForm.value.lname;
      this.registrationModelObj.email = this.signupForm.value.email;
      this.registrationModelObj.password = this.signupForm.value.password;
      this.registrationModelObj.userType = '0'
      this.registrationModelObj.isApprove = 0

      this.api.sign_up(this.registrationModelObj).subscribe(res=>{
      this.signupForm.reset();
      alert("You Have Registered Successfully")
      this.router.navigate(['login']);

    }),
    err=>{
      alert('Something went wrong')
    }
    }
  } 

  get errorControl(){
    return this.signupForm.controls;
  }

  get email(){
    return this.signupForm.get('email')
  }

  get password(){
    return this.signupForm.get('password')
  }
}