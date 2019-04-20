import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { PostEditorComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { AngularGoogleMapsModule } from '../angular-google-maps.module';

@NgModule({
  declarations: [AdminComponent, PostEditorComponent],
  imports: [
    AdminRoutingModule,
    AngularGoogleMapsModule,
    AngularMaterialModule,
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
