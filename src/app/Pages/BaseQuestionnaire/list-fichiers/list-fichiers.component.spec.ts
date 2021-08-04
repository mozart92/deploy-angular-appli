import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFichiersComponent } from './list-fichiers.component';

describe('ListFichiersComponent', () => {
  let component: ListFichiersComponent;
  let fixture: ComponentFixture<ListFichiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFichiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFichiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
