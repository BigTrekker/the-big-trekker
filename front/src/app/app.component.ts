import { Component, OnInit } from '@angular/core';
import { StepService } from './step/step.service';
import { Step } from './step/step';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger(
      'stepDetailsAnimation', [
        transition(':enter', [
          style({transform: 'translateX(-100%)'}),
          animate('700ms', style({transform: 'translateX(0)'}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)'}),
          animate('700ms', style({transform: 'translateX(-100%)'}))
        ])
      ]
    ),
    trigger(
      'stepListAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('700ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('700ms', style({opacity: 0}))
        ])
      ]
    )
  ],
})
export class AppComponent implements OnInit {
  title = 'big-trekker-front';
  steps: Array<Step>;
  selectedStep: Step;

  constructor(private stepService: StepService) { }

  ngOnInit() {
    this.stepService.getSteps().subscribe(steps => this.steps = steps);
    this.stepService.getSelectedStep().subscribe(selectedStep => this.selectedStep = this.steps[selectedStep]);
  }
}
