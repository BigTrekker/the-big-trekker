import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule ,
  MatIconModule,
  MatTooltipModule,
  MatToolbarModule,
  MatListModule,
  MatBadgeModule,
} from '@angular/material';

const materialModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatTooltipModule,
  MatToolbarModule,
  MatListModule,
  MatBadgeModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: materialModules,
  declarations: []
})
export class AngularMaterialModule { }