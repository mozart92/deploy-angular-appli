import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OIEComponent } from './oie.component';

describe('OIEComponent', () => {
  let component: OIEComponent;
  let fixture: ComponentFixture<OIEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OIEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OIEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
