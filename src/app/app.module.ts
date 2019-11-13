import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from 'src/environments/firebase.config';
import { StorageService } from 'src/services/storage.service';
import { AuthGuardService } from 'src/services/authguard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig), // Inicia Firebase com nossas conf
    AngularFirestoreModule, // Banco de dados 
    AngularFireAuthModule,  // Autenticação
    AngularFireStorageModule // Armazenamento Arquivos
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StorageService,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
