import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { AgmMap } from '@agm/core';

import { ExifService } from './../../services/exif.service';
import { PostService } from './../../services/post.service';
import { IconSnackbarComponent } from './../../icon-snackbar/icon-snackbar.component';

enum DATE_AND_COORD_DEFINED_BY {
  DEFAULT = 1,
  PHOTO = 2,
  USER = 3,
}

@Component({
  selector: 'post-editor-form',
  templateUrl: './post-editor-form.component.html',
  styleUrls: ['./post-editor-form.component.scss']
})
export class PostEditorFormComponent {

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

  constructor(private exifService: ExifService,
    private postService: PostService,
    private snackbar: MatSnackBar) {}

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
    this.postService.addPost(this.postForm.value).subscribe(post => {
      console.log("New post added !!", post);
      this.snackbar.openFromComponent(IconSnackbarComponent, {
        data: {
          icon: {
            name: "done",
            color: "green"
          },
          message: "New post added !!"
        },
        duration: 3000
      });
    }, error => {
      console.error("Error happens...", error);
      this.snackbar.openFromComponent(IconSnackbarComponent, {
        data: {
          icon: {
            name: "warning",
            color: "orange"
          },
          message: error
        },
        duration: 3000
      });
    })
  }

}
