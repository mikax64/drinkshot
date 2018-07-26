import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { UploadFileService } from './services/upload-file.service';
import { AddDrinkComponent } from './add-drink/add-drink.component';
import { AuthGuardService } from './services/auth-guard.service';
import { DrinkService } from './services/drink.service';
import { DrinkListComponent } from './drink-list/drink-list.component';
import { SingleDrinkComponent } from './single-drink/single-drink.component';
import { EditDrinkComponent } from './edit-drink/edit-drink.component';
import { MatButtonModule, MatCheckboxModule} from '@angular/material';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



const appRoutes = [
  { path:'auth', component: AuthComponent},
  { path:'add-drink',  canActivate: [AuthGuardService], component: AddDrinkComponent},
  { path:'drink-list',  canActivate: [AuthGuardService], component: DrinkListComponent},
  { path: 'drink-list/:id',canActivate: [AuthGuardService], component: SingleDrinkComponent },
  { path: 'drink-list/:id/edit',canActivate: [AuthGuardService], component: EditDrinkComponent },
  { path: '', redirectTo: 'drink-list', pathMatch: 'full' },
  { path: '**', redirectTo: 'drink-list' }
]

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    AddDrinkComponent,
    DrinkListComponent,
    SingleDrinkComponent,
    EditDrinkComponent,
    NavbarComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    MatButtonModule, MatCheckboxModule,BrowserAnimationsModule,MatInputModule,MatFormFieldModule,MatCardModule,MatIconModule,MatSelectModule,MatProgressSpinnerModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ AuthService, UploadFileService, AuthGuardService, DrinkService],
  bootstrap: [AppComponent]
})


export class AppModule { }


