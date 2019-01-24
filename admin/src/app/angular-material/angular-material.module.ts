import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

const materialModules = [
  MatButtonModule,
  MatCheckboxModule
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
