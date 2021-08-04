import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonneeDejaVailderComponent } from './donnee-deja-vailder.component';

describe('DonneeDejaVailderComponent', () => {
  let component: DonneeDejaVailderComponent;
  let fixture: ComponentFixture<DonneeDejaVailderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonneeDejaVailderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonneeDejaVailderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
