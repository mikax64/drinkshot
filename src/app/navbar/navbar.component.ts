import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../services/upload-file.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgZone } from "@angular/core";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public uploadFileService : UploadFileService,  private router: Router, public authService : AuthService, private zone: NgZone) { }

  ngOnInit() {
  }

  onFileSelectedNavbar(event){
    console.log(event);
    this.uploadFileService.fileSelected(event);
    this.router.navigate(['/add-drink']);
  }
  // goToDrinkList(){
  //   this.zone.run(() => {
  //     this.router.navigate(["/drink-list"]);
  // });
  // }

}





 





