// import { UsersModule } from './modules/users/users.module';
import { AuthGuard } from './shared/auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'admin', loadChildren: () => import('./modules/admin/admin.module').then((m)=>m.AdminModule),canActivate:[AuthGuard]}, 
  {path:'users', loadChildren: () => import('./modules/users/users.module').then((m)=>m.UsersModule),canActivate:[AuthGuard]},
  // {path:'admin', loadChildren: () => import('./modules/admin/admin.module').then((m)=>m.AdminModule), canActivate:[AuthGuard]},
  {path:'**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
