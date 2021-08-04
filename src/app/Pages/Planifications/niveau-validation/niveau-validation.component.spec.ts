import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauValidationComponent } from './niveau-validation.component';

describe('NiveauValidationComponent', () => {
  let component: NiveauValidationComponent;
  let fixture: ComponentFixture<NiveauValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiveauValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NiveauValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
