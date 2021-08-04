import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEnvoyerComponent } from './data-envoyer.component';

describe('DataEnvoyerComponent', () => {
  let component: DataEnvoyerComponent;
  let fixture: ComponentFixture<DataEnvoyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataEnvoyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataEnvoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
