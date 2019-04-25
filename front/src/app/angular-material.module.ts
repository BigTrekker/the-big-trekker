import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
DateAdapter,
MatBadgeModule,
MatButtonModule,
MatCheckboxModule ,
MatIconModule,
MatTooltipModule,
MatToolbarModule,
MatInputModule,
MatDatepickerModule,
MatFormFieldModule,
MatListModule,
} from '@angular/material';
import {
MatMomentDateModule,
MomentDateAdapter
} from '@angular/material-moment-adapter';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { TextFieldModule } from '@angular/cdk/text-field';

const materialModules = [
  MatBadgeModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatTooltipModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatListModule,
  MatMomentDateModule,
  MatFileUploadModule,
  TextFieldModule,
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
