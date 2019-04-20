import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.maps,
    }),
  ],
  exports: [AgmCoreModule],
})
export class AngularGoogleMapsModule {}
