import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularGoogleMapsModule } from '../angular-google-maps.module';
import { AngularMaterialModule } from '../angular-material.module';

import { MapComponent, StepComponent, StepListComponent } from './components';
import { VisualizeComponent } from './visualize.component';

import { ColorService, MapService, StepService } from './services';
import { VizualizeRoutingModule } from './visualize-routing.module';

@NgModule({
  declarations: [MapComponent, StepComponent, StepListComponent, VisualizeComponent],
  imports: [
    CommonModule,
    AngularGoogleMapsModule,
    AngularMaterialModule,
    VizualizeRoutingModule,
  ],
  providers: [ColorService, StepService, MapService],
})
export class VisualizeModule { }
