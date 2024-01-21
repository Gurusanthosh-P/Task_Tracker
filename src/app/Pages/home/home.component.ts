import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private router:Router){}

  ngOnInit(): void {
    
  }

  logout(){
    Swal.fire('Logout Success','Thank You','success')
    this.router.navigate(['login'])
  }
}
