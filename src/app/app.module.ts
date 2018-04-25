import * as Raven from 'raven-js';
import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule
} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFireModule} from "angularfire2";
import {environment} from "../environments/environment";
import {CoreModule} from "./core/core.module";
import {ProfileComponent} from './profile/profile.component';
import {GlobalErrorHandler} from "./core/error-handler.service";
import {AuthService} from "./core/auth.service";

//Raven configuration point
Raven
  .config('https://db199e2a201e4c88936063d7483e4823@sentry.io/1192582', {
    environment: environment.production ? 'prod' : 'dev',
    shouldSendCallback: () => {
      // Send callback if in production
      return environment.production;
    },
  })
  .install();

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatCardModule, MatListModule, MatSnackBarModule],
  exports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatCardModule, MatListModule, MatSnackBarModule],
})
export class MyOwnMaterialModule {
}


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MyOwnMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule
  ],
  providers: [
    AuthService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
