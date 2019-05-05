import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AngularMaterialModule } from './../angular-material/angular-material.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularMaterialModule
  ],
})
export class AuthModule { }
