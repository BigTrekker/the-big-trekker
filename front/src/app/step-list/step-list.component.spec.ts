import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepListComponent } from './step-list.component';

describe('StepListComponent', () => {
  let component: StepListComponent;
  let fixture: ComponentFixture<StepListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
