import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportationDatasComponent } from './exportation-datas.component';

describe('ExportationDatasComponent', () => {
  let component: ExportationDatasComponent;
  let fixture: ComponentFixture<ExportationDatasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportationDatasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportationDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
