import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AgmMap } from '@agm/core';


enum LOCATION_DEFINED_BY {
  DEFAULT = 0,
  BROWSER = 1,
  PHOTO = 2,
  USER = 3,
}

@Component({
  selector: 'post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss']
})
export class PostEditorComponent {

  postForm = new FormGroup({
    content: new FormControl(),
    date: new FormControl(new Date())
  });
  center: Object = {
    lat: 45.759148,
    lng: 4.8352406,
  };
  zoom: Number = 10;
  marker: Object = null;

  locationDefinedBy: LOCATION_DEFINED_BY = LOCATION_DEFINED_BY.DEFAULT;

  updateLocationIfAuthorized(coords: Object, action: LOCATION_DEFINED_BY) {
    if(action >= this.locationDefinedBy) {
      if(this.marker === null) {
        this.marker = {
          lat: this.center['lat'],
          lng: this.center['lng']
        };
      }
      this.marker['lat'] = coords['latitude'];
      this.marker['lng'] = coords['longitude'];
      this.center['lat'] = coords['latitude'];
      this.center['lng'] = coords['longitude'];
      this.zoom = 15;
      this.locationDefinedBy = action;
    }
  }

  locateUser() {
    console.debug("Trying to locate user from browser");
    navigator.geolocation.getCurrentPosition(position => {
      this.updateLocationIfAuthorized(position['coords'], LOCATION_DEFINED_BY.BROWSER);
     });
  }

  mapClicked(event) {
    console.debug("Map has been clicked, trying to update marker position");
    this.updateLocationIfAuthorized({
      latitude: event.coords.lat,
      longitude: event.coords.lng
    }, LOCATION_DEFINED_BY.USER);
  }

}
