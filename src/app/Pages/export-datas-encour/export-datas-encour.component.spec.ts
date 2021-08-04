import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportDatasEncourComponent } from './export-datas-encour.component';

describe('ExportDatasEncourComponent', () => {
  let component: ExportDatasEncourComponent;
  let fixture: ComponentFixture<ExportDatasEncourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportDatasEncourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportDatasEncourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
