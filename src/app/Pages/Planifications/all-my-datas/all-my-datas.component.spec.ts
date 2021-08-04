import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMyDatasComponent } from './all-my-datas.component';

describe('AllMyDatasComponent', () => {
  let component: AllMyDatasComponent;
  let fixture: ComponentFixture<AllMyDatasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMyDatasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMyDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
