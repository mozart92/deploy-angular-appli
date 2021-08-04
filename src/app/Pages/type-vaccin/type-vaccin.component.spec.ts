import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeVaccinComponent } from './type-vaccin.component';

describe('TypeVaccinComponent', () => {
  let component: TypeVaccinComponent;
  let fixture: ComponentFixture<TypeVaccinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeVaccinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeVaccinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
