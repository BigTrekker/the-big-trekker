import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSnackbarComponent } from './icon-snackbar.component';

describe('IconSnackbarComponent', () => {
  let component: IconSnackbarComponent;
  let fixture: ComponentFixture<IconSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
