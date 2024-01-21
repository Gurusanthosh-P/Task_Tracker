import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/contents/loginPage/loginpage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{

  User:any[]=[]
  username:string=''
  password:string=''
  selectedUser:any


  constructor(private router:Router){}

  ngOnInit(): void {
    this.dropDownAssign()
  }

  dropDownAssign(){
    this.User = user
    console.log(this.User);
    
  }


  login(){
    if(this.selectedUser.name == 'User')
    {
      this.router.navigate(['home'])
      console.log(this.username,this.password);
      Swal.fire('Login Success','Welcome','success')
    }
  }

  signup(){    
    this.router.navigate(['signup'])
  }
}
