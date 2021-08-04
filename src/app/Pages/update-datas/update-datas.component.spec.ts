import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDatasComponent } from './update-datas.component';

describe('UpdateDatasComponent', () => {
  let component: UpdateDatasComponent;
  let fixture: ComponentFixture<UpdateDatasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDatasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
