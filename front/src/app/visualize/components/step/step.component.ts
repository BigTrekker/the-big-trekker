import { Component, Input } from '@angular/core';
import { Step } from '../../models';

import { ColorService } from '../../services';

@Component({
  selector: 'step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent {

  @Input() step: Step;
  @Input() index: string;

  constructor(private colorService: ColorService) { }

  getChipBackgroundColor(authorName) {
    return this.colorService.getRandomUniqueColor(authorName);
  }
}
