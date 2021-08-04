import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheProgrammerComponent } from './fiche-programmer.component';

describe('FicheProgrammerComponent', () => {
  let component: FicheProgrammerComponent;
  let fixture: ComponentFixture<FicheProgrammerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheProgrammerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheProgrammerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
