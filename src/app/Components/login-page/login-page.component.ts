import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http/http.service';
import { user } from 'src/app/contents/loginPage/loginpage';
import { message, messages } from 'src/app/messages/messages';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  User: any[] = []
  username: string = ''
  password: string = ''
  selectedUser: any

  postData = {
    userName: "",
    password: ""
  }
  constructor(private router: Router, private httpService: HttpService) { }

  ngOnInit(): void {
    this.dropDownAssign()
  }

  dropDownAssign() {
    localStorage?.removeItem('token')
    this.User = user
  }


  login() {
    if (this.username && this.password && this.selectedUser?.name == 'User') {
      this.postData = {
        userName: this.username,
        password: this.password
      }
      this.httpService.userLogin(this.postData).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response?.token)
          Swal.fire(message?.loginSuccess, message?.welcome, 'success')
          this.router.navigate(['home'])
        },
        error: (error: any) => {
          console.log(error);
          Swal.fire(error?.name, messages?.auth, 'error')
        }
      })
    }
    else {
      Swal.fire(message?.LoginFailed, message?.Error, 'error')
    }
  }

  signup() {
    this.router.navigate(['signup'])
  }
}
