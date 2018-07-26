import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, public afAuth: AngularFireAuth) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        this.afAuth.auth.onAuthStateChanged(
          (user) => {
            if(user) {
              resolve(true);
            } else {
              this.router.navigate(['/auth']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}