import { Component, OnInit } from '@angular/core';
import { StepService } from './step/step.service';
import { Step } from './step/step';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'big-trekker-front';
  steps: Array<Step>;

  constructor(private stepService: StepService) { }

  ngOnInit() {
    this.stepService.getSteps().subscribe(steps => this.steps = steps);
  }
}
