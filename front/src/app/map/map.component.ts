import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../step/step';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  @Input() steps: Array<Step> = [];

  center: Object = {
    lat: 45.759148,
    lng: 4.8352406,
  };
  zoom: Number = 10;
  marker: Object = null;

  constructor() { }
}
