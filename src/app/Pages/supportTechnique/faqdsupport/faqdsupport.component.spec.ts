import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQDSUpportComponent } from './faqdsupport.component';

describe('FAQDSUpportComponent', () => {
  let component: FAQDSUpportComponent;
  let fixture: ComponentFixture<FAQDSUpportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FAQDSUpportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FAQDSUpportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
