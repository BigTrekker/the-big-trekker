import { Component, OnInit } from '@angular/core';
import { Step } from './models';
import { StepService } from './services';

@Component({
  selector: 'app-visualize',
  templateUrl: './visualize.component.html',
  styleUrls: ['./visualize.component.scss']
})
export class VisualizeComponent implements OnInit {
  steps: Array<Step>;

  constructor(private stepService: StepService) { }

  ngOnInit() {
    this.stepService.getSteps().subscribe(steps => this.steps = steps);
  }
}
