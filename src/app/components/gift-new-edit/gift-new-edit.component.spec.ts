import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftNewEditComponent } from './gift-new-edit.component';

describe('GiftNewEditComponent', () => {
  let component: GiftNewEditComponent;
  let fixture: ComponentFixture<GiftNewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftNewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftNewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
