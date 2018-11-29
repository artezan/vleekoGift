import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSpinnerComponent } from './general-spinner.component';

describe('GeneralSpinnerComponent', () => {
  let component: GeneralSpinnerComponent;
  let fixture: ComponentFixture<GeneralSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
