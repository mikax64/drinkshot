import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UploadFileService } from '../services/upload-file.service';
import { DrinkService } from '../services/drink.service';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-drink',
  templateUrl: './add-drink.component.html',
  styleUrls: ['./add-drink.component.css']
})
export class AddDrinkComponent implements OnInit {

  addDrinkForm: FormGroup;
  xPosition: number = 50;
  yPosition: number = 50;

  constructor(private formBuilder: FormBuilder, public authService : AuthService,
    public uploadFileService : UploadFileService, private drinkService : DrinkService, private afs: AngularFirestore) {
     }

  ngOnInit() {
    this.initForm();
  }

  changePosition(direction){
    if(direction == 'up' && this.yPosition > 0){
      this.yPosition-= 10;
    }
    if(direction == 'down' && this.yPosition < 100){
      this.yPosition+= 10;
    }
    if(direction == 'left' && this.xPosition > 0){
      this.xPosition-= 10;
    }
    if(direction == 'right' && this.xPosition < 100){
      this.xPosition+= 10;
    }
  }

  initForm() {
    this.addDrinkForm = this.formBuilder.group({
      drinkName: ['', [Validators.required]],
      drinkType: 'beer',
      drinkTypeOther: '',
      drinkComments: ''
    });
  }

  onSubmit() {
    let drinkName = this.addDrinkForm.get('drinkName').value;
    let drinkType = this.addDrinkForm.get('drinkType').value;
    let drinkTypeOther = this.addDrinkForm.get('drinkTypeOther').value;
    let drinkComments = this.addDrinkForm.get('drinkComments').value;
    let drinkXPosition = this.xPosition;
    let drinkYPosition = this.yPosition;

   let drinkDate = new Date;
    this.uploadFileService.downloadURL.subscribe((url) => {
      if(url){
        let drinkPhotoUrl = url;
        if(drinkType !== 'other'){
          drinkTypeOther = '';
        }else{
          drinkType = drinkTypeOther;
        }
        this.drinkService.createDrink(drinkName,drinkType, drinkTypeOther, drinkComments, drinkPhotoUrl, drinkDate, drinkXPosition, drinkYPosition);
      }
    }

  )};
    


}
