import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
MatButtonModule,
MatCheckboxModule ,
MatIconModule,
MatTooltipModule,
MatToolbarModule
} from '@angular/material';

const materialModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatTooltipModule,
  MatToolbarModule
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
