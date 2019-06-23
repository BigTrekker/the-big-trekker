import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../step/step';
import { StepService } from '../step/step.service';
import { ColorService } from '../color.service';

@Component({
  selector: 'step-details',
  templateUrl: './step-details.component.html',
  styleUrls: ['./step-details.component.scss'],
})
export class StepDetailsComponent implements OnInit {

  @Input() step: Step = undefined;

  constructor(private stepService: StepService, private colorService: ColorService) { }

  ngOnInit() {
  }

  exitDetails() {
    this.stepService.setSelectedStep(undefined);
  }

}
