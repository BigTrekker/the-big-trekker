import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../step/step';
import { StepService } from '../step/step.service';

@Component({
  selector: 'step-list',
  templateUrl: './step-list.component.html',
  styleUrls: ['./step-list.component.scss']
})
export class StepListComponent implements OnInit {

  @Input() steps: Array<Step> = [];
  hoveringStep = null;

  constructor(private stepService: StepService) { }

  ngOnInit() {
    this.stepService.getHoveringStep().subscribe(hoveringStep => this.hoveringStep = hoveringStep);
  }

  onMouseEnterStep(index: number) {
    this.stepService.setHoveringStep(index);
  }

  onMouseLeaveStep() {
    this.stepService.setHoveringStep(null);
  }

  onClickedStep(index: number) {
    this.stepService.setSelectedStep(index);
  }
}
