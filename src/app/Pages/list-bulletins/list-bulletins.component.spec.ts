import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBulletinsComponent } from './list-bulletins.component';

describe('ListBulletinsComponent', () => {
  let component: ListBulletinsComponent;
  let fixture: ComponentFixture<ListBulletinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBulletinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBulletinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
