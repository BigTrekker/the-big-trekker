import { Component, OnInit, Input } from '@angular/core';
import { Step, } from './step';

@Component({
  selector: 'step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent {

  @Input() step: Step;

  constructor() { }

}
