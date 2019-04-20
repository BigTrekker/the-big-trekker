import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { NavBarComponent } from './navbar/navbar.component';
import { StepComponent } from './step/step.component';
import { StepListComponent } from './step-list/step-list.component';
import { MapComponent } from './map/map.component';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    StepComponent,
    StepListComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAx8oJ1MwmuHJ4JGKVwVV5O4e91062IYRY'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
