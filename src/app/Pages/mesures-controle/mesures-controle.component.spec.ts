import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesuresControleComponent } from './mesures-controle.component';

describe('MesuresControleComponent', () => {
  let component: MesuresControleComponent;
  let fixture: ComponentFixture<MesuresControleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesuresControleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesuresControleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
