import { ApiService } from './../service/api.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth : ApiService,
    private router:Router){}
  // canActivate()
  //   // route: ActivatedRouteSnapshot,
  //   // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  //   {
  //    if(!this.auth.isLoggedIn()){
  //     this.router.navigate(['login'])
  //     return false;
  //    }
     
  //    return true;
  // }

  // canActivate() {
  //   // const tokens = localStorage.getItem('tokens');
  //   if(!this.auth.isLoggedIn()) {
  //     this.router.navigate(['login'])
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }


  canActivate(){
    const admin = localStorage.getItem('currentuser');
    if(admin){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false
    }
  }
  
}
