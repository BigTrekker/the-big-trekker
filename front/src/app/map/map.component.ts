import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../step/step';
import { MapService } from './map.service';
import { StepService } from '../step/step.service';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() steps: Array<Step> = [];
  hoveringStep = null;

  geojson;
  geojsonStyle = {
    // set fill color for polygon features
    fillColor: "red",
    // stroke color for polygons
    strokeColor: "black",
    strokeWeight: 2,
    // make layer 1 features visible
    visible: true
  };

  center: Object = {
    lat: 45.759148,
    lng: 4.8352406,
  };
  zoom: Number = 10;
  marker: Object = null;

  constructor(private mapService: MapService, private stepService: StepService) { }

  ngOnInit() {
    this.geojson = this.mapService.getLine(this.steps);
    this.stepService.getHoveringStep().subscribe(hoveringStep => this.hoveringStep = hoveringStep);
  }

  onMouseOverMarker(index: number) {
    this.stepService.setHoveringStep(index);
  }
  onMouseOutMarker() {
    this.stepService.setHoveringStep(null);
  }

  onMarkerClicked(index: number) {
    this.stepService.setSelectedStep(index);
  }
}
