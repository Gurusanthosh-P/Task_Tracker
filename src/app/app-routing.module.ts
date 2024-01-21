import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { SignupComponent } from './Pages/signup/signup.component';

const routes: Routes = [
  {component:HomeComponent,path:'home'},
  {component:LoginComponent,path:'login'},
  {component:SignupComponent,path:'signup'},
  {component:HomeComponent,path:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
