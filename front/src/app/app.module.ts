import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeFr from '@angular/common/locales/fr';

import { environment } from 'src/environments/environment';

import { AngularGoogleMapsModule } from './angular-google-maps.module';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarUserProfileComponent, PageNotFoundComponent, HomepageComponent, NavBarComponent } from './components';
import { TokenInterceptor } from './interceptors';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomepageComponent,
    NavBarComponent,
    NavbarUserProfileComponent,
  ],
  imports: [
    AngularGoogleMapsModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: 'BaseUrl', useValue: environment.apiUrl },
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
