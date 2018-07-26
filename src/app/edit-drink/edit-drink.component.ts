import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UploadFileService } from '../services/upload-file.service';
import { DrinkService } from '../services/drink.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import { Drink } from '../model/drink';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-drink',
  templateUrl: './edit-drink.component.html',
  styleUrls: ['./edit-drink.component.css']
})
export class EditDrinkComponent implements OnInit {

  editDrinkForm: FormGroup;
  currentDrink : string;
  drinkObservable: Observable<Drink>;
  initDrinkPhotoUrl : string;
  drink: Drink;
  selectedOption:any;
  xPosition: number ;
  yPosition: number ;
  private drinkDoc: AngularFirestoreDocument<Drink>;

  constructor( private formBuilder: FormBuilder, public authService : AuthService,
    public uploadFileService : UploadFileService, private drinkService : DrinkService, private afs: AngularFirestore, private route: ActivatedRoute) {
      this.currentDrink = this.route.snapshot.params['id'];
      this.drinkDoc = this.afs.doc<Drink>('users/'+this.authService.userId+'/drinks/'+this.currentDrink);
      this.drinkObservable = this.drinkDoc.valueChanges();


    }

  ngOnInit() {
    

    if(this.uploadFileService.downloadURL){
      this.uploadFileService.downloadURL = undefined;
    }

    
    // init form
    this.drinkObservable.subscribe((data) => {
      this.drink = data;
     
      if(data){
        this.selectedOption = data.drinkType;

        this.initDrinkPhotoUrl = data.drinkPhotoUrl;
        if(data.drinkTypeOther !== ''){
          data.drinkType = 'other';
        }
        this.editDrinkForm = this.formBuilder.group({
          drinkName: [data.drinkName , [Validators.required]],
          drinkType: data.drinkType,
          drinkTypeOther: data.drinkTypeOther,
          drinkComments: data.drinkComments
        });

        this.xPosition = data.drinkXPosition;
        this.yPosition = data.drinkYPosition;

      }
    });
  }



  ngOnDestroy() {
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

  onSubmit(){
    let drinkId = this.currentDrink;
    let drinkName = this.editDrinkForm.get('drinkName').value;
    let drinkType = this.editDrinkForm.get('drinkType').value;
    let drinkTypeOther = this.editDrinkForm.get('drinkTypeOther').value;
    let drinkComments = this.editDrinkForm.get('drinkComments').value;
    let newFile = this.uploadFileService.downloadURL;
    let drinkXPosition = this.xPosition;
    let drinkYPosition = this.yPosition;

    if(drinkType !== 'other'){
      drinkTypeOther = '';
    }else{
      drinkType = drinkTypeOther;
    }

    if(newFile){

      this.uploadFileService.downloadURL.subscribe((url) => {
        if(url){
            let drinkPhotoUrl = url;
            this.drinkService.editDrink(drinkId, drinkName,drinkType, drinkTypeOther, drinkComments, drinkPhotoUrl, drinkXPosition, drinkYPosition);
          }
          });
        }else{
          this.drinkService.editDrink(drinkId, drinkName,drinkType, drinkTypeOther, drinkComments,this.initDrinkPhotoUrl, drinkXPosition, drinkYPosition);
        }
    
  }
  
  onDeleteDrink(){
    let truc = confirm("Are you sure you want to delete this drink ?");
    if(truc){
      this.drinkService.deleteDrink(this.currentDrink);
    }
  }

  onFileSelected(event){
    this.uploadFileService.fileSelected(event);
    this.xPosition = 50;
    this.yPosition = 50;
  }




}
