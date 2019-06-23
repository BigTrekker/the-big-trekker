import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../step/step';
import { MapService } from './map.service';
import { StepService } from '../step/step.service';
import { GoogleMap } from '@agm/core/services/google-maps-types'

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() steps: Array<Step> = [];
  hoveringStep: Number = null;
  selectedStep: Number = null;

  map: GoogleMap;

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

  constructor(private mapService: MapService, private stepService: StepService) { }

  ngOnInit() {
    this.geojson = this.mapService.getLine(this.steps);

    this.stepService.getHoveringStep().subscribe(hoveringStep => this.hoveringStep = hoveringStep);

    this.stepService.getSelectedStep().subscribe((selectedStep) => {
      this.selectedStep = selectedStep;
      let step: Step = this.steps[selectedStep];

      // center on selected step if not currently displayed on the map
      if (typeof(step) !== "undefined" &&
          !this.map.getBounds().contains({lat: step.latitude, lng: step.longitude})) { // the error here is "normal", because '| LatLngLiteral' is missing in the AGM library for the `contains` method
        this.map.panTo({lng: step.longitude, lat: step.latitude});
      }
    });
  }

  mapReady(map: GoogleMap) {
    this.map = map;
  }
  mapClick() {
    this.stepService.setSelectedStep(undefined);
  }

  onMouseOverMarker(index: number) {
    this.stepService.setHoveringStep(index);
  }
  onMouseOutMarker() {
    this.stepService.setHoveringStep(null);
  }

  onMarkerClicked(index: number, marker: Object) {
    this.stepService.setSelectedStep(index);
  }
}
