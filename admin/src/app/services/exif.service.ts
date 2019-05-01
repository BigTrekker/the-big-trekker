import { Injectable } from '@angular/core';

import * as EXIF from "exif-js";

@Injectable({
  providedIn: 'root'
})
export class ExifService {

  private getDateFromExif(exifData) {
      let dt = EXIF.getTag(exifData, 'DateTime');

      if(dt) {
          let parts = dt.split(' ');
          parts[0] = parts[0].replace(/:/g,'-');
          let photoDate = new Date(parts[0] + ' ' + parts[1]);
          return photoDate;
      }

      return null;
  }

  private degMinSecToDecCoord(degMinSec) {
      let computed = degMinSec[0];

      if(degMinSec.length > 1) {
          computed += degMinSec[1] / 60;

          if(degMinSec.length === 3) {
              computed += degMinSec[2] / 3600;
          }
      }

      return computed;
  }

  private getCoordFromExif(exifData) {
      let lat = EXIF.getTag(exifData, 'GPSLatitude'),
          lng = EXIF.getTag(exifData, 'GPSLongitude');

      if(lat == null || lng == null || lat.length === 0 || lng.length === 0) {
          return null;
      }

      return {
          lat: this.degMinSecToDecCoord(lat),
          lng: this.degMinSecToDecCoord(lng)
      };
  }

  getData(photo, callback) {
    EXIF.getData(photo, () => {
        let photoDate = this.getDateFromExif(photo);
        let photoCoord = this.getCoordFromExif(photo);
        callback(photoDate, photoCoord)
    });
  }
}
