import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageCahisComponent } from './login-page-cahis.component';

describe('LoginPageCahisComponent', () => {
  let component: LoginPageCahisComponent;
  let fixture: ComponentFixture<LoginPageCahisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPageCahisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageCahisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
