import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  registerForm: FormGroup;
  loginForm : FormGroup;
  errorMessage: any ;
  errorMessageCreate: any ;
  testMika : string = 'tt';
  isLogin = true;

  constructor(private formBuilder: FormBuilder, public authService : AuthService, private router: Router) {

   }

  ngOnInit() {
    this.initRegisterForm();
    this.initLoginForm();
  }

  initRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onRegisterSubmit() {
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    this.authService.createAccount(email, password).catch((error)=> {
      // Handle Errors here.
      console.log(error);
      this.errorMessageCreate = error.message;

    });
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      emailLogin: ['', Validators.required],
      passwordLogin: ['', Validators.required]
    });
  }
  onLoginSubmit() {
    const email = this.loginForm.get('emailLogin').value;
    const password = this.loginForm.get('passwordLogin').value;
    console.log(this.testMika); 
    this.authService.afAuth.auth.signInWithEmailAndPassword(email, password).catch((error)=> {
      // Handle Errors here.
      let errorCode = error.code;
      this.errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        this.errorMessage ='Wrong password.';
      } else {
        this.errorMessage = error.message;
      }
      this.errorMessage = error.message;
    });
  }

  onGoogleLogin(){
    this.authService.googleLogin();
  }
  onLogout(){
    this.authService.logout();
  }
  togglePage(){
    this.isLogin = !this.isLogin;
  }

}
