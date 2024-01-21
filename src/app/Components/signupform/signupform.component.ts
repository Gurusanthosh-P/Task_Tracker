import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.scss']
})
export class SignupformComponent implements OnInit{

  email:string=''
  username:string=''
  password:string=''

  constructor(private router:Router){}

  ngOnInit(): void {
    
  }

  login(){
    this.router.navigate(['login'])
  }

  signUp(){
    console.log(this.email,this.username,this.password);
    
  }
}
