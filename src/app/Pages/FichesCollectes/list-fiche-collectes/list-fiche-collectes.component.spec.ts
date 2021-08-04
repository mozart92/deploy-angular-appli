import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFicheCollectesComponent } from './list-fiche-collectes.component';

describe('ListFicheCollectesComponent', () => {
  let component: ListFicheCollectesComponent;
  let fixture: ComponentFixture<ListFicheCollectesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFicheCollectesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFicheCollectesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
