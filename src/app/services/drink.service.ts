import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AuthService } from '../services/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Injectable()

export class DrinkService {
    private usersCollection : AngularFirestoreCollection<User>;
    drinkLength : number;
    errorMessage: string;
    public drinkTypeList =["Beer","Wine","Cider","Vodka","Tequila","Whisky","Other"];
    public defaultDrink = this.drinkTypeList[0];

    constructor(private readonly afs: AngularFirestore, private storage: AngularFireStorage, public authService : AuthService,private router: Router) {
  
        this.usersCollection = afs.collection<User>('users');
        //get number of drinks
        this.afs.collection('users/'+this.authService.userId+'/drinks/').valueChanges().subscribe( values => this.drinkLength = values.length);
    }
  
    createDrink(drinkName : string, drinkType : string,drinkTypeOther : string, drinkComments: string, drinkPhotoUrl: string, drinkDate : any, drinkXPosition, drinkYPosition ){
    

        let subscription = this.afs.doc('users/'+this.authService.userId+'/drinks/'+ `${this.drinkLength}`)
        .snapshotChanges()
        .subscribe(x => {

          // if(x.payload.exists){
          //   alert("existe déja");
          // }else{
            this.usersCollection.doc(this.authService.userId).collection('drinks').doc(`${this.drinkLength}`).set({
              drinkId : `${this.drinkLength}`,
              drinkName: drinkName,
              drinkType:drinkType,
              drinkTypeOther:drinkTypeOther,
              drinkComments: drinkComments,
              drinkPhotoUrl: drinkPhotoUrl,
              drinkDate : drinkDate,
              drinkXPosition : drinkXPosition,
              drinkYPosition : drinkYPosition
            });
            subscription.unsubscribe();
            this.router.navigate(['/drink-list']);
          // }
        });

    }

    editDrink(drinkId : string, drinkName : string, drinkType : string,drinkTypeOther : string, drinkComments: string, drinkPhotoUrl: string, drinkXPosition, drinkYPosition){

      let subscriptionEdit = this.afs.doc('users/'+this.authService.userId+'/drinks/'+ drinkId)
      .snapshotChanges()
      .subscribe(x => {
       

          this.usersCollection.doc(this.authService.userId).collection('drinks').doc(drinkId).update({
            drinkName: drinkName,
            drinkType:drinkType,
            drinkTypeOther:drinkTypeOther,
            drinkComments: drinkComments,
            drinkPhotoUrl: drinkPhotoUrl,
            drinkXPosition : drinkXPosition,
            drinkYPosition : drinkYPosition
          });
          subscriptionEdit.unsubscribe();
          this.router.navigate(['/drink-list']);
      });
    }

    deleteDrink(drinkId : string){
      this.usersCollection.doc(this.authService.userId).collection('drinks').doc(drinkId).delete();
      this.router.navigate(['/drink-list']);
    }

}
