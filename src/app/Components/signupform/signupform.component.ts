import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http/http.service';
import { message, messages } from 'src/app/messages/messages';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.scss']
})
export class SignupformComponent implements OnInit {

  email: string = ''
  username: string = ''
  password: string = ''

  postData = {
    userName: "",
    email: "",
    password: ""
  }

  constructor(private router: Router, private httpService: HttpService) { }

  ngOnInit(): void {

  }

  login() {
    this.router.navigate(['login'])
  }

  signUp() {
    this.postData = {
      userName: this.username,
      email: this.email,
      password: this.password
    }

    this.httpService.userSignUp(this.postData).subscribe({
      next: (response: any) => {
        Swal.fire(message?.signUpSuccess, message?.pleaseLogin, 'success')
        if(Swal){
          this.router.navigate(['login'])
        }
      },
      error: (error: any) => {
        Swal.fire(messages?.fail, message?.Error, 'error')
      }
    })
  }

}
