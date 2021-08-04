import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinsInformationsComponent } from './bulletins-informations.component';

describe('BulletinsInformationsComponent', () => {
  let component: BulletinsInformationsComponent;
  let fixture: ComponentFixture<BulletinsInformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletinsInformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinsInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
