import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
MatButtonModule,
MatCheckboxModule ,
MatIconModule,
MatTooltipModule,
MatToolbarModule,
MatInputModule,
MatDatepickerModule,
MatFormFieldModule,
DateAdapter,
} from '@angular/material';
import {
MatMomentDateModule,
MomentDateAdapter
} from '@angular/material-moment-adapter';

const materialModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatTooltipModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatMomentDateModule
];

@NgModule({
  imports: [
    CommonModule,
    ...materialModules
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter}
  ],
  exports: materialModules,
  declarations: []
})
export class AngularMaterialModule { }
