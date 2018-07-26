import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit{
  ngOnInit(): void {

  }
  
  isAuth : boolean = false;


  constructor( public authService : AuthService) {
    this.authService.getUserInfos();

 
  }



  

  
}
