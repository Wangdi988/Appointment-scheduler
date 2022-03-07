import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './../service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidUsercredential:boolean;
  is_submitted:boolean
  approve:boolean
  public loginForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private api:ApiService,
    private http:HttpClient,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
    })
  }

  loginUser(){
    this.is_submitted = true;
    if(this.loginForm.valid){
      this.api.loggingin().subscribe(res=>{
        const user = res.find((a:any)=>{
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });

        if(user){
          
          if(user.isApprove==1){
            localStorage.setItem('currentuser', JSON.stringify(user));
          
          }
        
          

          if(user.userType === "1"){
            console.log("admin");
            this.router.navigate(['admin'])
            this.loginForm.reset();
          }
          
          else if(user.userType === "0" && user.isApprove==1){
            this.router.navigate(['users'])
            this.loginForm.reset();
          }else{
            this.approve = true
          }
        }

        else{
          this.invalidUsercredential=true;
        }
        
      },err=>{
        alert('Something went wrong');
      })

    }
     
  }

  get errorControl(){
    return this.loginForm.controls;
  }
  get password(){
    return this.loginForm.get('password')
  }
}