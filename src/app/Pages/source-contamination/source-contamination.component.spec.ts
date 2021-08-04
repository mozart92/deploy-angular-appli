import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceContaminationComponent } from './source-contamination.component';

describe('SourceContaminationComponent', () => {
  let component: SourceContaminationComponent;
  let fixture: ComponentFixture<SourceContaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceContaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceContaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
