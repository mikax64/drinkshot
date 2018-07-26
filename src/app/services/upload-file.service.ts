import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';



@Injectable()

export class UploadFileService {
    uploadPercent: Observable<number>;
    downloadURL: Observable<string>;
    getUrl : string;
  
  
    selectedFile = null;
  
    constructor(private readonly afs: AngularFirestore, private storage: AngularFireStorage, public authService : AuthService) {
  
  
    }
  
   fileSelected(event) {
      const randomNumber = Math.round(Math.random()*1000);
      const file = event.target.files[0];
      const fileName = event.target.files[0].name + randomNumber;
      const userId = this.authService.userId;
      const filePath = 'images/'+ userId + '/'+fileName;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
        
      // observe percentage changes
      this.uploadPercent = task.percentageChanges().pipe(map(x => Math.round(x)));
      // get notified when the download URL is available
      let subscription = task.snapshotChanges().pipe(
          finalize(() => this.downloadURL = fileRef.getDownloadURL() )
       )
      .subscribe();
      //subscription.unsubscribe();

    }


}
