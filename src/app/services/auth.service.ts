import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Injectable()

export class AuthService{
  
    isAuth: boolean = false;
    private usersCollection: AngularFirestoreCollection<User>;
    users: Observable<User[]>;
    userId : string;
    idParam : string = '';

    constructor(private readonly afs: AngularFirestore, public afAuth: AngularFireAuth, private router: Router) {
      this.usersCollection = afs.collection<User>('users')
    }
  
    getUserInfos(){
      this.afAuth.auth.onAuthStateChanged((user)=> {
        if (user) {
          this.isAuth = true;
          this.userId = user.uid;
        }else{
          this.isAuth = false;
        }
      });
    }
    googleLogin() {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((result) => {
        this.createNewUser(result.user.uid);

      })
    }

    createNewUser(id : string){
      this.userId = id;
      const item: User = { id };


      //this.afs.collection('users').valueChanges().subscribe( values => console.log(values.length));


      this.afs.collection(`users`, ref => ref.where('id', "==", id)).snapshotChanges().subscribe(res => {
        // if user don't exist
        if (res.length === 0){
          this.usersCollection.doc(id).set(item);
        }
      });
      this.router.navigate(['/drink-list']);
    }

    
    createAccount(email: string, password: string){
      return new Promise(
        (resolve, reject) => {
          this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
            (result) => {
              const id = result.user.uid;
              this.createNewUser(id);
              resolve();
              
            },
            (error) => {
              reject(error);

            }
          );
        }
      );
    }
    
    logout() {
      this.afAuth.auth.signOut();
    }
}
