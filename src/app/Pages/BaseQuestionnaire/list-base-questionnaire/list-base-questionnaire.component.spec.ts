import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBaseQuestionnaireComponent } from './list-base-questionnaire.component';

describe('ListBaseQuestionnaireComponent', () => {
  let component: ListBaseQuestionnaireComponent;
  let fixture: ComponentFixture<ListBaseQuestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBaseQuestionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBaseQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
