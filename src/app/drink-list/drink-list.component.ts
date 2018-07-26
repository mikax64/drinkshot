import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from '../services/auth.service';
import { Drink } from '../model/drink';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.css']
})
export class DrinkListComponent implements OnInit {
  private drinksCollection: AngularFirestoreCollection<Drink>;
  drinks: Observable<Drink[]>;
  isEmpty: boolean;
  constructor(private afs: AngularFirestore, public authService : AuthService, private router: Router) {
    
  }

  ngOnInit() {
    this.drinksCollection = this.afs.collection('users/'+this.authService.userId+'/drinks/', ref => ref.orderBy('drinkDate', 'desc'));
    this.drinks = this.drinksCollection.valueChanges();
    this.drinks.subscribe(values => {
      if(values.length === 0){
        this.isEmpty = true;
      }else{
        this.isEmpty = false;
      }
    });
    
  }

  goToDrinkDetail(drinkName: string){
    this.router.navigate(['drink-list/'+drinkName])
  }


}
