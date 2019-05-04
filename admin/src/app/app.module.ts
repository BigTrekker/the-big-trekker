import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AgmCoreModule } from '@agm/core';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarUserProfileComponent } from './navbar/navbar-user-profile/navbar-user-profile.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { PostEditorFormComponent } from './post-editor/post-editor-form/post-editor-form.component';
import { IconSnackbarComponent } from './icon-snackbar/icon-snackbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarUserProfileComponent,
    PostEditorComponent,
    PostEditorFormComponent,
    IconSnackbarComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.agmApiKey
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: 'BaseUrl', useValue: environment.apiUrl },
   ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    IconSnackbarComponent
  ]
})
export class AppModule { }
