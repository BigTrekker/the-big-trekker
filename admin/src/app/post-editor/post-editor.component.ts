import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    content: new FormControl(''),
    date: new FormControl(new Date(), Validators.required),
    position: new FormControl(undefined, Validators.required),
    photos: new FormControl([])
  });
  mapParams: Object = {
    center: {
      lat: 45.759148,
      lng: 4.8352406,
    },
    zoom: 10
  }

  locationDefinedBy: LOCATION_DEFINED_BY = LOCATION_DEFINED_BY.DEFAULT;

  updateLocationIfAuthorized(coords: Object, action: LOCATION_DEFINED_BY) {
    if(action >= this.locationDefinedBy) {
      if(this.postForm.controls['position'].value === null) {
        this.postForm.controls['position'].setValue({
          lat: this.mapParams['center']['lat'],
          lng: this.mapParams['center']['lng']
        });
      }
      this.postForm.controls['position'].setValue({
        lat: coords['latitude'],
        lng: coords['longitude']
      });
      this.mapParams['center']['lat'] = coords['latitude'];
      this.mapParams['center']['lng'] = coords['longitude'];
      this.mapParams['zoom'] = 15;
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

  onFileChanged(event) {
    if(event.target.files && event.target.files.length > 0) {
      for(let i = 0; i < event.target.files.length; i++) {
        let file = event.target.files[i];
        let reader = new FileReader();
        reader.readAsDataURL(file); // read file as data url
        reader.onload = e => { // called once readAsDataURL is completed
          let photosArray = this.postForm.controls['photos'].value;
          photosArray.push({
            fileObject: file,
            fileAsDataUrl: e.target.result
          });
        }
      }
    }
  }

  onSubmit() {
    console.log(this.postForm.value);
  }

}
