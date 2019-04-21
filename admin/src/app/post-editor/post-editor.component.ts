import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AgmMap } from '@agm/core';

import { ExifService } from './exif.service';

enum DATE_AND_COORD_DEFINED_BY {
  DEFAULT = 1,
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

  dateDefinedBy: DATE_AND_COORD_DEFINED_BY = DATE_AND_COORD_DEFINED_BY.DEFAULT;
  coordDefinedBy: DATE_AND_COORD_DEFINED_BY = DATE_AND_COORD_DEFINED_BY.DEFAULT;

  constructor(private exifService: ExifService) {}

  updateLocationIfAuthorized(coords: Object, action: DATE_AND_COORD_DEFINED_BY) {
    if(action >= this.coordDefinedBy) {
      if(this.postForm.controls['position'].value === null) {
        this.postForm.controls['position'].setValue({
          lat: this.mapParams['center']['lat'],
          lng: this.mapParams['center']['lng']
        });
      }
      this.postForm.controls['position'].setValue(coords);
      this.mapParams['center'] = coords;
      this.mapParams['zoom'] = 15;
      this.coordDefinedBy = action;
    }
  }
  
  updateDateIfAuthorized(date: Date, action: DATE_AND_COORD_DEFINED_BY) {
    if(action >= this.dateDefinedBy) {
      this.postForm.controls['date'].setValue(date);
      this.dateDefinedBy = action;
    }
  }
  
  dateChangedFromInput() {
    this.dateDefinedBy = DATE_AND_COORD_DEFINED_BY.USER;
  }

  locateUser() {
    console.debug("Trying to locate user from browser");
    navigator.geolocation.getCurrentPosition(position => {
      this.updateLocationIfAuthorized({
        lat: position['coords']['latitude'],
        lng: position['coords']['longitude']
      }, DATE_AND_COORD_DEFINED_BY.USER);
     });
  }

  mapClicked(event) {
    console.debug("Map has been clicked, trying to update marker position");
    this.updateLocationIfAuthorized(event.coords, DATE_AND_COORD_DEFINED_BY.USER);
  }

  onFileChanged(event) {
    if(event.target.files && event.target.files.length > 0) {
      let readFromPhoto = false;
      for(let i = 0; i < event.target.files.length; i++) {
        let file = event.target.files[i];
        let reader = new FileReader();
        reader.readAsDataURL(file); // read file as data url
        reader.onload = e => { // called once readAsDataURL is completed
          let photosArray = this.postForm.controls['photos'].value;
          this.exifService.getData(file, (photoDate, photoCoord) => {
            photosArray.push({
              fileObject: file,
              photoDate: photoDate,
              photoCoord: photoCoord,
              fileAsDataUrl: e.target.result
            });
            if(!readFromPhoto) {
              if(photoDate != null) {
                this.updateDateIfAuthorized(photoDate, DATE_AND_COORD_DEFINED_BY.PHOTO);
                readFromPhoto = true;
              }
              if(photoCoord != null) {
                this.updateLocationIfAuthorized(photoCoord, DATE_AND_COORD_DEFINED_BY.PHOTO);
                readFromPhoto = true;
              }
            }
          });
        }
      }
    }
  }

  onSubmit() {
    console.log(this.postForm.value);
  }

}
