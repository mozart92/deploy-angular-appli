import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeProductionComponent } from './type-production.component';

describe('TypeProductionComponent', () => {
  let component: TypeProductionComponent;
  let fixture: ComponentFixture<TypeProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
