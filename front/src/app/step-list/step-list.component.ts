import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../step/step';

@Component({
  selector: 'step-list',
  templateUrl: './step-list.component.html',
  styleUrls: ['./step-list.component.scss']
})
export class StepListComponent {

  @Input() steps: Array<Step> = [];
}
