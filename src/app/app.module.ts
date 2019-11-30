import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// firebase
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { LoginComponent } from './components/login/login.component';
import { PanelComponent } from './components/panel/panel.component';
import { GiftComponent } from './components/gift/gift.component';
import { GiftNewEditComponent } from './components/gift-new-edit/gift-new-edit.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserGameComponent } from './components/user/user-game/user-game.component';
import { SessionService } from './services/session.service';
import { GeneralSpinnerComponent } from './components/shared/general-spinner/general-spinner.component';
import { UserAddEditComponent } from './components/user/user-add-edit/user-add-edit.component';
import { UsersAllComponent } from './components/user/users-all/users-all.component';

const firebaseConfig = {
  apiKey: 'AIzaSyA6SpDnAoCdReK4-sW71Ra-Ju6vLBxcETg',
  authDomain: 'vleeko-5fdf6.firebaseapp.com',
  databaseURL: 'https://vleeko-5fdf6.firebaseio.com',
  projectId: 'vleeko-5fdf6',
  storageBucket: 'vleeko-5fdf6.appspot.com',
  messagingSenderId: '481346644756',
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PanelComponent,
    GiftComponent,
    GiftNewEditComponent,
    UserListComponent,
    UserGameComponent,
    GeneralSpinnerComponent,
    UserAddEditComponent,
    UsersAllComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // AngularFireDatabaseModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (check: SessionService) => () => check.checkValidSession(),
      deps: [SessionService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
