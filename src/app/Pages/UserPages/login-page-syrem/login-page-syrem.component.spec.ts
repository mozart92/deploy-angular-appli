import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageSyremComponent } from './login-page-syrem.component';

describe('LoginPageSyremComponent', () => {
  let component: LoginPageSyremComponent;
  let fixture: ComponentFixture<LoginPageSyremComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPageSyremComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageSyremComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
