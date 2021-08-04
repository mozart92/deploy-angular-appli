import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammesArchivesComponent } from './programmes-archives.component';

describe('ProgrammesArchivesComponent', () => {
  let component: ProgrammesArchivesComponent;
  let fixture: ComponentFixture<ProgrammesArchivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgrammesArchivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammesArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
