import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsOperationComponent } from './notifications-operation.component';

describe('NotificationsOperationComponent', () => {
  let component: NotificationsOperationComponent;
  let fixture: ComponentFixture<NotificationsOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
