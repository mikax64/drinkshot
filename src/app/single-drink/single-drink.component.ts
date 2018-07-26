import { Component, OnInit } from '@angular/core';
import { Drink } from '../model/drink';
import { ActivatedRoute, Router } from '@angular/router';
import { DrinkService } from '../services/drink.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-drink',
  templateUrl: './single-drink.component.html',
  styleUrls: ['./single-drink.component.css']
})
export class SingleDrinkComponent implements OnInit {
  private drinkDoc: AngularFirestoreDocument<Drink>;
  drink: Observable<Drink>;
  idParam : string;

  constructor(private route: ActivatedRoute, private drinkService: DrinkService,
    private router: Router, private authService: AuthService, private readonly afs: AngularFirestore) {
      this.idParam = this.route.snapshot.params['id'];
      authService.idParam = this.idParam;
      this.drinkDoc = this.afs.doc<Drink>('users/'+this.authService.userId+'/drinks/'+this.idParam);
      this.drink = this.drinkDoc.valueChanges();
    }

  ngOnInit() {

  }
  

}
