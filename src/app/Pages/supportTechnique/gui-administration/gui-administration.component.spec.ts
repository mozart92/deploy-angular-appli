import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiAdministrationComponent } from './gui-administration.component';

describe('GuiAdministrationComponent', () => {
  let component: GuiAdministrationComponent;
  let fixture: ComponentFixture<GuiAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
