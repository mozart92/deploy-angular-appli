import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CZVSComponent } from './czvs.component';

describe('CZVSComponent', () => {
  let component: CZVSComponent;
  let fixture: ComponentFixture<CZVSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CZVSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CZVSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
